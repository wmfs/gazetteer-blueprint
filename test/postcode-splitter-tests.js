/* eslint-env mocha */

const postcodeSplitter = require('../shared/postcode-splitter')
const expect = require('chai').expect

describe('postcode-splitter', function () {
  this.timeout(process.env.TIMEOUT || 600000)

  const testsCases = [
    ['WS10 1AE', 'WS10 1AE'],
    ['WS101AE', 'WS10 1AE'],
    ['WS13BE', 'WS1 3BE'],
    ['B49AV', 'B4 9AV'],
    ['B4', 'B4'],
    ['WS1', 'WS1']
  ]

  for (const [source, target] of testsCases) {
    it(`Split ${source}`, () => {
      const result = postcodeSplitter(source)
      expect(result).to.eql(target)
    })
  }
})
