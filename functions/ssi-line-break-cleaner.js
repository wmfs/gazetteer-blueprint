function ssiLineBreakCleaner (ctx) {
  return function ssiLineBreakCleaner (sourceRow, callback) {
    if (sourceRow[0] === 67 && sourceRow[4] !== null) {
      sourceRow[4] = sourceRow[4].replace(/\r/g, '').replace(/\n/g, '/r/n')

      // const category = sourceRow[4].replace(/\r/g, '').replace(/\n/g, '/r/n')
      // const information = sourceRow[5].replace(/\r/g, '').replace(/\n/g, '/r/n')
      //
      // const notes = `${category}:/r/n${category.replace(/./g, '-')}/r/n${information}`
      //
      // sourceRow[4] = notes
      // sourceRow.pop()
    }

    callback(null, sourceRow)
  }
}

module.exports = ssiLineBreakCleaner
