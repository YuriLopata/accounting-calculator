'use strict'

import { mirrorText, currentResult, modifyCurrentResult, result, modifyResult,
  sign, modifySign, resultText, formula, modifyFormula, operValues,
  binaryOperChars, solve, modifySolve, isSignChanged, modifyIsSignChanged,
  isLastCharOper } from './0_variables_and_checks_min.js'

import { rewriteCurrentResult, rewriteResult, rewriteFormula, addToResult,
  addToFormula, clearResult, clearFormula,
  clearCurrentResultText } from './1_common_functions_min.js'

import { delLastChar, delSeveralLastChars, changeSign } from './3_other_logic_min.js'

const checkNum = (num) => {
  const numStr = num.toString()
  const lastDigit = parseInt(numStr[numStr.length - 1])
  const nineCharsBeforeLast = numStr.slice(numStr.length - 10, numStr.length - 1)
  const allEqual = nineCharsBeforeLast.split('').every(digit =>
    digit === nineCharsBeforeLast[0])

  if (lastDigit < parseInt(nineCharsBeforeLast[0]) && allEqual) {
    return true
  }
  return false
}

const checkDecimalPlaces = (num) => {
  const numStr = num.toString()

  // check if there are 10 or more decimal places
  if (numStr.includes('.') && numStr.split('.')[1].length >= 10) {
    return true
  }
  return false
}

const solveBinary = (x, oper, y) => {
  let innerResult = ''
  switch (oper) {
  case '+':
    innerResult = (Number(x) + Number(y)) * 10 / 10
    break
  case '-':
    innerResult = (Number(x) - Number(y)) * 10 / 10
    break
  case '×':
    innerResult = (Number(x) * Number(y)) * 10 / 10
    break
  case '÷':
    innerResult = (Number(x) / Number(y)) * 10 / 10
    break
  }

  if (checkNum(innerResult)) {
    innerResult = innerResult.toFixed(1)
  }

  if (checkDecimalPlaces(innerResult)) {
    return innerResult.toFixed(10)
  }

  return innerResult
}

const solveUnary = (x, oper) => {
  let prevResult

  if (result === '') return

  const sqrtSet = () => {
    modifyCurrentResult(Math.sqrt(Number(x)))
    clearResult()
    rewriteResult(currentResult)
    addToFormula(currentResult)
    clearCurrentResultText()
    addToResult(currentResult)
    modifySign('√')
    modifySolve(true)
    modifyIsSignChanged(true)
  }

  switch (oper) {
  case '√':
    if (isLastCharOper(result)) return

    if (sign === '=') {
      addToFormula('; ' + oper + mirrorText(result) + '=')
      sqrtSet()
      return
    }

    x = resultText.value
    clearFormula()
    addToFormula(oper + result + '=')
    sqrtSet()
    break
  case '+/-':
    prevResult = result.toString()

    if (isLastCharOper(result)) {
      modifyResult(delLastChar(result))
    }

    x = changeSign(result)
    modifyResult(x)

    if (sign === '' && !solve && currentResult === '') {
      rewriteCurrentResult(x)
      rewriteResult(x)
      rewriteFormula(x)
    }

    if (sign !== '' && !solve && isLastCharOper(prevResult)) {
      modifyCurrentResult(x)
      operValues[0] = result
      rewriteCurrentResult(x)
      rewriteResult(x + sign)
      rewriteFormula(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length))
      modifyResult(result + sign)
      addToFormula(result)
    }

    if (binaryOperChars.includes(sign) && currentResult !== '' && !solve &&
    !isLastCharOper(prevResult) && prevResult > 0) {
      rewriteResult(x)
      rewriteFormula(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length))
      addToFormula(')' + result + '(')
    }

    if (binaryOperChars.includes(sign) && currentResult !== '' &&
    !isLastCharOper(prevResult) && !solve && prevResult < 0) {
      rewriteResult(x)
      modifyFormula(mirrorText(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length + 2)))
      addToFormula(result)
    }

    if (!binaryOperChars.includes(sign) && !isSignChanged &&
    !isLastCharOper(prevResult) && solve) {
      rewriteResult(x)
      addToFormula('; ' + (result))
    }

    if (!binaryOperChars.includes(sign) && isSignChanged &&
    !isLastCharOper(prevResult) && solve) {
      rewriteResult(x)
      rewriteFormula(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length))
      addToFormula(result)
    }
    modifyIsSignChanged(true)
    break
  }
}

const percentage = (num, per) => {
  return (Number(num) / 100) * Number(per)
}

const markUp = () => {
  if (operValues.length < 1) return

  let percent = percentage(currentResult, 100 - result)

  switch (sign) {
  case '÷':
    modifyCurrentResult(solveBinary(currentResult, sign, percent) * currentResult)
    break
  case '×':
    percent = percentage(currentResult, result)
    modifyCurrentResult(solveBinary(currentResult, '+', percent))
    break
  case '+':
    modifyCurrentResult(100 * (Number(currentResult) + Number(result)) / Number(result))
    break
  case '-':
    modifyCurrentResult(100 * (Number(currentResult) - Number(result)) / Number(result))
    break
  }
}

export { checkNum, checkDecimalPlaces, solveBinary, solveUnary, percentage, markUp }
