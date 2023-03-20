'use strict'

import { currentResult, result, modifyResult, sign, modifySign, solve,
  currentResultText, formula, binaryOperChars, unaryOperChars,
  isDelLastChar, areClickedNumZeros, isLastChar,
  isLastCharOper } from './0_variables_and_checks_min.js'

import { resetChecks, rewriteCurrentResult, rewriteResult, addToCurrentResult,
  addToFormula, addToResultAndFormula, addToAll, clearResult, clearFormula,
  clearResultsAndOperValues } from './1_common_functions_min.js'

const clickNumberBtn = (clickedNum) => {
  // The set is used in several places of the function
  const numberBtnSet = () => {
    if (formula.value === '' && sign === '=' && result === '') {
      clearFormula()
    }
    if (currentResult === '') addToCurrentResult(clickedNum)
    resetChecks()
  }

  if (Number(result) === 0 && result !== '' && formula.value === '') {
    clearResult()
  }

  if (String(result).length === 11 && clickedNum === '00') {
    if (currentResult.length === 12) {
      addToResultAndFormula('0')
      return
    }
    addToAll('0')
    return
  }

  if (String(result).length === 12 && !isLastCharOper(result) &&
  sign !== '=') return

  if (areClickedNumZeros(clickedNum) && binaryOperChars.includes(sign) &&
  isLastChar(result, '0') && !result.includes('.')) return

  if (areClickedNumZeros(clickedNum) && binaryOperChars.includes(sign) &&
  !isLastChar(result, '.') && !isLastChar(result, '0') &&
  !isLastChar(result, sign)) {
    addToResultAndFormula(clickedNum)
    return
  }

  if (areClickedNumZeros(clickedNum) && binaryOperChars.includes(sign) &&
  isLastChar(result, '0') && result.includes('.')) {
    rewriteCurrentResult(currentResult)
    addToResultAndFormula(clickedNum)
    return
  }

  if (areClickedNumZeros(clickedNum) && binaryOperChars.includes(sign) &&
  !isLastChar(result, '.')) {
    modifyResult('0')
    rewriteResult('0')
    rewriteCurrentResult(currentResult)
    addToFormula('0')
    return
  }

  if (clickedNum === '.' && result.includes('.') && !isLastCharOper(result) &&
  currentResultText.value !== '') {
    return
  }

  if (isLastChar(formula.value, ';')) addToFormula(' ')

  if ((clickedNum !== '00' || clickedNum !== '0') &&
  (result !== '' || solve)) {
    if (unaryOperChars.includes(sign) && result === 'Error') {
      clearFormula()
      clearResultsAndOperValues()
    }

    if (unaryOperChars.includes(sign) && result !== 'Error' &&
    !isDelLastChar) {
      addToFormula('; ')
      clearResultsAndOperValues()
    }

    if (unaryOperChars.includes(sign) && clickedNum === '.') {
      addToAll('0')
    }

    if (unaryOperChars.includes(sign)) {
      addToResultAndFormula(clickedNum)
      modifySign('')
      numberBtnSet()
      return
    }

    if (isLastCharOper(result) && result.length > 1 && sign !== '') {
      clearResult()
    }

    if (clickedNum === '.' && result === '') addToResultAndFormula('0')

    if (typeof result === 'string' && result !== '-' && result === '' &&
    !isLastChar(result, '.')) {
      modifyResult(Number(result))
    }

    if (typeof result === 'number' && result === 0) {
      modifyResult('')
    }

    addToResultAndFormula(clickedNum)
    numberBtnSet()
    return
  }

  if (clickedNum !== '00' && clickedNum !== '0') {
    if (clickedNum === '.') addToAll('0')
    addToAll(clickedNum)
    resetChecks()
  }
}

export { clickNumberBtn }
