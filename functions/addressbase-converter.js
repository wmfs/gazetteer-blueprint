const gazetterAddress = require('./utils/gazetteer-address')
const addressLabel = require('./utils/address-label')

function addressbasePremiumToGazetteer (ctx) {
  return function addressbasePlusConverter (sourceRow, callback) {
    const address = gazetterAddress(sourceRow)
    const label = addressLabel(address)

    const output = {
      uprn: sourceRow.uprn,
      counter: 1,
      lpiKey: sourceRow.lpiKey,
      class: sourceRow.class,
      parentUprn: sourceRow.parentUprn,
      usrn: sourceRow.usrn,
      state: sourceRow.state,
      localCustodianCode: sourceRow.localCustodianCode,
      officialFlag: sourceRow.officialFlag,
      longitude: sourceRow.longitude,
      latitude: sourceRow.latitude,
      actualX: sourceRow.x,
      actualY: sourceRow.y,
      businessName: address.businessName,
      buildingName: address.buildingName,
      buildingNumber: address.buildingNumber,
      streetName1: address.streetName1,
      streetName2: address.streetName2,
      areaName1: address.areaName1,
      areaName2: address.areaName2,
      postTown: address.postTown,
      postcode: address.postCode,
      postCounty: sourceRow.administrativeArea,
      voaNdrpDescCode: sourceRow.voaNdrpDescCode,
      voaNdrScatCode: sourceRow.voaNdrScatCode,
      addressLabel: label,
      addressDescription: sourceRow.uprn,
      wardCode: sourceRow.wardCode,
      dataSource: 'OrdnanceSurvey'
      // todo: masking number?
    }

    callback(null, output)
  }
}

module.exports = addressbasePremiumToGazetteer
