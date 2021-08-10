const addressLabel = require('./utils/address-label')

function addAddressLabel () {
  return function addLabel (event) {
    const label = addressLabel(event)

    event.addressLabel = label

    return event
  }
}

module.exports = addAddressLabel
