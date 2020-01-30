module.exports = function excludeGazetteerRecords () {
  return function excludeGazetteerRecords (sourceRow, callback) {
    if (sourceRow[0] === 65) { // gazetteer record
      const primaryFlag = sourceRow[22]
      if (!primaryFlag) {
        sourceRow[22] = sourceRow[4] === 1 ? 1 : 0
      }
    }

    callback(null, sourceRow)
  }
}
