'use strict'

let currentResult = ''

let result = ''

let sign = ''

let solve = false

let operValues = []

// const checkInput = () => {
//   for...
// }

const writeNewCurrentResult = (newNumberChar) => {
  document.getElementById('upperBar_currentResult').value += newNumberChar
}

const writeCurrentResult = (newNumberChar) => {
  document.getElementById('upperBar_currentResult').value = newNumberChar
}

const writeResult = (newNumberChar) => {
  result += newNumberChar
  document.getElementById('middleBar_result').value = result
}

const writeFormula = (newNumberChar) => {
  document.getElementById('display_formula').value += newNumberChar
}

const addOperValue = (newOperValue) => {
  operValues.push(newOperValue)
}

const clearOperValues = () => {
  operValues = []
}

const clearResult = () => {
  result = ''
  document.getElementById('middleBar_result').value = ''
}

const clearFormula = () => {
  document.getElementById('display_formula').value = ''
}

const clearCurrentResult = () => {
  currentResult = ''
  document.getElementById('upperBar_currentResult').value = ''
}

const clearCalc = () => {
  clearCurrentResult()
  clearResult()
  clearFormula()
  clearOperValues()
  solve = false
  sign = ''
}

const delLastChar = (str) => {
  str = str.slice(0, str.length - 1)
  document.getElementById('middleBar_result').value = ''
  document.getElementById('middleBar_result').value = str
  document.getElementById('upperBar_currentResult').value = str
  document.getElementById('display_formula').value = str // fix!
  result = str
}

const findOperChar = () => {
  if (result.indexOf('×') > -1 || // simplify!
  result.indexOf('÷') > -1 ||
  result.indexOf('+') > -1 ||
  result.indexOf('-') > -1) {
    clearResult()
  }
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

const solveUnary = (x, oper) => {
  switch (oper) {
  case '=':
    addOperValue(result)
    solveBinary(currentResult, sign, operValues[operValues.length - 1])
    sign = oper
    writeCurrentResult('')
    clearResult()
    writeResult(currentResult)
    if (document.getElementById('display_formula').value !== '') {
      writeFormula(oper + currentResult)
    }
    clearOperValues()
    addOperValue(currentResult)
    solve = true
    result = ''
    break
  case '√':
    writeFormula('; ' + oper + result + '=')
    currentResult = Math.sqrt(Number(x))
    writeFormula(currentResult)
    clearResult()
    break
  }
}

document.getElementById('button_resetCalc').onclick = () => {
  clearCalc()
}

document.getElementById('button_resetAll').onclick = () => {
  clearCalc()
}

document.getElementById('button_delLastChar').onclick = () => {
  delLastChar(result)
  if (addOperValue.length === 1) {
    clearOperValues()
  }
}

const buttonNumbers = document.getElementsByClassName('button_number')
for (const buttonNum of buttonNumbers) {
  buttonNum.onclick = (e) => {
    if (solve && sign === '=') {
      clearResult()
      clearOperValues()
      clearCurrentResult()
      writeResult(e.target.value)
      writeFormula('; ' + e.target.value)
      sign = ''
    } else if (solve && sign !== '=') {
      findOperChar()
      writeResult(e.target.value)
      writeFormula(e.target.value)
    } else {
      findOperChar()
      writeResult(e.target.value)
      writeFormula(e.target.value)
    }
    if (document.getElementById('display_formula').value === '' &&
    sign === '=' && result === '') {
      document.getElementById('display_formula').value = ''
    }
    if (currentResult === '') {
      writeNewCurrentResult(e.target.value)
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
  }
}

const operUnaryButtons = document.getElementsByClassName('button_operUnary')
for (const operUnaryButton of operUnaryButtons) {
  operUnaryButton.onclick = (e) => {
    solveUnary(currentResult, e.target.value)
    writeResult(currentResult)
  }
}
