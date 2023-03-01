'use strict'

let currentResult = ''
let result = ''
let sign = ''
let solve = false
const formula = document.getElementById('display_formula')
let operValues = []
const operChars = ['+', '-', '×', '÷']

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

const addToAll = (newNumberChar) => {
  addToCurrentResult(newNumberChar)
  addToResult(newNumberChar)
  addToFormula(newNumberChar)
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
  str = str.toString()
  const strShorted = str.slice(0, str.length - 1)
  const formulaShorted = formula.value.slice(0, formula.value.length - 1)
  if (result !== '' && formula.value !== '') {
    rewriteCurrentResult(strShorted)
    rewriteResult(strShorted)
    rewriteFormula(formulaShorted)
  }
  return strShorted
}

const delSeveralLastChars = (str, charNum) => {
  str = str.toString()
  const strShorted = str.slice(0, str.length - charNum)
  return strShorted
}

const isLastCharOper = (str) => {
  str = str.toString()
  const strLastChar = str.slice(str.length - 1)
  if (operChars.includes(strLastChar)) {
    return true
  }
  return false
}

const changeSign = (num) => {
  if (Math.sign(Number(num)) === 1) {
    return -Math.abs(num)
  } else {
    return Math.abs(num)
  }
}

const percentage = (num, per) => {
  return (Number(num) / 100) * Number(per)
}

const solveBinary = (x, oper, y) => {
  switch (oper) {
  case '+':
    return (Number(x) + Number(y)) * 10 / 10
  case '-':
    return (Number(x) - Number(y)) * 10 / 10
  case '×':
    return (Number(x) * Number(y)) * 10 / 10
  case '÷':
    return (Number(x) / Number(y)) * 10 / 10
  }
}

const solveUnary = (x, oper) => {
  let initialResult
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
    solve = true // necessary?
    addToResult(currentResult)
    break
  case '+/-':
    console.clear('');
    initialResult = result

    if (isLastCharOper(result)) {
      result = delLastChar(result)
    }

    x = changeSign(result)
    result = x

    if (operValues.length < 1 && sign === '' && !solve) {
      console.log(1);
      rewriteCurrentResult(x)
      rewriteResult(x)
      rewriteFormula(x)
    }

    if (operValues.length < 2 && sign !== '' &&
    isLastCharOper(initialResult) && !solve) {
      console.log(2);
      currentResult = x // maybe shit
      operValues[0] = result
      rewriteCurrentResult(x)
      rewriteResult(x + sign)
      formula.value = delSeveralLastChars(formula.value, result.length)
      addToFormula(result + sign)
      result += sign
    }

    if (operValues.length < 2 && operChars.includes(sign) &&
    !isLastCharOper(initialResult) && !solve) {
      console.log(3);
      rewriteResult(x)
      formula.value = delSeveralLastChars(formula.value, initialResult.length)
      addToFormula('(' + result + ')')
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
  if (document.getElementById('display_formula').value !== '' &&
  sign === '') {
    currentResult = memVal.value
    result = memVal.value
    addToFormula(';' + ' ')
  } else if (solve) {
    currentResult = memVal.value
    result = memVal.value
    addToFormula(';' + ' ')
  } else {
    result = memVal.value
  }
  rewriteCurrentResult(currentResult)
  rewriteResult(result)
  addToFormula(memVal.value)
}

document.getElementById('button_solve').onclick = () => {
  if (sign !== '=' && sign !== 'MU' && sign !== '%' && currentResult !== '') {
    addOperValue(result)
    currentResult =
    solveBinary(currentResult, sign, operValues[operValues.length - 1])
    sign = '='
    rewriteCurrentResult('')
    clearResult()
    addToResult(currentResult)
    if (formula.value !== '' && !solve) {
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
    console.clear()
    if ((e.target.value !== '00' || e.target.value !== '0') && result !== '') {
      console.log('main if');
      if (solve && (sign === '=' || sign === '√')) {
        console.log('1 if 1');
        clearResult()
        clearOperValues()
        clearCurrentResult()
        addToFormula('; ')

        if (e.target.value === '.') {
          console.log('2 if 1');
          addToAll('0')
        }
        addToFormula(e.target.value)
        addToResult(e.target.value)
        sign = '' // necessary?
      } else {
        console.log('1 else');
        if (isLastCharOper(result) && result.length > 1 && sign !== '') {
          console.log('2 if 2');
          clearResult()
        }

        if (e.target.value === '.' && result === '') {
          console.log('2 if 3');
          addToResult('0')
          addToFormula('0')
        }
        addToResult(e.target.value)
        addToFormula(e.target.value)
      }

      if (formula.value === '' &&
      sign === '=' && result === '') {
        console.log('1 if 2');
        clearFormula()
      }

      if (currentResult === '') {
        console.log('1 if 3');
        addToCurrentResult(e.target.value)
      }
    } else if (e.target.value !== '00' && e.target.value !== '0') {
      console.log('main else if');
      if (e.target.value === '.') {
        console.log('1 if 4');
        addToAll('0')
      }
      addToAll(e.target.value)
    }
  }
}

const operBinaryButtons = document.getElementsByClassName('button_operBinary')
for (const operBinaryButton of operBinaryButtons) {
  operBinaryButton.onclick = (e) => {
    console.clear();
    if (result !== '') {
      console.log('main if');
      addOperValue(result)
      if (isLastCharOper(result) && sign !== '=') {
        console.log('if');
        result = delLastChar(result)
      } else if (operValues.length < 2 || sign === 'MU') {
        console.log('else if');
        currentResult = result
      } else {
        console.log('else');
        currentResult =
          solveBinary(currentResult, sign, operValues[operValues.length - 1])
      }

      sign = e.target.value

      addToResult(e.target.value)
      rewriteCurrentResult(currentResult)
      addToFormula(e.target.value)
    }

    solve = false

    if (e.target.value === '-' && !isLastCharOper(result)) {
      addToAll(e.target.value)
    }
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

document.getElementById('button_percent').onclick = () => {
  if (sign !== '' && operValues.length > 1) {
    let percent = percentage(currentResult, result)
    if (sign === '×' || sign === '÷') {
      percent = result / 100
    }
    currentResult =
      solveBinary(currentResult, sign, percent)
    result = currentResult

    sign = '%'

    clearOperValues()
    clearCurrentResultText()
    rewriteResult(currentResult)
    addToFormula('%=' + currentResult)
  }
}

document.getElementById('button_markUp').onclick = () => {
  if (operValues > 1) {
    let percent = percentage(currentResult, 100 - result)
    switch (sign) {
    case '÷':
      currentResult =
        solveBinary(currentResult, sign, percent) * currentResult
      break
    case '×':
      percent = percentage(currentResult, result)
      currentResult =
        solveBinary(currentResult, '+', percent)
      break
    case '+':
      currentResult =
        100 * (Number(currentResult) + Number(result)) / Number(result)
      break
    case '-':
      currentResult =
        100 * (Number(currentResult) - Number(result)) / Number(result)
      break
    }
    result = currentResult
    sign = 'MU'
    clearOperValues()
    clearCurrentResultText()
    rewriteResult(currentResult)
    addToFormula('MU=' + currentResult)
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
