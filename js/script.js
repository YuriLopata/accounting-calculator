'use strict'

let currentResult = ''
let result = ''
let sign = ''
let signChanged = false
let solve = false
let isDelLastChar = false
const formula = document.getElementById('display_formula')
let operValues = []
const operChars = ['+', '-', '×', '÷']

const changeDecNumBtn = document.getElementById('numberOfDecimals')

let mems = ['', '', '']
const memBtn = document.querySelector('#middleBar_memButton')
const memVal = document.querySelector('#middleBar_memValue')

const rewriteCurrentResult = (newNumberChar) => {
  document.getElementById('upperBar_currentResult').value = newNumberChar
}
const rewriteResult = (num) => {
  document.getElementById('middleBar_result').value = num
}

const addToCurrentResult = (newNumberChar) => {
  document.getElementById('upperBar_currentResult').value += newNumberChar
}

const addToResult = (newNumberChar) => {
  result += newNumberChar
  document.getElementById('middleBar_result').value = result
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
  signChanged = false
}

const clearMemory = () => {
  mems = ['', '', '']
  memVal.value = ''
}

const isSolveFirst = () => {
  if (formula.value.includes('=')) {
    return false
  }
  return true
}

const delLastChar = (str) => {
  str = str.toString()
  const strShorted = str.slice(0, str.length - 1)
  return strShorted
}

const addShortedRes = (strShorted) => {
  const formulaShorted = formula.value.slice(0, formula.value.length - 1)

  if (result !== '' && formula.value !== '' && !solve) {
    console.log(2);
    rewriteCurrentResult(strShorted)
    rewriteResult(strShorted)
    rewriteFormula(formulaShorted)
  }

  if (result !== '' && formula.value !== '' && solve) {
    console.log(3);
    rewriteResult(strShorted)

    if (!isLastChar(formula.value, ' ') && !isDelLastChar) {
      console.log('add ;');
      addToFormula('; ' + strShorted)
    }

    if (!isLastChar(formula.value, ' ') && isDelLastChar) {
      console.log('dont add ;');
      formula.value = delLastChar(formula.value)
      // addToFormula('; ' + strShorted)
    }
  }

  if (result.length === 0 && formula.value.length === 1) {
    console.log(4);
    clearCalc()
  }

  if (result.length === 0 && formula.value.length > 0 &&
  !isLastChar(formula.value, ';')) {
    console.log(5);
    clearResult()
    formula.value = delLastChar(formula.value)
  }
}

const delSeveralLastChars = (str, charNum) => {
  str = str.toString()
  const strShorted = str.slice(0, str.length - charNum)
  return strShorted
}

const isLastChar = (str, char) => {
  str = str.toString()
  const strLastChar = str.slice(str.length - 1)
  if (strLastChar.includes(char)) {
    return true
  }
  return false
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

const changeDecResult = () => {
  const initResult = Number(result)
  switch (changeDecNumBtn.innerHTML.trim()) {
  case 'F:<br>initial':
    return initResult
  case 'F:<br>0':
    return initResult.toFixed(0)
  case 'F:<br>1':
    return initResult.toFixed(1)
  case 'F:<br>2':
    return initResult.toFixed(2)
  case 'F:<br>3':
    return initResult.toFixed(3)
  case 'F:<br>4':
    return initResult.toFixed(4)
  }
}

const changeDecNum = () => {
  switch (changeDecNumBtn.innerHTML.trim()) {
  case 'F:<br>initial':
    changeDecNumBtn.innerHTML = 'F:<br>0'
    break
  case 'F:<br>0':
    changeDecNumBtn.innerHTML = 'F:<br>1'
    break
  case 'F:<br>1':
    changeDecNumBtn.innerHTML = 'F:<br>2'
    break
  case 'F:<br>2':
    changeDecNumBtn.innerHTML = 'F:<br>3'
    break
  case 'F:<br>3':
    changeDecNumBtn.innerHTML = 'F:<br>4'
    break
  case 'F:<br>4':
    changeDecNumBtn.innerHTML = 'F:<br>initial'
    break
  }
  result = changeDecResult()
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
  let prevResult
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
    signChanged = true
    break
  case '+/-':
    console.clear('');
    prevResult = result.toString()

    if (isLastCharOper(result)) {
      result = delLastChar(result)
      addShortedRes(result)
    }

    x = changeSign(result)
    result = x

    if (sign === '' && !solve && currentResult === '') {
      console.log(1);
      rewriteCurrentResult(x)
      rewriteResult(x)
      rewriteFormula(x)
    }

    if (sign !== '' && !solve && isLastCharOper(prevResult)) {
      console.log(2);
      currentResult = x // maybe shit
      operValues[0] = result
      rewriteCurrentResult(x)
      rewriteResult(x + sign)

      console.log('isSolveFirst ' + isSolveFirst());
      if (isSolveFirst()) {
        console.log('if 1');
        formula.value = delSeveralLastChars(formula.value, result.length)
      }

      if (!isSolveFirst()) {
        console.log('if 2');
        delLastChar(formula.value)
        addShortedRes(result)
        formula.value = delSeveralLastChars(formula.value, result.toString().length)
      }

      addToFormula(result + sign)
      result += sign
    }

    if (operChars.includes(sign) && currentResult !== '' && !solve &&
    !isLastCharOper(prevResult) && prevResult > 0) {
      console.log(3);
      rewriteResult(x)
      formula.value = delSeveralLastChars(formula.value, prevResult.length)
      addToFormula('(' + result + ')')
    }

    if (operChars.includes(sign) && currentResult !== '' &&
    !isLastCharOper(prevResult) && !solve && prevResult < 0) {
      console.log(4);
      rewriteResult(x)
      formula.value = delSeveralLastChars(formula.value, prevResult.length + 2)
      addToFormula(result)
    }

    if (!operChars.includes(sign) && !signChanged &&
    !isLastCharOper(prevResult) && solve) {
      console.log(5);
      rewriteResult(x)
      addToFormula('; ' + result)
    }

    if (!operChars.includes(sign) && signChanged &&
    !isLastCharOper(prevResult) && solve) {
      console.log(6);
      rewriteResult(x)
      formula.value = delSeveralLastChars(formula.value, prevResult.length)
      addToFormula(result)
    }
    signChanged = true
    break
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
  addShortedRes(result)
  isDelLastChar = true
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
  signChanged = false
  isDelLastChar = false
  rewriteCurrentResult(currentResult)
  rewriteResult(result)
  addToFormula(memVal.value)
}

document.getElementById('button_solve').onclick = () => {
  if (isLastCharOper(result)) {
    clearResult()
    addToResult(currentResult)
    addToFormula(currentResult)
  }

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
    signChanged = false
    isDelLastChar = false
    rewriteResult(changeDecResult())
  }
}

const buttonNumbers = document.getElementsByClassName('button_number')
for (const buttonNum of buttonNumbers) {
  buttonNum.onclick = (e) => {
    console.clear()

    if (isLastChar(formula.value, ';')) {
      addToFormula(' ')
    }

    if ((e.target.value !== '00' || e.target.value !== '0') && (result !== '' || solve)) {
      console.log('main if');
      if (solve && !isDelLastChar && (sign === '=' || sign === '√')) {
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
    signChanged = false
  }
}

const operBinaryButtons = document.getElementsByClassName('button_operBinary')
for (const operBinaryButton of operBinaryButtons) {
  operBinaryButton.onclick = (e) => {
    console.clear();
    if (result !== '') {
      console.log('main if');
      addOperValue(result)
      if (isLastCharOper(result) && sign !== '=' && result !== '-') {
        console.log('if');
        result = delLastChar(result)
        addShortedRes(result)
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
    signChanged = false
    isDelLastChar = false

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
    signChanged = false
    isDelLastChar = false

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
    signChanged = false
    isDelLastChar = false
    clearOperValues()
    clearCurrentResultText()
    rewriteResult(currentResult)
    addToFormula('MU=' + currentResult)
  }
}

changeDecNumBtn.addEventListener('click', changeDecNum)

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
