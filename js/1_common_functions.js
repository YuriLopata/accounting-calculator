'use strict'

const resetChecks = () => {
  isSignChanged = false
  isDelLastChar = false
}

const mirrorText = (text) => {
  text = String(text)
  const chars = text.split('')
  const reversedChars = chars.reverse()
  const mirroredText = reversedChars.join('')
  return mirroredText
}

const rewriteCurrentResult = (newNumberChar) => {
  currentResultText.value = newNumberChar
}
const rewriteResult = (num) => {
  resultText.value = num
}

const addToCurrentResult = (newNumberChar) => {
  currentResultText.value += newNumberChar
}

const addToResult = (newNumberChar) => {
  result += newNumberChar
  resultText.value = result
}

const addToFormula = (newNumberChar) => {
  const initialFormula = formula.value
  formula.value =
  mirrorText(newNumberChar) + initialFormula
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
  formula.value = mirrorText(newNumberChar)
}

const addOperValue = (newOperValue) => {
  operValues.push(newOperValue)
}

const clearOperValues = () => {
  operValues = []
}
const clearResultValue = () => {
  result = ''
}
const clearResultText = () => {
  resultText.value = ''
}
const clearResult = () => {
  clearResultValue()
  clearResultText()
}
const clearFormula = () => {
  formula.value = ''
}
const clearCurrentResultValue = () => {
  currentResult = ''
}
const clearCurrentResultText = () => {
  currentResultText.value = ''
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
  solve = false
  sign = ''
}

const clearMemory = () => {
  memValues = ['', '', '']
  memShown.value = ''
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
