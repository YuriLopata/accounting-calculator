'use strict'

let result = ''

let currentResult = ''

let formula = document.getElementById('display_formula')

let sign = ''

const operValues = []

// const checkInput = () => {
//   for...
// }

const writeFirstCurrentResult = (newNumberChar) => {
  document.getElementById('upperBar_currentResult').value += newNumberChar
}

const writeCurrentResult = () => {
  document.getElementById('upperBar_currentResult').value = currentResult
}

const writeResult = (newNumberChar) => {
  result += newNumberChar
  document.getElementById('middleBar_result').value = result
}

const writeFormula = (newNumberChar) => {
  document.getElementById('display_formula').value += newNumberChar
}

const clearResult = () => {
  result = ''
  document.getElementById('middleBar_result').value = ''
}

const clearFormula = () => {
  formula = ''
  document.getElementById('display_formula').value = ''
}

const clearCurrentResult = () => {
  formula = ''
  document.getElementById('upperBar_currentResult').value = ''
}

const solveBinary = (x, oper, y) => {
  switch (oper) {
  case '+':
    currentResult = Number(x) + Number(y)
    break
  case '-':
    currentResult = Number(x) - Number(y)
    break
  case '×':
    currentResult = Number(x) * Number(y)
    break
  case '÷':
    currentResult = Number(x) / Number(y)
    break
  }
}

const addOperValue = (newOperValue) => {
  operValues.push(newOperValue)
  console.clear()
}

const findOperChar = () => {
  if (result.indexOf('×') > -1 || // simplify!
  result.indexOf('÷') > -1 ||
  result.indexOf('+') > -1 ||
  result.indexOf('-') > -1) {
    clearResult()
  }
}

document.getElementById('button_resetCalc').onclick = () => {
  clearResult()
  clearFormula()
  clearCurrentResult()
}

document.getElementById('button_resetAll').onclick = () => {
  clearResult()
  clearFormula()
  clearCurrentResult()
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

const operBinaryButtons = document.getElementsByClassName('button_operBinary')
for (const operBinaryButton of operBinaryButtons) {
  operBinaryButton.onclick = (e) => {
    addOperValue(result)

    if (operValues.length < 2) {
      currentResult = result
    } else {
      solveBinary(currentResult, sign, operValues[operValues.length - 1])
    }
    sign = e.target.value

    writeResult(e.target.value)
    writeCurrentResult(currentResult)
    writeFormula(e.target.value)
    console.log(operValues)
  }
}

const operUnaryButtons = document.getElementsByClassName('button_operUnary')
for (const operUnaryButton of operUnaryButtons) {
  operUnaryButton.onclick = (e) => {
    addOperValue(result)
    solveBinary(currentResult, sign, operValues[operValues.length - 1])
    sign = e.target.value

    writeCurrentResult(currentResult)
    clearResult()
    writeResult(currentResult)
    writeFormula(e.target.value + currentResult)
  }
}
