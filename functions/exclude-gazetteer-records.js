module.exports = function excludeGazetteerRecords () {
  return function excludeGazetteerRecords (sourceRow, callback) {
    if (sourceRow[0] === 65) { // gazetteer record
      sourceRow.pop() // strip marked_as_invalid
      sourceRow.pop() // strip exclude_from_vision_extract
    }

    callback(null, sourceRow)
  }
}
