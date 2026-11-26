const processString = require('./process-string')

function addressLabel (gazetteerAddress) {
  const lines = [
    gazetteerAddress.businessName,
    gazetteerAddress.buildingName,
    numberAndStreet(gazetteerAddress),
    gazetteerAddress.streetName2,
    ...areaNames(gazetteerAddress)
  ]
    .filter(line => line)
    .map(line => processString(line))

  if (gazetteerAddress.postCode) {
    lines.push(gazetteerAddress.postCode)
  }
  if (gazetteerAddress.postcode) {
    lines.push(gazetteerAddress.postcode)
  }

  return lines
    .map(l => l.trim())
    .join(', ')
} // addressLabel

// The area names and post town, without repeats (e.g. "Dudley, Dudley"), ignoring case and spacing.
// Only the label changes: areaName1, areaName2 and postTown are stored as they are.
function areaNames (ga) {
  const names = [ga.areaName1, ga.areaName2, ga.postTown].filter(name => name)
  return names.filter((name, i) => !names.slice(i + 1).some(later => sameName(name, later)))
}

function sameName (a, b) {
  const squash = s => String(s).replace(/\s+/g, ' ').trim().toLowerCase()
  return squash(a) === squash(b)
}

function numberAndStreet (ga) {
  return [ga.buildingNumber, ga.streetName1].filter(e => e).join(' ')
}

module.exports = addressLabel
