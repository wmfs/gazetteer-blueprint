/* eslint-env mocha */

const chai = require('chai')
const expect = chai.expect
const processString = require('../../addressbox-blueprint/functions/utils/process-string')

describe('Process string tests', function () {
  it('Should process a simple string', function () {
    expect(processString('hello world!')).to.be.eql('Hello World!')
  })

  it('Should process an empty string', function () {
    expect(processString(null)).to.be.eql(null)
    expect(processString('')).to.be.eql(null)
    expect(processString(' ')).to.be.eql(' ')
  })
})
