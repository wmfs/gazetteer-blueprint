'use strict'

module.exports = function getAddressLabel () {
  return async function getAddressLabel (env, event) {
    const gazetteerModel = env.bootedServices.storage.models.wmfs_gazetteer
    const gazetteerRecord = await gazetteerModel.find({ where: { uprn: { equals: event.boardKeys.uprn } } })
    return { addressLabel: gazetteerRecord[0].addressLabel || '' }
  }
}
