const _ = require('lodash')

function processString (inputString) {
  if (!inputString) {
    return null
  }

  if (isMixedCase(inputString)) {
    return inputString
  }

  return inputString
    .split(' ')
    .map(initCaps)
    .join(' ')
} // processString

function isMixedCase (str) {
  const u = str.toUpperCase()
  const l = str.toLowerCase()

  return (str !== u) && (str !== l)
} // isMixedCase

function initCaps (str) {
  if (startsWithNumber(str)) { return str }

  return str
    .split('-')
    .map(_.capitalize)
    .join('-')
} // initCaps

function startsWithNumber (str) {
  if (str.length === 0) { return }

  const f = str[0]
  return f.toLowerCase() === f.toUpperCase()
}

module.exports = processString
