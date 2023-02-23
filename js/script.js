'use strict'

let currentResult = ''
let result = ''
let sign = ''
let solve = false
let operValues = []

let mems = ['', '', '']
const memBtn = document.querySelector('#middleBar_memButton')
const memVal = document.querySelector('#middleBar_memValue')

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

const clearMemory = () => {
  mems = ['', '', '']
  memVal.value = ''
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
    return Number(x) + Number(y)
  case '-':
    return Number(x) - Number(y)
  case '×':
    return Number(x) * Number(y)
  case '÷':
    return Number(x) / Number(y)
  }
}

const solveUnary = (x, oper) => {
  switch (oper) {
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
  clearMemory()
}

document.getElementById('button_delLastChar').onclick = () => {
  delLastChar(result)
  if (addOperValue.length === 1) {
    clearOperValues()
  }
}

document.getElementById('button_resetMemory').onclick = () => {
  clearMemory()
}

document.getElementById('button_solve').onclick = () => {
  if (sign !== '=' && currentResult !== '') {
    addOperValue(result)
    currentResult =
    solveBinary(currentResult, sign, operValues[operValues.length - 1])
    sign = '='
    writeCurrentResult('')
    clearResult()
    writeResult(currentResult)
    if (document.getElementById('display_formula').value !== '' &&
    solve === false) {
      writeFormula('=' + currentResult)
    }
    clearOperValues()
    // addOperValue(currentResult)
    solve = true
    rewriteResult(currentResult)
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
    addOperValue(result) // repeating start

    if (operValues.length < 2) {
      currentResult = result
    } else {
      currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])
    }

    sign = e.target.value
    solve = false

    writeResult(e.target.value)
    writeCurrentResult(currentResult)
    writeFormula(e.target.value) // repeating end
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

const getMemNum = () => {
  return memBtn.textContent.trim()
}
const changeMemNum = () => {
  switch (getMemNum()) {
  case 'M1:':
    memBtn.textContent = 'M2:'
    memVal.value = mems[1]
    break
  case 'M2:':
    memBtn.textContent = 'M3:'
    memVal.value = mems[2]
    break
  case 'M3:':
    memBtn.textContent = 'M1:'
    memVal.value = mems[0]
    break
  }
}
memBtn.addEventListener('click', changeMemNum)

const saveMemNum = (num) => {
  switch (getMemNum()) {
  case 'M1:':
    mems[0] = num
    memVal.value = mems[0]
    break
  case 'M2:':
    mems[1] = num
    memVal.value = mems[1]
    break
  case 'M3:':
    mems[2] = num
    memVal.value = mems[2]
    break
  }
}

const saveMemButtons = document.getElementsByClassName('button_save')
for (const saveMemButton of saveMemButtons) {
  saveMemButton.onclick = (e) => {
    if (sign !== '=' && sign !== '') {
      addOperValue(result)
      currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])
      sign = '='
      writeCurrentResult('')
      clearResult()
      writeResult(currentResult)
      if (document.getElementById('display_formula').value !== '' &&
      solve === false) {
        writeFormula('=' + currentResult)
      }
      clearOperValues()
      solve = true
      rewriteResult(currentResult)
      memVal.value = Number(memVal.value) + currentResult
      saveMemNum(memVal.value)
    } else {
      currentResult = document.getElementById('middleBar_result').value
      memVal.value = solveBinary(memVal.value, e.target.value, currentResult)
      saveMemNum(memVal.value)
    }
  }
}

// MEMORY END
