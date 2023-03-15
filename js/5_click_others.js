'use strict'
const clickDelLastChar = () => {
//   if (result === '') return

  if (solve && result.length === 1 && !isDelLastChar) return

  result = delLastChar(result)
  isDelLastChar = true

  if (operValues.length === 1) clearOperValues()
}

const clickShowMemBtn = () => {
  const showMemBtnSet = () => {
    rewriteCurrentResult(currentResult)
    rewriteResult(result)
    addToFormula(memShown.value)
    resetChecks()
  }

  if ((formula.value !== '' && sign === '') || solve) {
    currentResult = memShown.value
    result = memShown.value
    addToFormula(';' + ' ')
    showMemBtnSet()
    return
  }

  result = memShown.value
  showMemBtnSet()
}

const clickSolveBtn = () => {
  if (sign === '÷' && result !== '' && Number(result) === 0) {
    showZeroDevisionError()
    solve = true
    sign = '='
    result = 'Error'
    return
  }

  if (isLastCharOper(result) && result !== '-') {
    clearResult()
    addToResultAndFormula(currentResult)
  }

  if (!unaryOperChars.includes(sign) && currentResult !== '') {
    addOperValue(result)
    currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])

    sign = '='
    rewriteCurrentResult('')
    clearResult()
    addToResult(changeDecResult(currentResult))
    if (formula.value !== '' && !solve) {
      addToFormula('=' + currentResult)
    }
    clearOperValues()
    solve = true
    resetChecks()
  }
}

const clickBinaryBtn = (clickedNum) => {
  const binaryBtnSet = () => {
    sign = clickedNum
    rewriteCurrentResult(currentResult)
    addToResultAndFormula(clickedNum)
    solve = false
    resetChecks()
  }

  if (result !== '' && result !== '-') {
    addOperValue(result)

    if (isLastChar(result, '.')) clickDelLastChar()

    if (isLastCharOper(result) && sign !== '=' && result !== '-') {
      result = delLastChar(result)
      binaryBtnSet()
      return
    }

    if (operValues.length < 2 && sign !== 'MU') {
      currentResult = result
      binaryBtnSet()
      return
    }

    currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])

    binaryBtnSet()
  }

  if (clickedNum === '-' && !isLastCharOper(result)) addToAll(clickedNum)
}

const clickPercentBtn = () => {
  if (sign !== '' && operValues.length > 0 && !isLastCharOper(result)) {
    let percent = percentage(currentResult, result)

    if (sign === '×' || sign === '÷') percent = result / 100

    currentResult = solveBinary(currentResult, sign, percent)

    result = currentResult

    clearOperValues()
    clearCurrentResultText()
    rewriteResult(currentResult)
    addToFormula('%=' + currentResult)

    solve = true
    sign = '%'
    resetChecks()
  }
}

const clickMarkUpBtn = () => {
  markUp()

  result = currentResult
  solve = true
  sign = 'MU'

  clearOperValues()
  clearCurrentResultText()
  rewriteResult(currentResult)
  addToFormula('MU=' + currentResult)
  resetChecks()
}

const clickSaveMemBtn = (clickedNum) => {
  if (isLastCharOper(result) && memShown.value[0] === '-') return

  if (sign !== '=' && sign !== '') {
    addOperValue(result)
    currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])
    sign = '='
    rewriteCurrentResult('')
    rewriteResult(currentResult)

    if (formula.value !== '' && solve === false) {
      addToFormula('=' + currentResult)
    }

    clearOperValues()
    solve = true
    rewriteResult(currentResult)
    memShown.value = Number(memShown.value) + currentResult
    saveMemNum(memShown.value)
    return
  }

  currentResult = resultText.value
  memShown.value = solveBinary(memShown.value, clickedNum, currentResult)
  saveMemNum(memShown.value)
}
