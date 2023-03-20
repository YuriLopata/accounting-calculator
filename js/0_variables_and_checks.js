'use strict'

const mirrorText = (text) => {
  text = String(text)
  const chars = text.split('')
  const reversedChars = chars.reverse()
  const mirroredText = reversedChars.join('')
  return mirroredText
}

// Variables start

let currentResult = ''
const modifyCurrentResult = (value) => {
  currentResult = value
}
let result = ''
const modifyResult = (value) => {
  result = value
}
const currentResultText = document.querySelector('#upBar_currentResult')
const modifyCurrentResultText = (value) => {
  currentResultText.value = value
}
const resultText = document.querySelector('#midBar_result')
const modifyResultText = (value) => {
  resultText.value = value
}
const formula = document.querySelector('#downBar_formula')
const modifyFormula = (value) => {
  formula.value = value
}
let sign = ''
const modifySign = (value) => {
  sign = value
}
const changeDecNumBtn = document.querySelector('#numberOfDecimals')
const modifyChangeDecNumBtn = (value) => {
  changeDecNumBtn.innerHTML = value
}

let operValues = []
const modifyOperValues = (value) => {
  operValues = value
}
const addOperValues = (value) => {
  operValues.push(value)
}
const binaryOperChars = ['+', '-', '×', '÷']
const unaryOperChars = ['=', '√', 'MU', '%']

let memValues = ['', '', '']
const modifyMemValues = (value) => {
  memValues = value
}
const memBtn = document.querySelector('.upBar_memButton')
const modifyMemBtn = (value) => {
  memBtn.textContent = value
}
const memShown = document.querySelector('#upBar_memValue')
const modifyMemShown = (value) => {
  memShown.value = value
}

// Variables end

// Checks start

let solve = false
const modifySolve = (value) => {
  solve = value
}
let isSignChanged = false
const modifyIsSignChanged = (value) => {
  isSignChanged = value
}
let isDelLastChar = false
const modifyIsDelLastChar = (value) => {
  isDelLastChar = value
}

const areClickedNumZeros = (clickedNum) => {
  if (clickedNum === '0' || clickedNum === '00') return true
  return false
}

const isLastChar = (str, char) => {
  str = str.toString()
  const strLastChar = str.slice(str.length - 1)
  if (strLastChar.includes(char)) return true
  return false
}

const isLastCharOper = (str) => {
  str = str.toString()
  const strLastChar = str.slice(str.length - 1)
  if (binaryOperChars.includes(strLastChar)) return true
  return false
}

// Checks end

export { mirrorText, currentResult, modifyCurrentResult, result, modifyResult,
  sign, modifySign, currentResultText, modifyCurrentResultText, resultText,
  modifyResultText, formula, modifyFormula, changeDecNumBtn,
  modifyChangeDecNumBtn, operValues, addOperValues, modifyOperValues,
  binaryOperChars, unaryOperChars, memValues, modifyMemValues, memBtn,
  modifyMemBtn, memShown, modifyMemShown, solve, modifySolve, isSignChanged,
  modifyIsSignChanged, isDelLastChar, modifyIsDelLastChar, areClickedNumZeros,
  isLastChar, isLastCharOper }
