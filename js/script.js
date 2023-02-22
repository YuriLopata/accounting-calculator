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

const rewriteResult = (num) => {
  document.getElementById('middleBar_result').value = num
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
  rewriteResult(str)
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

const changeSign = (num) => {
  if (Math.sign(Number(num)) === 1) {
    return -Math.abs(num)
  } else {
    return Math.abs(num)
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
    if (document.getElementById('display_formula').value !== '' &&
    solve !== true) {
      writeFormula(oper + currentResult)
    }
    clearOperValues()
    addOperValue(currentResult)
    solve = true
    result = ''
    writeResult(currentResult)
    break
  case '√':
    if (sign === '=') {
      writeFormula('; ' + oper + result + '=')
    } else {
      x = document.getElementById('middleBar_result').value
      clearFormula()
      writeFormula(oper + result + '=')
    }
    currentResult = Math.sqrt(Number(x))
    clearResult()
    rewriteResult(currentResult)
    writeFormula(currentResult)
    document.getElementById('upperBar_currentResult').value = ''
    sign = '√'
    solve = true
    writeResult(currentResult)
    break
  case '+/-':
    if (result !== '') {
      x = changeSign(result)
      result = x
      currentResult = x
      writeCurrentResult(x)
      rewriteResult(x)
      clearFormula()
      writeFormula(x)
    }
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
    if (solve && (sign === '=' || sign === '√')) {
      clearResult()
      clearOperValues()
      clearCurrentResult()
      writeResult(e.target.value)
      writeFormula('; ' + e.target.value)
      sign = ''
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
    if (result !== '') {
      solveUnary(currentResult, e.target.value)
    }
  }
}

// MEMORY START
let mem1 = ''
let mem2 = ''
let mem3 = ''

const memBtn = document.querySelector('#middleBar_memButton')
const memVal = document.querySelector('#middleBar_memValue')
const getMemNum = () => {
  if (memBtn.textContent.indexOf('1') > -1) {
    return 'M1:'
  } else if (memBtn.textContent.indexOf('2') > -1) {
    return 'M2:'
  } else {
    return 'M3:'
  }
}
const changeMemNum = () => {
  memBtn.textContent = getMemNum()
  memVal.value = mem1
}
memBtn.addEventListener('click', changeMemNum)

// const savePosMemBtn = document.querySelector('#button_savePositive')
// const saveNegMemBtn = document.querySelector('#button_saveNegative')
// const saveMemNum = (num) => {
//   memVal.value = result
// }
// savePosMemBtn.onclick = () => {
//   let currentMemNum = getMemNum()
//   saveMemNum()
// }

// // MEMORY END
