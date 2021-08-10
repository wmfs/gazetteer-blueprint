const combineNumbersAndSuffixes = require('./combine-numbers-and-suffixes')
const postcodeSplitter = require('../../shared/postcode-splitter')

function gazetteerAddress (addressbase) {
  const simplifiedAddressbase = {
    saoNumber: saoNumber(addressbase),
    saoText: saoText(addressbase),
    paoNumber: paoNumber(addressbase),
    paoText: paoText(addressbase),
    businessName: businessName(addressbase),
    buildingName: addressbase.buildingName,
    buildingNumber: addressbase.buildingNumber,
    streetName1: streetName1(addressbase),
    streetName2: streetName2(addressbase),
    areaName1: areaName1(addressbase),
    postTown: postTown(addressbase),
    postCode: postCode(addressbase)
  }

  simplifiedAddressbase.areaName2 = areaName2(addressbase, simplifiedAddressbase.areaName1)

  if (simplifiedAddressbase.areaName1 && !simplifiedAddressbase.areaName2) {
    simplifiedAddressbase.areaName2 = simplifiedAddressbase.areaName1
    simplifiedAddressbase.areaName1 = null
  }

  if (simplifiedAddressbase.areaName1 === simplifiedAddressbase.areaName2) {
    simplifiedAddressbase.areaName1 = null
  }

  const number = buildingNumber(simplifiedAddressbase)

  return {
    businessName: simplifiedAddressbase.businessName,
    buildingName: buildingName(simplifiedAddressbase, number),
    buildingNumber: number,
    streetName1: simplifiedAddressbase.streetName1,
    streetName2: simplifiedAddressbase.streetName2,
    areaName1: simplifiedAddressbase.areaName1,
    areaName2: simplifiedAddressbase.areaName2,
    postTown: simplifiedAddressbase.postTown,
    postCode: simplifiedAddressbase.postCode
  }
} // gazetteerAddress

function saoNumber (addressbase) {
  return combineNumbersAndSuffixes(
    addressbase.saoStartNumber,
    addressbase.saoStartSuffix,
    addressbase.saoEndNumber,
    addressbase.saoEndSuffix
  )
} // saoNumber

function paoNumber (addressbase) {
  return combineNumbersAndSuffixes(
    addressbase.paoStartNumber,
    addressbase.paoStartSuffix,
    addressbase.paoEndNumber,
    addressbase.paoEndSuffix
  )
} // paoNumber

function paoText (addressbase) {
  const bn = businessName(addressbase)
  const paoText = addressbase.paoText

  if ((paoText === bn) || (paoText === addressbase.dependentThoroughfare)) {
    return null
  }

  return addressbase.paoText
} // paoText

function saoText (addressbase) {
  const bn = businessName(addressbase)
  const saoText = addressbase.saoText

  return (saoText !== bn) ? saoText : null
} // saoText

function businessName (addressbase) {
  return addressbase.rmOrganisationName || addressbase.laOrganisation || addressbase.legalName || null
} // businessName

function streetName1 (addressbase) {
  return addressbase.dependentThoroughfare || addressbase.streetDescription
} // streetName1

function streetName2 (addressbase) {
  const thoroughfare = addressbase.thoroughfare || null
  const dtMatch = (addressbase.dependentThoroughfare === addressbase.streetDescription)
  const tMatch = (!!thoroughfare && (thoroughfare === addressbase.streetDescription))

  if (!addressbase.dependentThoroughfare) {
    return !tMatch ? thoroughfare : null
  }

  if (dtMatch) {
    return !tMatch ? thoroughfare : null
  }

  return thoroughfare || addressbase.streetDescription
} // streetName2

function areaName1 (addressbase) {
  return addressbase.doubleDependentLocality ||
    addressbase.dependentLocality ||
    addressbase.locality ||
    addressbase.townName ||
    addressbase.postTown
} // areaName1

function areaName2 (addressbase, areaName1) {
  if (addressbase.dependentLocality && (addressbase.dependentLocality !== areaName1)) {
    return addressbase.dependentLocality
  } else if (addressbase.locality && (addressbase.locality !== areaName1)) {
    return addressbase.locality
  } else if (addressbase.townName && (addressbase.townName !== areaName1)) {
    return addressbase.townName
  } else {
    return addressbase.postTown
  }
} // areaName2

function postCode (addressbase) {
  const postcode = addressbase.postcode || addressbase.postcodeLocator || null
  return postcodeSplitter(postcode)
} // postCode

function postTown (addressbase) {
  return addressbase.postTown || addressbase.townName
} // postTown

// ////////
function buildingName (sab, number) {
  if (!sab.paoText && !sab.saoText) {
    return (sab.buildingName !== number) ? sab.buildingName : null
  }

  if (!sab.saoNumber && !sab.paoNumber) {
    return comma(sab.saoText, sab.paoText)
  }

  return cc(sab.saoText, sab.saoNumber, sab.paoText)
} // buildingName

function buildingNumber (sab) {
  const saopao = (!sab.paoText && !sab.saoText)
    ? cc(sab.saoNumber, sab.paoNumber)
    : sab.paoNumber

  return saopao || sab.buildingNumber
} // buildingNumber

// ///////
function cc (...arr) { return joinup(' ', arr) }
function comma (...arr) { return joinup(', ', arr) }
function joinup (sep, arr) {
  const stripped = arr.filter(x => x)
  return stripped.length ? stripped.join(sep) : null
} // join

module.exports = gazetteerAddress
