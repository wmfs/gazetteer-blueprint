/* eslint-env mocha */
'use strict'

const fs = require('fs')
const path = require('path')
const { Client } = require('pg')
const expect = require('chai').expect
// The same cases the JavaScript encoder is tested with, so the two can't drift apart
const cases = require('@wmfs/uprn-encode-decode/lib/test-cases.json')

const FUNCTIONS_SQL = fs.readFileSync(path.resolve(__dirname, '../pg-scripts/create-function.sql'), 'utf8')

// Everything runs in one transaction that is rolled back, so nothing is left in the database.
describe('masking number and search terms SQL functions', function () {
  this.timeout(process.env.TIMEOUT || 10000)

  let client

  before(async function () {
    const connectionString = process.env.PG_CONNECTION_STRING
    if (!connectionString || !/^postgres:\/\/[^:]+:[^@]+@(?:localhost|127\.0\.0\.1).*$/.test(connectionString)) {
      console.log('Skipping SQL function tests: PG_CONNECTION_STRING is not set to a local database')
      this.skip()
    }

    client = new Client({ connectionString })
    await client.connect()
    await client.query('BEGIN')
    await client.query('CREATE SCHEMA IF NOT EXISTS wmfs')
    await client.query(FUNCTIONS_SQL)
  })

  after(async () => {
    if (!client) return
    await client.query('ROLLBACK')
    await client.end()
  })

  const one = async (sql, params) => (await client.query(sql, params)).rows[0].v

  describe('wmfs.uprn_to_mask', () => {
    for (const { uprn, mask } of cases.valid) {
      it(`${uprn} -> ${mask}`, async () => {
        expect(await one('select wmfs.uprn_to_mask($1::bigint) as v', [uprn])).to.eql(mask)
      })
    }

    // only inputs that are numbers, or NULL, can reach the bigint function
    for (const { input, expected, why } of cases.encode.filter(c => c.input === null || /^\s*-?\d{1,13}\s*$/.test(String(c.input)))) {
      it(`${why}: ${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, async () => {
        const uprn = input === null ? null : String(input).trim()
        expect(await one('select wmfs.uprn_to_mask($1::bigint) as v', [uprn])).to.eql(expected)
      })
    }
  })

  describe('wmfs.mask_to_uprn', () => {
    for (const { uprn, mask } of cases.valid) {
      it(`${mask} -> ${uprn}`, async () => {
        expect(await one('select wmfs.mask_to_uprn($1)::text as v', [mask])).to.eql(uprn)
      })
    }

    for (const { input, expected, why } of cases.decode) {
      it(`${why}: ${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, async () => {
        expect(await one('select wmfs.mask_to_uprn($1)::text as v', [input])).to.eql(expected)
      })
    }

    it('every mask decodes back to its UPRN (10,000 random UPRNs)', async () => {
      const bad = await one(`
        select count(*)::int as v
          from (select (1 + floor(random() * 999999999999))::bigint as uprn from generate_series(1, 10000)) r
         where wmfs.mask_to_uprn(wmfs.uprn_to_mask(r.uprn)) is distinct from r.uprn`)
      expect(bad).to.eql(0)
    })
  })

  describe('wmfs.search_terms', () => {
    before(async function () {
      // Only test against tables this test creates, so a local database with real data is never touched
      const existing = await one(`
        select count(*)::int as v from information_schema.tables
         where (table_schema, table_name) in (('wmfs', 'gazetteer'), ('conflict_resolution', 'accepted_matches'))`)
      if (existing > 0) {
        console.log('Skipping wmfs.search_terms tests: wmfs.gazetteer or conflict_resolution.accepted_matches already exists in this database')
        this.skip()
      }

      await client.query(`
        CREATE SCHEMA IF NOT EXISTS conflict_resolution;
        CREATE TABLE wmfs.gazetteer (uprn bigint, counter int, lpi_status int, postcode text);
        CREATE TABLE conflict_resolution.accepted_matches (local_uprn bigint, official_uprn bigint, is_active boolean);
        -- same as tymly-conflict-resolution-plugin's function
        CREATE OR REPLACE FUNCTION conflict_resolution.find_related_uprns(supplied_uprn bigint)
        RETURNS text LANGUAGE sql STABLE AS $f$
          SELECT string_agg(r::text, ',') FROM (
            SELECT supplied_uprn AS r
            UNION SELECT official_uprn FROM conflict_resolution.accepted_matches WHERE local_uprn = supplied_uprn AND is_active
            UNION SELECT local_uprn FROM conflict_resolution.accepted_matches
                   WHERE is_active AND local_uprn <> supplied_uprn
                     AND official_uprn = (SELECT official_uprn FROM conflict_resolution.accepted_matches WHERE local_uprn = supplied_uprn AND is_active)
            UNION SELECT local_uprn FROM conflict_resolution.accepted_matches WHERE official_uprn = supplied_uprn AND is_active
          ) x;
        $f$;
        INSERT INTO wmfs.gazetteer VALUES
          (100070567650, 1, 8, 'B6 6XX'),
          (100070567650, 2, 1, ' b6  6nu '),
          (3455013637, 1, 1, 'B66 2QT'),
          (40006, 1, 6, NULL);
        INSERT INTO conflict_resolution.accepted_matches VALUES
          (40006, 3455013637, true),
          (40008, 3455013637, true),
          (40009, 3455013637, false);
      `)
    })

    const terms = uprn => one('select wmfs.search_terms($1) as v', [uprn])

    it('the UPRN, its masking number, and its postcode with and without its space', async () => {
      expect(await terms(100070567650)).to.have.members(['100070567650', '7M36CJNX', 'B6 6NU', 'B66NU'])
    })

    it('takes the postcode from the best gazetteer row, tidied', async () => {
      // the approved row (' b6  6nu ') wins over the historical one ('B6 6XX')
      expect(await terms(100070567650)).to.not.include('B66XX')
    })

    it('includes the UPRNs matched to it, and their masking numbers', async () => {
      const official = await terms(3455013637)
      expect(official).to.include.members(['3455013637', '40006', '40008', 'B66 2QT', 'B662QT'])
      expect(official).to.include(await one('select wmfs.uprn_to_mask(40006) as v'))
      expect(official, 'inactive match').to.not.include('40009')
    })

    it('a local UPRN with no postcode gets the postcode of the official UPRN it is matched to', async () => {
      expect(await terms(40006)).to.include.members(['40006', '3455013637', '40008', 'B66 2QT', 'B662QT'])
    })

    it('a UPRN not in the gazetteer still gets its UPRN and masking number', async () => {
      expect(await terms(99999)).to.have.members(['99999', await one('select wmfs.uprn_to_mask(99999) as v')])
    })

    it('never returns NULL', async () => {
      expect(await terms(null)).to.eql([])
      expect(await terms(0)).to.eql([])
      expect(await terms(-1)).to.eql([])
    })

    it('can be joined to other terms with ||', async () => {
      const joined = await one("select (NULL::text[] || wmfs.search_terms(NULL)) || ARRAY['x'] as v")
      expect(joined).to.eql(['x'])
    })
  })
})
