'use strict'

module.exports = function getAddressLabel () {
  return async function getAddressLabel (env, event) {
    const gazetteerModel = env.bootedServices.storage.models['wmfs_gazetteer']
    const gazetteerRecord = await gazetteerModel.findById(event.boardKeys.uprn)
    return {addressLabel: gazetteerRecord.addressLabel || ''}
  }
}
