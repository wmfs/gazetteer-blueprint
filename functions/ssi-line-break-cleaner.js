function ssiLineBreakCleaner (ctx) {
  return function ssiLineBreakCleaner (sourceRow, callback) {
    if (sourceRow[0] === 67 && sourceRow[4] !== null) {
      const category = sourceRow[4]
      const information = sourceRow[5]

      const notes = `${category}:/r/n${category.replace(/./g, '-')}/r/n${information}`

      sourceRow[4] = notes
      sourceRow.pop()
    }

    callback(null, sourceRow)
  }
}

module.exports = ssiLineBreakCleaner
