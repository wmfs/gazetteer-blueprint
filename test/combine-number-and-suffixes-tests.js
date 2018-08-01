/* eslint-env mocha */

'use strict'

const chai = require('chai')
const expect = chai.expect
const combSuf = require('../../addressbox-blueprint/functions/utils/combine-numbers-and-suffixes')

describe('Combine suffixes and numbers tests', function () {
  const testlabels = [
    ['a single start number', ['51', null, null, null], '51'],
    ['start number and suffix', ['51', 'A', null, null], '51A'],
    ['start and end number', ['51', null, '53', null], '51-53'],
    ['start number & suffix and end number', ['51', 'A', '53', null], '51A-53'],
    ['start number and end number & suffix', ['51', null, '53', 'B'], '51-53B'],
    ['start number & suffix and end number & suffix', ['51', 'A', '53', 'B'], '51A-53B']
  ]

  for (const test of testlabels) {
    it(test[0], function () {
      const label = combSuf(...test[1])
      expect(label).to.eql(test[2])
    })
  }
})
