/* eslint-env mocha */

const chai = require('chai')
const expect = chai.expect
const getBlpuLabel = require('../functions/utils/address-label')

describe('address label tests', () => {
  const tests = [
    [
      'straightforward address',
      {
        businessName: 'organisation',
        buildingName: 'hello you!',
        buildingNumber: '121',
        streetName1: 'ALPHINGTON ROAD',
        streetName2: null,
        areaName1: null,
        areaName2: null,
        postTown: 'EXETER',
        postCode: 'EX2 8JD'
      },
      'Organisation, Hello You!, 121 Alphington Road, Exeter, EX2 8JD'
    ],
    [
      'area name 1',
      {
        businessName: 'THE WREKIN HOUSING TRUST',
        buildingName: '5-6 HORSESHOES COURT',
        buildingNumber: null,
        streetName1: 'HIGH STREET',
        streetName2: null,
        areaName1: 'MADELEY',
        areaName2: null,
        postTown: 'TELFORD',
        postCode: 'TF7 5BG'
      },
      'The Wrekin Housing Trust, 5-6 Horseshoes Court, High Street, Madeley, Telford, TF7 5BG'
    ],
    [
      'streetname 1 & 2, area name 1',
      {
        businessName: null,
        buildingName: null,
        buildingNumber: '1',
        streetName1: 'FAIRVIEW PARK',
        streetName2: 'STATION ROAD',
        areaName1: 'WRENBURY',
        areaName2: null,
        postTown: 'NANTWICH',
        postCode: 'CW5 8HR'
      },
      '1 Fairview Park, Station Road, Wrenbury, Nantwich, CW5 8HR'
    ],
    [
      'no delivery point address',
      {
        businessName: null,
        buildingName: 'STEWARDS RESIDENCE, LADBROOK PARK GOLF CLUB',
        buildingNumber: null,
        streetName1: 'POOLHEAD LANE',
        streetName2: null,
        areaName1: null,
        areaName2: null,
        postTown: 'TANWORTH-IN-ARDEN',
        postCode: null
      },
      'Stewards Residence, Ladbrook Park Golf Club, Poolhead Lane, Tanworth-In-Arden'
    ],
    [
      'building name and number',
      {
        businessName: null,
        buildingName: 'FLAT 2',
        buildingNumber: '79',
        streetName1: 'EARLSWOOD COMMON',
        streetName2: null,
        areaName1: 'EARLSWOOD',
        areaName2: null,
        postTown: 'SOLIHULL',
        postCode: 'B94 5SJ'
      },
      'Flat 2, 79 Earlswood Common, Earlswood, Solihull, B94 5SJ'
    ],
    [
      'area name 1 & 2',
      {
        businessName: null,
        buildingName: 'COPPICE HOUSE',
        buildingNumber: null,
        streetName1: 'DOG IN LANE',
        streetName2: null,
        areaName1: 'HUNTINGDON',
        areaName2: 'LITTLE WENLOCK',
        postTown: 'TELFORD',
        postCode: 'TF6 5BW'
      },
      'Coppice House, Dog In Lane, Huntingdon, Little Wenlock, Telford, TF6 5BW'
    ],
    [
      'area name 2 the same as the post town is only shown once',
      {
        businessName: 'ACORN VIEW CARE HOME',
        buildingName: null,
        buildingNumber: null,
        streetName1: 'EXAMPLE ROAD',
        streetName2: null,
        areaName1: 'NETHERTON',
        areaName2: 'DUDLEY',
        postTown: 'DUDLEY',
        postCode: 'ZZ1 1AA'
      },
      'Acorn View Care Home, Example Road, Netherton, Dudley, ZZ1 1AA'
    ],
    [
      'area name 2 the same as the post town, without area name 1',
      {
        businessName: 'MAPLE LODGE',
        buildingName: null,
        buildingNumber: '12',
        streetName1: 'SAMPLE AVENUE',
        streetName2: null,
        areaName1: null,
        areaName2: 'WOLVERHAMPTON',
        postTown: 'WOLVERHAMPTON',
        postCode: 'ZZ2 1AA'
      },
      'Maple Lodge, 12 Sample Avenue, Exampleton, ZZ2 1AA'
    ],
    [
      'repeated town in a different case or spacing is only shown once',
      {
        businessName: 'CORNER CAFE',
        buildingName: null,
        buildingNumber: '3',
        streetName1: 'TEST STREET',
        streetName2: null,
        areaName1: null,
        areaName2: 'Smethwick ',
        postTown: 'SMETHWICK',
        postCode: 'ZZ3 1AA'
      },
      'Corner Cafe, 3 Test Street, Smethwick, ZZ3 1AA'
    ],
    [
      'area name 1 the same as the post town is only shown once',
      {
        businessName: null,
        buildingName: null,
        buildingNumber: '7',
        streetName1: 'FICTIONAL LANE',
        streetName2: null,
        areaName1: 'SANDBACH',
        areaName2: null,
        postTown: 'SANDBACH',
        postCode: 'ZZ4 1AA'
      },
      '7 Fictional Lane, Sandbach, ZZ4 1AA'
    ]
  ]

  for (const [testname, gazetter, label] of tests) {
    it(testname, () => {
      expect(getBlpuLabel(gazetter)).to.be.eql(label)
    })
  }
})
