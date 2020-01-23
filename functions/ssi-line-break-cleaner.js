function ssiLineBreakCleaner (ctx) {
  return function ssiLineBreakCleaner (sourceRow, callback) {
    if (sourceRow[0] === 67 && sourceRow[4] !== null) {
      const category = sourceRow[4].replace(/\r/g, '').replace(/\n/g, '/r/n')
      const information = sourceRow[5].replace(/\r/g, '').replace(/\n/g, '/r/n')

      const notes = `${category}:/r/n${category.replace(/\./g, '-')}/r/n${information}`

      sourceRow[4] = notes
      sourceRow.pop()
    } else if (sourceRow[0] === 65) {
      sourceRow.pop() // strip marked_as_invalid
      sourceRow.pop() // strip marked_as_error
    }

    callback(null, sourceRow)
  }
}

module.exports = ssiLineBreakCleaner
