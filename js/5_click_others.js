'use strict'

import { currentResult, modifyCurrentResult, result, modifyResult, sign,
  modifySign, resultText, formula, operValues, unaryOperChars, memShown,
  modifyMemShown, solve, modifySolve, isDelLastChar, modifyIsDelLastChar,
  isLastChar, isLastCharOper } from './0_variables_and_checks_min.js'

import { resetChecks, rewriteCurrentResult, rewriteResult, addToResult,
  addToFormula, addToResultAndFormula, addToAll, clearResult,
  clearCurrentResultText, addOperValue, clearOperValues,
  showZeroDevisionError } from './1_common_functions_min.js'

import { solveBinary, percentage, markUp } from './2_calculation_logic_min.js'

import { delLastChar, addShortedRes, changeDecResult,
  saveMemNum } from './3_other_logic_min.js'

const clickDelLastChar = () => {
  if (solve && result.length === 1 && !isDelLastChar) return

  modifyResult(delLastChar(result))
  addShortedRes(result)
  modifyIsDelLastChar(true)

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
    modifyCurrentResult(memShown.value)
    modifyResult(memShown.value)
    addToFormula(';' + ' ')
    showMemBtnSet()
    return
  }

  modifyResult(memShown.value)
  showMemBtnSet()
}

const clickSolveBtn = () => {
  if (sign === '÷' && result !== '' && Number(result) === 0) {
    showZeroDevisionError()
    modifySolve(true)
    modifySign('=')
    modifyResult('Error')
    return
  }

  if (isLastCharOper(result) && result !== '-') {
    clearResult()
    addToResultAndFormula(currentResult)
  }

  if (!unaryOperChars.includes(sign) && currentResult !== '') {
    addOperValue(result)
    modifyCurrentResult(solveBinary(currentResult, sign, operValues[operValues.length - 1]))

    modifySign('=')
    rewriteCurrentResult('')
    clearResult()
    addToResult(changeDecResult(currentResult))
    if (formula.value !== '' && !solve) {
      addToFormula('=' + currentResult)
    }
    clearOperValues()
    modifySolve(true)
    resetChecks()
  }
}

const clickBinaryBtn = (clickedNum) => {
  const binaryBtnSet = () => {
    modifySign(clickedNum)
    rewriteCurrentResult(currentResult)
    addToResultAndFormula(clickedNum)
    modifySolve(false)
    resetChecks()
  }

  if (result !== '' && result !== '-') {
    addOperValue(result)

    if (isLastChar(result, '.')) clickDelLastChar()

    if (isLastCharOper(result) && sign !== '=' && result !== '-') {
      modifyResult(delLastChar(result))
      addShortedRes(result)
      binaryBtnSet()
      return
    }

    if (operValues.length < 2 && sign !== 'MU') {
      modifyCurrentResult(result)
      binaryBtnSet()
      return
    }

    modifyCurrentResult(solveBinary(currentResult, sign, operValues[operValues.length - 1]))

    binaryBtnSet()
  }

  if (clickedNum === '-' && !isLastCharOper(result)) addToAll(clickedNum)
}

const clickPercentBtn = () => {
  if (sign !== '' && operValues.length > 0 && !isLastCharOper(result)) {
    let percent = percentage(currentResult, result)

    if (sign === '×' || sign === '÷') percent = result / 100

    modifyCurrentResult(solveBinary(currentResult, sign, percent))

    modifyResult(currentResult)

    clearOperValues()
    clearCurrentResultText()
    rewriteResult(currentResult)
    addToFormula('%=' + currentResult)

    modifySolve(true)
    modifySign('%')
    resetChecks()
  }
}

const clickMarkUpBtn = () => {
  markUp()

  modifyResult(currentResult)
  modifySolve(true)
  modifySign('MU')

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
    modifyCurrentResult(solveBinary(currentResult, sign, operValues[operValues.length - 1]))
    modifySign('=')
    rewriteCurrentResult('')
    rewriteResult(currentResult)

    if (formula.value !== '' && solve === false) {
      addToFormula('=' + currentResult)
    }

    clearOperValues()
    modifySolve(true)
    rewriteResult(currentResult)
    modifyMemShown(Number(memShown.value) + currentResult)
    saveMemNum(memShown.value)
    return
  }

  modifyCurrentResult(resultText.value)
  modifyMemShown(solveBinary(memShown.value, clickedNum, currentResult))
  saveMemNum(memShown.value)
}

export { clickDelLastChar, clickShowMemBtn, clickSolveBtn, clickBinaryBtn, clickPercentBtn, clickMarkUpBtn, clickSaveMemBtn }
