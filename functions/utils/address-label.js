const processString = require('./process-string')

function addressLabel (gazetteerAddress) {
  const lines = [
    gazetteerAddress.businessName,
    gazetteerAddress.buildingName,
    numberAndStreet(gazetteerAddress),
    gazetteerAddress.streetName2,
    gazetteerAddress.areaName1,
    gazetteerAddress.areaName2,
    gazetteerAddress.postTown
  ]
    .filter(line => line)
    .map(line => processString(line))

  if (gazetteerAddress.postCode) {
    lines.push(gazetteerAddress.postCode)
  }

  return lines.join(', ')
} // addressLabel

function numberAndStreet (ga) {
  return ga.buildingNumber
    ? `${ga.buildingNumber} ${ga.streetName1}`
    : ga.streetName1
}

module.exports = addressLabel
