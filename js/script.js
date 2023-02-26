'use strict'

let currentResult = ''
let result = ''
let sign = ''
let solve = false
const formula = document.getElementById('display_formula')
let operValues = []

let mems = ['', '', '']
const memBtn = document.querySelector('#middleBar_memButton')
const memVal = document.querySelector('#middleBar_memValue')

const addToCurrentResult = (newNumberChar) => {
  document.getElementById('upperBar_currentResult').value += newNumberChar
}

const rewriteCurrentResult = (newNumberChar) => {
  document.getElementById('upperBar_currentResult').value = newNumberChar
}

const addToResult = (newNumberChar) => {
  result += newNumberChar
  document.getElementById('middleBar_result').value = result
}

const rewriteResult = (num) => {
  document.getElementById('middleBar_result').value = num
}

const addToFormula = (newNumberChar) => {
  document.getElementById('display_formula').value += newNumberChar
}

const rewriteFormula = (newNumberChar) => {
  formula.value = newNumberChar
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
  document.getElementById('middleBar_result').value = ''
}
const clearResult = () => {
  clearResultValue()
  clearResultText()
}

const clearFormula = () => {
  document.getElementById('display_formula').value = ''
}

const clearCurrentResultValue = () => {
  currentResult = ''
}
const clearCurrentResultText = () => {
  document.getElementById('upperBar_currentResult').value = ''
}
const clearCurrentResult = () => {
  clearCurrentResultValue()
  clearCurrentResultText()
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
  const strShorted = str.slice(0, str.length - 1)
  const formulaShorted = formula.value.slice(0, formula.value.length - 1)
  if (result !== '' && formula.value !== '') {
    rewriteCurrentResult(strShorted)
    rewriteResult(strShorted)
    rewriteFormula(formulaShorted)
  }
  return strShorted
}

const findOperChar = (str) => {
  if (str.indexOf('×') > -1 || // simplify!
  str.indexOf('÷') > -1 ||
  str.indexOf('+') > -1 ||
  str.indexOf('-') > -1) {
    return true
  } else {
    return false
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
      addToFormula('; ' + oper + result + '=')
    } else {
      x = document.getElementById('middleBar_result').value
      clearFormula()
      addToFormula(oper + result + '=')
    }
    currentResult = Math.sqrt(Number(x))
    clearResult()
    rewriteResult(currentResult)
    addToFormula(currentResult)
    clearCurrentResultText()
    sign = '√'
    solve = true
    addToResult(currentResult)
    break
  case '+/-':
    if (result !== '') {
      x = changeSign(result)
      result = x
      currentResult = x
      rewriteCurrentResult(x)
      rewriteResult(x)
      clearFormula()
      addToFormula(x)
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
  result = delLastChar(result)
  if (addOperValue.length === 1) {
    clearOperValues()
  }
}

document.getElementById('button_resetMemory').onclick = () => {
  clearMemory()
}

document.getElementById('button_showMemory').onclick = () => {
  if (document.getElementById('display_formula').value !== '') {
    currentResult = memVal.value
    result = memVal.value
    addToFormula(';' + ' ' + memVal.value)
  }
  rewriteCurrentResult(memVal.value)
  rewriteResult(memVal.value)
}

document.getElementById('button_solve').onclick = () => {
  if (sign !== '=' && currentResult !== '') {
    addOperValue(result)
    currentResult =
    solveBinary(currentResult, sign, operValues[operValues.length - 1])
    sign = '='
    rewriteCurrentResult('')
    clearResult()
    addToResult(currentResult)
    if (document.getElementById('display_formula').value !== '' &&
    solve === false) {
      addToFormula('=' + currentResult)
    }
    clearOperValues()
    solve = true
    rewriteResult(currentResult)
  }
}

const buttonNumbers = document.getElementsByClassName('button_number')
for (const buttonNum of buttonNumbers) {
  buttonNum.onclick = (e) => {
    if ((e.target.value !== '00' || e.target.value !== '0' ||
    e.target.value !== '.') && result !== '') {
      if (solve && (sign === '=' || sign === '√')) {
        clearResult()
        clearOperValues()
        clearCurrentResult()
        addToResult(e.target.value)
        addToFormula('; ' + e.target.value)
        sign = '' // necessary?
      } else {
        if (findOperChar(result)) {
          clearResult()
        }
        addToResult(e.target.value)
        addToFormula(e.target.value)
      }
      if (document.getElementById('display_formula').value === '' &&
      sign === '=' && result === '') {
        clearFormula()
      }
      if (currentResult === '') {
        addToCurrentResult(e.target.value)
      }
    } else if (e.target.value !== '00' && e.target.value !== '0' &&
    result === '') {
      if (e.target.value === '.') { // дописать условие чтобы перед точкой вписывался 0
        addToCurrentResult('0')
        addToResult('0')
        addToFormula('0')
      }
      addToCurrentResult(e.target.value)
      addToResult(e.target.value)
      addToFormula(e.target.value)
    }
  }
}

const operBinaryButtons = document.getElementsByClassName('button_operBinary')
for (const operBinaryButton of operBinaryButtons) {
  operBinaryButton.onclick = (e) => {
    addOperValue(result)

    if (findOperChar(result) &&
    sign !== '=') {
      result = delLastChar(result)
    } else if (operValues.length < 2) {
      currentResult = result
    } else {
      currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])
    }

    sign = e.target.value
    solve = false

    addToResult(e.target.value)
    rewriteCurrentResult(currentResult)
    addToFormula(e.target.value)
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
      rewriteCurrentResult('')
      clearResult()
      addToResult(currentResult)
      if (document.getElementById('display_formula').value !== '' &&
      solve === false) {
        addToFormula('=' + currentResult)
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
