module.exports = function getAddressLabel () {
  return async function (env, event) {
    const model = env.bootedServices.storage.models.wmfs_gazetteer
    const record = await model.findById([event.boardKeys.uprn, 1])
    return { addressLabel: record ? record.addressLabel : '' }
  }
}
