'use strict'

import { mirrorText, modifyCurrentResult, result, modifyResult, modifySign,
  currentResultText, modifyCurrentResultText, modifyResultText, formula,
  modifyFormula, addOperValues, modifyOperValues, modifyMemValues,
  modifyMemShown, modifySolve, modifyIsSignChanged,
  modifyIsDelLastChar } from './0_variables_and_checks_min.js'

const resetChecks = () => {
  modifyIsSignChanged(false)
  modifyIsDelLastChar(false)
}

const rewriteCurrentResult = (newNumberChar) => {
  modifyCurrentResultText(newNumberChar)
}
const rewriteResult = (num) => {
  modifyResultText(num)
}

const addToCurrentResult = (newNumberChar) => {
  modifyCurrentResultText(currentResultText.value + newNumberChar)
}

const addToResult = (newNumberChar) => {
  modifyResult(result + newNumberChar)
  modifyResultText(result)
}

const addToFormula = (newNumberChar) => {
  const initialFormula = formula.value
  modifyFormula(mirrorText(newNumberChar) + initialFormula)
}

const addToResultAndFormula = (newNumberChar) => {
  addToResult(newNumberChar)
  addToFormula(newNumberChar)
}

const addToAll = (newNumberChar) => {
  addToCurrentResult(newNumberChar)
  addToResult(newNumberChar)
  addToFormula(newNumberChar)
}

const rewriteFormula = (newNumberChar) => {
  modifyFormula(mirrorText(newNumberChar))
}

const addOperValue = (newOperValue) => {
  addOperValues(newOperValue)
}

const clearOperValues = () => {
  modifyOperValues([])
}
const clearResultValue = () => {
  modifyResult('')
}
const clearResultText = () => {
  modifyResultText('')
}
const clearResult = () => {
  clearResultValue()
  clearResultText()
}
const clearFormula = () => {
  modifyFormula('')
}
const clearCurrentResultValue = () => {
  modifyCurrentResult('')
}
const clearCurrentResultText = () => {
  modifyCurrentResultText('')
}
const clearCurrentResult = () => {
  clearCurrentResultValue()
  clearCurrentResultText()
}
const clearResultsAndOperValues = () => {
  clearCurrentResult()
  clearResult()
  clearOperValues()
}

const clearCalc = () => {
  clearCurrentResult()
  clearResult()
  clearFormula()
  clearOperValues()
  resetChecks()
  modifySolve(false)
  modifySign('')
}

const clearMemory = () => {
  modifyMemValues(['', '', ''])
  modifyMemShown('')
}

const clearAll = () => {
  clearCalc()
  clearMemory()
}

const showZeroDevisionError = () => {
  clearCurrentResultText()
  rewriteResult('Error')
  rewriteFormula("You can't divide by zero")
}

export { resetChecks, rewriteCurrentResult, rewriteResult, rewriteFormula,
  addToCurrentResult, addToResult, addToFormula, addToResultAndFormula,
  addToAll, clearResultValue, clearResultText, clearResult, clearFormula,
  clearCurrentResultValue, clearCurrentResultText, clearCurrentResult,
  clearResultsAndOperValues, clearCalc, clearMemory, clearAll, addOperValue,
  clearOperValues, showZeroDevisionError }
