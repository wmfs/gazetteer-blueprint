module.exports = function excludeStreetRecords () {
  return function excludeStreetRecords (sourceRow, callback) {
    if (sourceRow[0] === 61) { // street record
      sourceRow.pop() // strip marked_as_invalid
      sourceRow.pop() // strip exclude_from_vision_extract
      sourceRow.pop() // counter
    }

    callback(null, sourceRow)
  }
}
