module.exports = function (source) {
  let result = source

  if (source && !source.includes(' ') && source.length > 4) {
    const strArr = source.split('')
    strArr.splice(source.length - 3, 0, ' ')
    result = strArr.join('')
  }

  return result
}
