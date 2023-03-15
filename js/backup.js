/* eslint-disable quote-props */
'use strict'

let currentResult = ''
let result = ''
let sign = ''
let solve = false
let isSignChanged = false
let isDelLastChar = false
const currentResultText = document.querySelector('#upperBar_currentResult')
const resultText = document.querySelector('#middleBar_result')
const formula = document.querySelector('#downBar_formula')
const changeDecNumBtn = document.querySelector('#numberOfDecimals')
let operValues = []
const binaryOperChars = ['+', '-', '×', '÷']
const unaryOperChars = ['=', '√', 'MU', '%']

let memValues = ['', '', '']
const memBtn = document.querySelector('.upperBar_memButton')
const memShown = document.querySelector('#upperBar_memValue')

const mirrorText = (text) => {
  text = String(text)
  const chars = text.split('')
  const reversedChars = chars.reverse()
  const mirroredText = reversedChars.join('')
  return mirroredText
}

const resetChecks = () => {
  isSignChanged = false
  isDelLastChar = false
}

const areClickedNumZeros = (clickedNum) => {
  if (clickedNum === '0' || clickedNum === '00') return true
  return false
}

const rewriteCurrentResult = (newNumberChar) => {
  currentResultText.value = newNumberChar
}
const rewriteResult = (num) => {
  resultText.value = num
}

const addToCurrentResult = (newNumberChar) => {
  currentResultText.value += newNumberChar
}

const addToResult = (newNumberChar) => {
  result += newNumberChar
  resultText.value = result
}

const addToFormula = (newNumberChar) => {
  const initialFormula = formula.value
  formula.value =
  mirrorText(newNumberChar) + initialFormula
}

const addToResultAndFormula = (newNumberChar) => {
  addToResult(newNumberChar)
  addToFormula(newNumberChar)
}

const addToAll = (newNumberChar) => {
  addToCurrentResult(newNumberChar)
  addToResult(newNumberChar)
  addToFormula(newNumberChar)
}

const rewriteFormula = (newNumberChar) => {
  formula.value = mirrorText(newNumberChar)
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
  resultText.value = ''
}
const clearResult = () => {
  clearResultValue()
  clearResultText()
}
const clearFormula = () => {
  formula.value = ''
}
const clearCurrentResultValue = () => {
  currentResult = ''
}
const clearCurrentResultText = () => {
  currentResultText.value = ''
}
const clearCurrentResult = () => {
  clearCurrentResultValue()
  clearCurrentResultText()
}
const clearResultsAndOperValues = () => {
  clearCurrentResult()
  clearResult()
  clearOperValues()
}

const clearCalc = () => {
  clearCurrentResult()
  clearResult()
  clearFormula()
  clearOperValues()
  resetChecks()
  solve = false
  sign = ''
}

const clearMemory = () => {
  memValues = ['', '', '']
  memShown.value = ''
}

const clearAll = () => {
  clearCalc()
  clearMemory()
}

const delLastChar = (str) => {
  str = str.toString()
  const strShorted = str.slice(0, str.length - 1)
  return strShorted
}

const addShortedRes = (strShorted) => {
  const formulaShorted = formula.value.slice(1, formula.value.length)

  if (result !== '' && formula.value !== '' && !solve) {
    rewriteCurrentResult(strShorted)
    rewriteResult(strShorted + sign)
    rewriteFormula(mirrorText(formulaShorted))
  }

  if (result !== '' && formula.value !== '' && solve) {
    rewriteResult(strShorted)

    if (!isLastChar(mirrorText(formula.value), ' ')) {
      rewriteFormula(delLastChar(mirrorText(formula.value)))
    }

    if (!isLastChar(mirrorText(formula.value), ' ') && isDelLastChar) {
      addToFormula('; ' + strShorted)
    }
  }

  if (result.length === 0 && formula.value.length === 1) {
    clearCalc()
  }

  if (result.length === 0 && !isLastChar(mirrorText(formula.value), ';') &&
  !isLastChar(mirrorText(formula.value), ' ')) {
    clearResult()
    rewriteFormula(delLastChar(mirrorText(formula.value)))
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
  if (strLastChar.includes(char)) return true
  return false
}

const isLastCharOper = (str) => {
  str = str.toString()
  const strLastChar = str.slice(str.length - 1)
  if (binaryOperChars.includes(strLastChar)) return true
  return false
}

const changeSign = (num) => {
  if (Math.sign(Number(num)) === 1) return -Math.abs(num)
  return Math.abs(num)
}

const percentage = (num, per) => {
  return (Number(num) / 100) * Number(per)
}

const showZeroDevisionError = () => {
  clearCurrentResultText()
  rewriteResult('Error')
  rewriteFormula("You can't divide by zero")
}

const changeDecResult = (num) => {
  const initResult = Number(num)
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

  if (solve || Number(result) === 0) {
    rewriteResult(changeDecResult(currentResult))
  }
  result = changeDecResult(result)
}

// Evaluating start

const checkNum = (num) => {
  const numStr = num.toString()
  const lastDigit = parseInt(numStr[numStr.length - 1])
  const nineCharsBeforeLast = numStr.slice(numStr.length - 10, numStr.length - 1)
  const allEqual = nineCharsBeforeLast.split('').every(digit =>
    digit === nineCharsBeforeLast[0])

  if (lastDigit < parseInt(nineCharsBeforeLast[0]) && allEqual) {
    return true
  }
  return false
}

const checkDecimalPlaces = (num) => { // move
  const numStr = num.toString()

  // Check if there are 10 or more decimal places
  if (numStr.includes('.') && numStr.split('.')[1].length >= 10) {
    return true
  }
  return false
}

const solveBinary = (x, oper, y) => {
  let innerResult = ''
  switch (oper) {
  case '+':
    innerResult = (Number(x) + Number(y)) * 10 / 10
    break
  case '-':
    innerResult = (Number(x) - Number(y)) * 10 / 10
    break
  case '×':
    innerResult = (Number(x) * Number(y)) * 10 / 10
    break
  case '÷':
    innerResult = (Number(x) / Number(y)) * 10 / 10
    break
  }

  if (checkNum(innerResult)) {
    innerResult = innerResult.toFixed(1)
  }

  if (checkDecimalPlaces(innerResult)) {
    return innerResult.toFixed(10)
  }

  return innerResult
}

// Evaluating end

const solveUnary = (x, oper) => {
  let prevResult

  if (result === '') return

  const sqrtSet = () => {
    currentResult = Math.sqrt(Number(x))
    clearResult()
    rewriteResult(currentResult)
    addToFormula(currentResult)
    clearCurrentResultText()
    addToResult(currentResult)
    sign = '√'
    solve = true
    isSignChanged = true
  }

  switch (oper) {
  case '√':
    if (isLastCharOper(result)) return

    if (sign === '=') {
      addToFormula('; ' + oper + mirrorText(result) + '=')
      sqrtSet()
      return
    }

    x = resultText.value
    clearFormula()
    addToFormula(oper + result + '=')
    sqrtSet()
    break
  case '+/-':
    prevResult = result.toString()

    if (isLastCharOper(result)) {
      result = delLastChar(result)
      addShortedRes(result)
    }

    x = changeSign(result)
    result = x

    if (sign === '' && !solve && currentResult === '') {
      rewriteCurrentResult(x)
      rewriteResult(x)
      rewriteFormula(x)
    }

    if (sign !== '' && !solve && isLastCharOper(prevResult)) {
      currentResult = x
      operValues[0] = result
      rewriteCurrentResult(x)
      rewriteResult(x + sign)
      rewriteFormula(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length - 1))
      result += sign
      addToFormula(result)
    }

    if (binaryOperChars.includes(sign) && currentResult !== '' && !solve &&
    !isLastCharOper(prevResult) && prevResult > 0) {
      rewriteResult(x)
      rewriteFormula(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length))
      addToFormula(')' + result + '(')
    }

    if (binaryOperChars.includes(sign) && currentResult !== '' &&
    !isLastCharOper(prevResult) && !solve && prevResult < 0) {
      rewriteResult(x)
      formula.value = mirrorText(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length + 2))
      addToFormula(result)
    }

    if (!binaryOperChars.includes(sign) && !isSignChanged &&
    !isLastCharOper(prevResult) && solve) {
      rewriteResult(x)
      addToFormula('; ' + (result))
    }

    if (!binaryOperChars.includes(sign) && isSignChanged &&
    !isLastCharOper(prevResult) && solve) {
      rewriteResult(x)
      rewriteFormula(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length))
      addToFormula(result)
    }
    isSignChanged = true
    break
  }
}

const clickDelLastChar = () => {
  if (solve && result.length === 1 && !isDelLastChar) return

  result = delLastChar(result)
  addShortedRes(result)
  isDelLastChar = true

  if (operValues.length === 1) clearOperValues()
}

const clickShowMemBtn = () => {
  const showMemBtnSet = () => {
    rewriteCurrentResult(currentResult)
    rewriteResult(result)
    addToFormula(memShown.value)
    resetChecks()
  }

  if ((formula.value !== '' && sign === '') || solve) {
    currentResult = memShown.value
    result = memShown.value
    addToFormula(';' + ' ')
    showMemBtnSet()
    return
  }

  result = memShown.value
  showMemBtnSet()
}

const clickSolveBtn = () => {
  if (sign === '÷' && result !== '' && Number(result) === 0) {
    showZeroDevisionError()
    solve = true
    sign = '='
    result = 'Error'
    return
  }

  if (isLastCharOper(result) && result !== '-') {
    clearResult()
    addToResultAndFormula(currentResult)
  }

  if (!unaryOperChars.includes(sign) && currentResult !== '') {
    addOperValue(result)
    currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])

    sign = '='
    rewriteCurrentResult('')
    clearResult()
    addToResult(changeDecResult(currentResult))
    if (formula.value !== '' && !solve) {
      addToFormula('=' + currentResult)
    }
    clearOperValues()
    solve = true
    resetChecks()
  }
}

const clickNumberBtn = (clickedNum) => {
  const numberBtnSet = () => {
    if (formula.value === '' && sign === '=' && result === '') {
      clearFormula()
    }
    if (currentResult === '') addToCurrentResult(clickedNum)
    resetChecks()
  }

  if (String(result).length === 11 && clickedNum === '00') {
    if (currentResult.length === 12) {
      addToResultAndFormula('0')
      return
    }
    addToAll('0')
    return
  }

  if (String(result).length === 12 && !isLastCharOper(result) &&
  sign !== '=') return

  if (areClickedNumZeros(clickedNum) && binaryOperChars.includes(sign) &&
  isLastChar(result, '0') && !result.includes('.')) return

  if (areClickedNumZeros(clickedNum) && binaryOperChars.includes(sign) &&
  !isLastChar(result, '.') && !isLastChar(result, '0') &&
  !isLastChar(result, sign)) {
    addToResultAndFormula(clickedNum)
    return
  }

  if (areClickedNumZeros(clickedNum) && binaryOperChars.includes(sign) &&
  isLastChar(result, '0') && result.includes('.')) {
    rewriteCurrentResult(currentResult)
    addToResultAndFormula(clickedNum)
    return
  }

  if (areClickedNumZeros(clickedNum) && binaryOperChars.includes(sign) &&
  !isLastChar(result, '.')) {
    result = '0'
    rewriteResult('0')
    rewriteCurrentResult(currentResult)
    addToFormula('0')
    return
  }

  if (clickedNum === '.' && result.includes('.') && !isLastCharOper(result) &&
  currentResultText.value !== '') {
    return
  }

  if (isLastChar(formula.value, ';')) addToFormula(' ')

  if ((clickedNum !== '00' || clickedNum !== '0') &&
  (result !== '' || solve)) {
    if (unaryOperChars.includes(sign) && result === 'Error') {
      clearFormula()
      clearResultsAndOperValues()
    }

    if (unaryOperChars.includes(sign) && result !== 'Error') {
      addToFormula('; ')
      clearResultsAndOperValues()
    }

    if (unaryOperChars.includes(sign) && clickedNum === '.') {
      addToAll('0')
    }

    if (unaryOperChars.includes(sign)) {
      addToResultAndFormula(clickedNum)
      sign = ''
      numberBtnSet()
      return
    }

    if (isLastCharOper(result) && result.length > 1 && sign !== '') {
      clearResult()
    }

    if (clickedNum === '.' && result === '') addToResultAndFormula('0')

    if (typeof result === 'string' && result !== '-' && result === '' &&
    !isLastChar(result, '.')) result = Number(result)

    if (typeof result === 'number' && result === 0) result = ''

    addToResultAndFormula(clickedNum)
    numberBtnSet()
    return
  }

  if (clickedNum !== '00' && clickedNum !== '0') {
    if (clickedNum === '.') addToAll('0')
    addToAll(clickedNum)
    resetChecks()
  }
}

const clickBinaryBtn = (clickedNum) => {
  const binaryBtnSet = () => {
    sign = clickedNum
    rewriteCurrentResult(currentResult)
    addToResultAndFormula(clickedNum)
    solve = false
    resetChecks()
  }

  if (result !== '' && result !== '-') {
    addOperValue(result)

    if (isLastChar(result, '.')) clickDelLastChar()

    if (isLastCharOper(result) && sign !== '=' && result !== '-') {
      result = delLastChar(result)
      addShortedRes(result)
      binaryBtnSet()
      return
    }

    if (operValues.length < 2 && sign !== 'MU') {
      currentResult = result
      binaryBtnSet()
      return
    }

    currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])

    binaryBtnSet()
  }

  if (clickedNum === '-' && !isLastCharOper(result)) addToAll(clickedNum)
}

const clickPercentBtn = () => {
  if (sign !== '' && operValues.length > 0 && !isLastCharOper(result)) {
    let percent = percentage(currentResult, result)

    if (sign === '×' || sign === '÷') percent = result / 100

    currentResult = solveBinary(currentResult, sign, percent)

    result = currentResult

    clearOperValues()
    clearCurrentResultText()
    rewriteResult(currentResult)
    addToFormula('%=' + currentResult)

    solve = true
    sign = '%'
    resetChecks()
  }
}

const clickMarkUpBtn = () => {
  if (operValues.length > 0) {
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
    solve = true
    sign = 'MU'

    clearOperValues()
    clearCurrentResultText()
    rewriteResult(currentResult)
    addToFormula('MU=' + currentResult)
    resetChecks()
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
    memShown.value = memValues[1]
    break
  case 'M2:':
    memBtn.textContent = 'M3:'
    memShown.value = memValues[2]
    break
  case 'M3:':
    memBtn.textContent = 'M1:'
    memShown.value = memValues[0]
    break
  }
}

const saveMemNum = (num) => {
  switch (getMemNum()) {
  case 'M1:':
    memValues[0] = num
    memShown.value = memValues[0]
    break
  case 'M2:':
    memValues[1] = num
    memShown.value = memValues[1]
    break
  case 'M3:':
    memValues[2] = num
    memShown.value = memValues[2]
    break
  }
}

const clickSaveMemBtn = (clickedNum) => {
  if (isLastCharOper(result) && memShown.value[0] === '-') return

  if (sign !== '=' && sign !== '') {
    addOperValue(result)
    currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])
    sign = '='
    rewriteCurrentResult('')
    rewriteResult(currentResult)

    if (formula.value !== '' && solve === false) {
      addToFormula('=' + currentResult)
    }

    clearOperValues()
    solve = true
    rewriteResult(currentResult)
    memShown.value = Number(memShown.value) + currentResult
    saveMemNum(memShown.value)
    return
  }

  currentResult = resultText.value
  memShown.value = solveBinary(memShown.value, clickedNum, currentResult)
  saveMemNum(memShown.value)
}

// MEMORY END

// INTERACTIVE START

formula.addEventListener('wheel', (e) => {
  e.preventDefault()
  if (formula.value !== '') formula.focus()

  const scrollAmount = e.deltaY / 10
  const scrollDuration = 200 // milliseconds
  const startTime = performance.now()

  const scrollStep = () => {
    const elapsed = performance.now() - startTime
    const progress = Math.min(elapsed / scrollDuration, 1)
    const scrollDelta = scrollAmount * progress
    formula.scrollLeft += scrollDelta
    if (progress < 1) requestAnimationFrame(scrollStep)
  }

  scrollStep()
})

const buttons = document.querySelectorAll('.button')

const actions = {
  'number': (button) => clickNumberBtn(button.value),
  'binary': (button) => clickBinaryBtn(button.textContent.trim()),
  'unary': (button) => solveUnary(currentResult, button.value),
  'save-mem': (button) => clickSaveMemBtn(button.value[1]), // + or -
  'reset-calc': clearCalc,
  'reset-all': clearAll,
  'del-last-char': clickDelLastChar,
  'solve': clickSolveBtn,
  'percent': clickPercentBtn,
  'mark-up': clickMarkUpBtn,
  'decimals': changeDecNum,
  'change-mem': changeMemNum,
  'reset-mem': clearMemory,
  'show-mem': clickShowMemBtn
}

const handleClick = (e) => {
  const button = e.target
  const action = button.dataset.action
  const actionFunction = actions[action]
  if (actionFunction) {
    actionFunction(button)
    // button.removeEventListener('click', handleClick)
  }
}

const handleKeyDown = (e) => {
  const key = e.key
  const buttons = document.querySelectorAll('.button')
  buttons.forEach((button) => {
    if (button.value === key) {
      button.click()
      button.focus()
      button.addEventListener('click', handleClick)
    }
  })
}

buttons.forEach(button => button.addEventListener('click', handleClick))

document.addEventListener('keydown', handleKeyDown)

// INTERACTIVE END
