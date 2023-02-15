'use strict'

let result = ''

// let currentResult

// let formula = document.getElementById('display_formula').value

const operValues = []

// const checkInput = () => {
//   for...
// }

const writeResult = (newNumberChar) => {
  result += newNumberChar
  document.getElementById('display_output').value = result
}

const writeFormula = (newNumberChar) => {
  document.getElementById('display_formula').value += newNumberChar
}

const clearCalc = () => {
  result = ''
  document.getElementById('display_output').value = ''
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
    // if (result !== '') {
    //   clearCalc()
    // }
    findOperChar()
    writeResult(e.target.value)
    writeFormula(e.target.value)
  }
}

const addOperValue = (newValue) => {
  operValues.push(newValue)
//   console.log(operValues)
}

const solve = (firstValue, secondValue) => {
//   result = Number(firstValue + operBinaryButton + secondValue)
//   document.getElementById('display_output').value = currentResult
  currentResult = operValues[operValues.length - 1]
}

const operBinaryButtons = document.getElementsByClassName('button_operBinary')

for (const operBinaryButton of operBinaryButtons) {
  operBinaryButton.onclick = (e) => {
    const enteredValue = result
    addOperValue(enteredValue)
    writeResult(e.target.value)
    writeFormula(e.target.value)
    solve(0, 0)
  }
}

document.getElementById('button_resetCalc').onclick = () => {
  console.log('Calculator cleared!')
  clearCalc()
  clearFormula()
}
