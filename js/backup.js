'use strict'

let result = ''

let currentResult = ''

let formula = document.getElementById('display_formula').value

const operValues = []

// const checkInput = () => {
//   for...
// }

const writeFirstCurrentResult = (newNumberChar) => {
  document.getElementById('currentResult').value += newNumberChar
}

const writeCurrentResult = () => {
  document.getElementById('currentResult').value = currentResult
}

const writeResult = (newNumberChar) => {
  result += newNumberChar
  document.getElementById('middleBar_result').value = result
}

const writeFormula = (newNumberChar) => {
  document.getElementById('display_formula').value += newNumberChar
}

const clearCalc = () => {
  result = ''
  document.getElementById('middleBar_result').value = ''
}

const clearFormula = () => {
  formula = ''
  document.getElementById('display_formula').value = ''
}

const findOperChar = () => {
  if (result.indexOf('*') > -1 || // simplify!
  result.indexOf('/') > -1 ||
  result.indexOf('+') > -1 ||
  result.indexOf('-') > -1) {
    clearCalc()
  }
}

const buttonNumbers = document.getElementsByClassName('button_number')

for (const buttonNum of buttonNumbers) {
  buttonNum.onclick = (e) => {
    findOperChar()
    writeResult(e.target.value)
    writeFormula(e.target.value)
    if (currentResult === '') {
      writeFirstCurrentResult(e.target.value)
    }
  }
}

const addOperValue = (newOperValue) => {
  operValues.push(newOperValue)
  console.clear()
  // console.log('operValues: ' + operValues)
}

const solve = (x, oper, y) => {
  return eval(`${x}${oper}${y}`)
}

const operBinaryButtons = document.getElementsByClassName('button_operBinary')

for (const operBinaryButton of operBinaryButtons) {
  operBinaryButton.onclick = (e) => {
    addOperValue(result)
    if (operValues.length > 1) {
      currentResult = solve(document.getElementById('currentResult').value,
        e.target.value, operValues[operValues.length - 1])
    }
    writeResult(e.target.value)
    console.log('currentResult: ' + currentResult)
    writeCurrentResult(currentResult)
    writeFormula(e.target.value)
  }
}

document.getElementById('button_resetCalc').onclick = () => {
  console.log('Calculator cleared!')
  clearCalc()
  clearFormula()
}

// document.getElementById('button_solve').onclick = () => {
//   currentResult = solve(document.getElementById('currentResult').value,
//     e.target.value, operValues[operValues.length - 1])
// }
