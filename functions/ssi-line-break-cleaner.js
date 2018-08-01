function ssiLineBreakCleaner (ctx) {
  return function ssiLineBreakCleaner (sourceRow, callback) {
    if (sourceRow[0] === 67 && sourceRow[4] !== null) {
      const from = sourceRow[4]
      const to = from
        .replace(/\r/g, '')
        .replace(/\n/g, '/r/n')

      sourceRow[4] = to
    }

    callback(null, sourceRow)
  }
}

module.exports = ssiLineBreakCleaner
