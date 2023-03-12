'use strict'

const mirrorText = (text) => {
  text = String(text)
  // Convert the text to an array of characters
  const chars = text.split('')
  // Reverse the order of the characters
  const reversedChars = chars.reverse()
  // Join the characters back together into a string
  const mirroredText = reversedChars.join('')
  // Return the mirrored text
  return mirroredText
}

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
const operChars = ['+', '-', '×', '÷']

let mems = ['', '', '']
const memBtn = document.querySelector('.upperBar_memButton')
const memVal = document.querySelector('#upperBar_memValue')

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

const clearCalc = () => {
  clearCurrentResult()
  clearResult()
  clearFormula()
  clearOperValues()
  solve = false
  sign = ''
  isSignChanged = false
}

const clearMemory = () => {
  mems = ['', '', '']
  memVal.value = ''
}

const isSolveFirst = () => {
  if (formula.value.includes('=')) return false
  return true
}

const delLastChar = (str) => {
  str = str.toString()
  const strShorted = str.slice(0, str.length - 1)
  return strShorted
}

const addShortedRes = (strShorted) => { // fix!!!
  const formulaShorted = formula.value.slice(1, formula.value.length)

  if (result !== '' && formula.value !== '' && !solve) {
    // console.log(2);
    rewriteCurrentResult(strShorted)
    rewriteResult(strShorted)
    rewriteFormula(mirrorText(formulaShorted))
  }

  if (result !== '' && formula.value !== '' && solve) {
    // console.log(3);
    rewriteResult(strShorted)

    if (!isLastChar(mirrorText(formula.value), ' ')) {
      // console.log('dont add ;');
      rewriteFormula(delLastChar(mirrorText(formula.value)))
    }

    // if (!isLastChar(mirrorText(formula.value), ' ') && isDelLastChar) {
    //   console.log('add ;');
    //   addToFormula('; ' + strShorted)
    // }
  }

  if (result.length === 0 && formula.value.length === 1) {
    // console.log(4);
    clearCalc()
  }

  if (result.length === 0 && !isLastChar(mirrorText(formula.value), ';') &&
  !isLastChar(mirrorText(formula.value), ' ')) {
    // console.log(5);
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
  if (operChars.includes(strLastChar)) return true
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

  const sqrtSet = () => {
    currentResult = Math.sqrt(Number(x))
    clearResult()
    rewriteResult(currentResult)
    addToFormula(currentResult)
    clearCurrentResultText()
    sign = '√'
    solve = true
    addToResult(currentResult)
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
    // console.clear('');
    prevResult = result.toString()

    if (isLastCharOper(result)) {
      result = delLastChar(result)
      addShortedRes(result)
    }

    x = changeSign(result)
    result = x

    if (sign === '' && !solve && currentResult === '') {
      // console.log(1);
      rewriteCurrentResult(x)
      rewriteResult(x)
      rewriteFormula(x)
    }

    if (sign !== '' && !solve && isLastCharOper(prevResult)) {
      // console.log(2);
      currentResult = x // maybe shit
      operValues[0] = result
      rewriteCurrentResult(x)
      rewriteResult(x + sign)

      if (isSolveFirst()) {
        // console.log('if 1');
        rewriteFormula(delSeveralLastChars(formula.value, result.length))
      }

      if (!isSolveFirst()) {
        // console.log('if 2');
        delLastChar(formula.value)
        addShortedRes(result)
        rewriteFormula(delSeveralLastChars(formula.value),
          String(result).length) // fix
      }

      addToFormula(result + sign)
      result += sign
    }

    if (operChars.includes(sign) && currentResult !== '' && !solve &&
    !isLastCharOper(prevResult) && prevResult > 0) {
      // console.log(3);
      rewriteResult(x)
      rewriteFormula(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length))
      addToFormula(')' + result + '(')
    }

    if (operChars.includes(sign) && currentResult !== '' &&
    !isLastCharOper(prevResult) && !solve && prevResult < 0) {
      // console.log(4);
      rewriteResult(x)
      formula.value = mirrorText(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length + 2))
      addToFormula(result)
    }

    if (!operChars.includes(sign) && !isSignChanged &&
    !isLastCharOper(prevResult) && solve) {
      // console.log(5);
      rewriteResult(x)
      addToFormula('; ' + (result))
    }

    if (!operChars.includes(sign) && isSignChanged &&
    !isLastCharOper(prevResult) && solve) {
      // console.log(6);
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
    isSignChanged = false
    isDelLastChar = false
    rewriteCurrentResult(currentResult)
    rewriteResult(result)
    addToFormula(memVal.value)
  }

  if ((formula.value !== '' && sign === '') || solve) {
    currentResult = memVal.value
    result = memVal.value
    addToFormula(';' + ' ')
    showMemBtnSet()
    return
  }

  result = memVal.value
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

  if (!['=', '√', 'MU', '%'].includes(sign) && currentResult !== '') {
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
    isSignChanged = false
    isDelLastChar = false
  }
}

const clickNumberBtn = (clickedNum) => {
  console.log(areClickedNumZeros(clickedNum));
  const numberBtnSet = () => {
    if (formula.value === '' && sign === '=' && result === '') {
      clearFormula()
    }

    if (currentResult === '') addToCurrentResult(clickedNum)

    isSignChanged = false
  }

  if (!solve && Number(result) === 0 && result !== '' &&
  !isLastChar(result, '.')) clearResult()

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

  if (areClickedNumZeros(clickedNum) && sign === '÷' &&
  isLastChar(result, '0') && !result.includes('.')) return

  if (areClickedNumZeros(clickedNum) && sign === '÷' &&
  !isLastChar(result, '.') && !isLastChar(result, '0') &&
  !isLastChar(result, sign)) {
    addToResultAndFormula(clickedNum)
    return
  }

  if (areClickedNumZeros(clickedNum) &&
  sign === '÷' && isLastChar(result, '0') && result.includes('.')) {
    rewriteCurrentResult(currentResult)
    addToResultAndFormula(clickedNum)
    return
  }

  if (areClickedNumZeros(clickedNum) &&
  sign === '÷' && !isLastChar(result, '.')) {
    result = '0'
    rewriteResult('0')
    rewriteCurrentResult(currentResult)
    addToFormula('0')
    return
  }

  if (clickedNum === '.' && result.includes('.') &&
  !isLastCharOper(result)) return

  if (isLastChar(formula.value, ';')) addToFormula(' ')

  if ((clickedNum !== '00' || clickedNum !== '0') &&
  (result !== '' || solve)) {
    if (solve && !isDelLastChar && ['=', '√', 'MU', '%'].includes(sign)) {
      if (result === 'Error') clearFormula()

      if (result !== 'Error') addToFormula('; ')

      clearResult()
      clearOperValues()
      clearCurrentResult()

      if (clickedNum === '.') addToAll('0')

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

    isSignChanged = false
    addToAll(clickedNum)
  }
}

const clickBinaryBtn = (clickedNum) => {
  const binaryBtnSet = () => {
    sign = clickedNum
    rewriteCurrentResult(currentResult)
    addToResultAndFormula(clickedNum)
    solve = false
    isSignChanged = false
    isDelLastChar = false
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

    currentResult =
      solveBinary(currentResult, sign, percent)

    result = currentResult

    solve = true
    sign = '%'
    isSignChanged = false
    isDelLastChar = false

    clearOperValues()
    clearCurrentResultText()
    rewriteResult(currentResult)
    addToFormula('%=' + currentResult)
  }
}

const clickMarkUpBtn = () => {
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
    solve = true
    sign = 'MU'
    isSignChanged = false
    isDelLastChar = false
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

const clickSaveMemBtn = (clickedNum) => {
  if (isLastCharOper(result) && memVal.value[0] === '-') return

  if (sign !== '=' && sign !== '') {
    addOperValue(result)
    currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])
    sign = '='
    rewriteCurrentResult('')
    clearResult()
    addToResult(currentResult)

    if (formula.value !== '' && solve === false) {
      addToFormula('=' + currentResult)
    }

    clearOperValues()
    solve = true
    rewriteResult(currentResult)
    memVal.value = Number(memVal.value) + currentResult
    saveMemNum(memVal.value)
    return
  }

  currentResult = resultText.value
  memVal.value = solveBinary(memVal.value, clickedNum, currentResult)
  saveMemNum(memVal.value)
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
for (const button of buttons) {
  button.onclick = (e) => {
    switch (true) {
    case button.classList.contains('button_number'):
      clickNumberBtn(e.target.value)
      break
    case button.classList.contains('button_operBinary'):
      clickBinaryBtn(e.target.textContent.trim())
      break
    case button.classList.contains('button_operUnary'):
      if (result !== '') solveUnary(currentResult, e.target.value)
      break
    case button.classList.contains('button_resetCalc'):
      clearCalc()
      break
    case button.classList.contains('button_resetAll'):
      clearCalc()
      clearMemory()
      break
    case button.classList.contains('button_delLastChar'):
      clickDelLastChar()
      break
    case button.classList.contains('button_solve'):
      clickSolveBtn()
      break
    case button.classList.contains('button_percent'):
      clickPercentBtn()
      break
    case button.classList.contains('button_markUp'):
      clickMarkUpBtn()
      break
    case button.classList.contains('button_numberOfDecimals'):
      changeDecNum()
      break
    case button.classList.contains('button_saveMem'):
      clickSaveMemBtn(e.target.value[1]) // + or -
      break
    case button.classList.contains('button_resetMemory'):
      clearMemory()
      break
    case button.classList.contains('button_showMemory'):
      clickShowMemBtn()
      break
    }
  }
}

document.addEventListener('keydown', (e) => {
  const key = e.key
  const buttons = document.querySelectorAll('.button')
  buttons.forEach((button) => {
    if (button.value === key) {
      button.click()
      button.focus()
    }
  })
})
