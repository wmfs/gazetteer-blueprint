
// addressbase rules on property numbers
// there are no end numbers without start numbers
// there are no suffixes without numbers
function combineNumbersAndSuffixes (startNumber, startSuffix, endNumber, endSuffix) {
  if (!startNumber) return null

  const start = numberAndSuffix(startNumber, startSuffix)

  if (!endNumber) {
    return start
  }

  const end = numberAndSuffix(endNumber, endSuffix)
  return `${start}-${end}`
} // combineNumbersAndSuffixes

function numberAndSuffix (number, suffix) {
  return suffix ? number + suffix : number
}

module.exports = combineNumbersAndSuffixes
