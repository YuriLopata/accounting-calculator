'use strict'

const mirrorText = (text) => {
  text = String(text)
  // Convert the text to an array of characters
  const chars = text.split('');
  // Reverse the order of the characters
  const reversedChars = chars.reverse();
  // Join the characters back together into a string
  const mirroredText = reversedChars.join('');
  // Return the mirrored text
  return mirroredText;
}

let currentResult = ''
let result = ''
let sign = ''
let signChanged = false
let solve = false
let isDelLastChar = false
const formula = document.getElementById('downBar_formula')
let operValues = []
const operChars = ['+', '-', '×', '÷']

const changeDecNumBtn = document.getElementById('numberOfDecimals')

let mems = ['', '', '']
const memBtn = document.querySelector('.upperBar_memButton')
const memVal = document.querySelector('#upperBar_memValue')

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
  const initialFormula = document.getElementById('downBar_formula').value
  document.getElementById('downBar_formula').value =
  mirrorText(newNumberChar) + initialFormula
}

const rewriteFormula = (newNumberChar) => {
  formula.value = mirrorText(newNumberChar)
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
  document.getElementById('downBar_formula').value = ''
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
    // console.log('a');
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
  switch (oper) {
  case '√':
    if (isLastCharOper(result)) return

    if (sign === '=') {
      addToFormula('; ' + oper + mirrorText(result) + '=')
    } else {
      x = document.getElementById('middleBar_result').value
      clearFormula()
      addToFormula(oper + mirrorText(result) + '=')
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

    if (!operChars.includes(sign) && !signChanged &&
    !isLastCharOper(prevResult) && solve) {
      // console.log(5);
      rewriteResult(x)
      addToFormula('; ' + (result))
    }

    if (!operChars.includes(sign) && signChanged &&
    !isLastCharOper(prevResult) && solve) {
      // console.log(6);
      rewriteResult(x)
      rewriteFormula(delSeveralLastChars(mirrorText(formula.value),
        prevResult.length))
      addToFormula(result)
    }
    signChanged = true
    break
  }
}

const clickDelLastChar = () => {
  if (solve && result.length === 1 && !isDelLastChar) {
    return
  }

  result = delLastChar(result)
  addShortedRes(result)
  isDelLastChar = true

  if (operValues.length === 1) {
    clearOperValues()
  }
}

const clickShowMemBut = () => {
  if (document.getElementById('downBar_formula').value !== '' &&
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

const clickSolveButton = () => {
  if (sign === '÷' && result !== '' && Number(result) === 0) {
    // console.log('a');
    showZeroDevisionError()
    solve = true
    sign = '='
    result = 'Error'
    return
  }

  if (isLastCharOper(result) && result !== '-') {
    // console.log('b');
    clearResult()
    addToResult(currentResult)
    addToFormula(currentResult)
  }

  if (sign !== '=' && sign !== 'MU' && sign !== '%' && currentResult !== '') {
    // console.log('c');
    addOperValue(result)
    currentResult =
    solveBinary(currentResult, sign, operValues[operValues.length - 1])
    sign = '='
    rewriteCurrentResult('')
    clearResult()
    addToResult(changeDecResult(currentResult))
    if (formula.value !== '' && !solve) {
      // console.log('d');
      addToFormula('=' + currentResult)
    }
    clearOperValues()
    solve = true
    signChanged = false
    isDelLastChar = false
  }
}

const clickNumberButton = (clickedNum) => {
  // console.clear()
  if (!solve && Number(result) === 0 && result !== '' &&
  !isLastChar(result, '.')) {
    clearResult()
  }

  if (String(result).length === 11 && clickedNum === '00') {
    // console.log('1st return');
    if (currentResult.length === 12) {
      addToResult('0')
      addToFormula('0')
      return
    }
    addToAll('0')
    return
  }

  if (String(result).length === 12 && !isLastCharOper(result) &&
  sign !== '=') {
    // console.log('1.5st return');
    return
  }

  if ((clickedNum === '0' || clickedNum === '00') &&
  sign === '÷' && isLastChar(result, '0') && !result.includes('.')) {
    // console.log('2st return');
    return
  }

  if ((clickedNum === '0' || clickedNum === '00') &&
  sign === '÷' && !isLastChar(result, '.') && !isLastChar(result, '0') &&
  !isLastChar(result, sign)) {
    // console.log('3st return');
    addToResult(clickedNum)
    addToFormula(clickedNum)
    return
  }

  if ((clickedNum === '0' || clickedNum === '00') &&
  sign === '÷' && isLastChar(result, '0') && result.includes('.')) {
    // console.log('4st return');
    addToResult(clickedNum)
    rewriteCurrentResult(currentResult)
    addToFormula(clickedNum)
    return
  }

  if ((clickedNum === '0' || clickedNum === '00') &&
  sign === '÷' && !isLastChar(result, '.')) {
    // console.log('5st return');
    result = '0'
    rewriteResult('0')
    rewriteCurrentResult(currentResult)
    addToFormula('0')
    return
  }

  if (clickedNum === '.' && result.includes('.') &&
  !isLastCharOper(result)) {
    // console.log('6st return');
    return
  }

  if (isLastChar(formula.value, ';')) {
    addToFormula(' ')
  }

  if ((clickedNum !== '00' || clickedNum !== '0') &&
  (result !== '' || solve)) {
    // console.log('main if');
    if (solve && !isDelLastChar && (sign === '=' || sign === '√')) {
      // console.log('1 if 1');
      if (result === 'Error') {
        clearFormula()
      }

      if (result !== 'Error') {
        addToFormula('; ')
      }
      clearResult()
      clearOperValues()
      clearCurrentResult()

      if (clickedNum === '.') {
        // console.log('2 if 1');
        addToAll('0')
      }

      addToFormula(clickedNum)
      addToResult(clickedNum)
      sign = '' // necessary?
    } else {
      // console.log('1 else');
      if (isLastCharOper(result) && result.length > 1 && sign !== '') {
        // console.log('2 if 2');
        clearResult()
      }

      if (clickedNum === '.' && result === '') {
        // console.log('2 if 3');
        addToResult('0')
        addToFormula('0')
      }

      if (typeof result === 'string' && result !== '-' &&
      !isLastChar(result, '.') && result === '') {
        result = Number(result)
      }
      if (typeof result === 'number' && result === 0) {
        result = ''
      }
      addToResult(clickedNum)
      addToFormula(clickedNum)
    }

    if (formula.value === '' &&
    sign === '=' && result === '') {
      // console.log('1 if 2');
      clearFormula()
    }

    if (currentResult === '') {
      // console.log('1 if 3');
      addToCurrentResult(clickedNum)
    }
  } else if (clickedNum !== '00' && clickedNum !== '0') {
    // console.log('main else if');
    if (clickedNum === '.') {
      // console.log('1 if 4');
      addToAll('0')
    }
    addToAll(clickedNum)
  }
  signChanged = false
}

const clickBinaryButton = (clickedNum) => {
  console.clear();
  if (result !== '' && result !== '-') {
    console.log('main if');
    addOperValue(result)

    if (isLastChar(result, '.')) {
      clickDelLastChar()
    }

    if (isLastCharOper(result) && sign !== '=' && result !== '-') {
      console.log('if');
      result = delLastChar(result)
      addShortedRes(result)
    } else if (operValues.length < 2 && sign !== 'MU') { // there was || instead of &&
      console.log('else if');
      currentResult = result
    } else {
      console.log('else');
      currentResult =
        solveBinary(currentResult, sign, operValues[operValues.length - 1])
    }

    sign = clickedNum

    addToResult(clickedNum)
    rewriteCurrentResult(currentResult)
    addToFormula(clickedNum)
  }

  solve = false
  signChanged = false
  isDelLastChar = false

  if (clickedNum === '-' && !isLastCharOper(result)) {
    addToAll(clickedNum)
  }
}

const clickPercentButton = () => {
  if (sign !== '' && operValues.length > 0 && !isLastCharOper(result)) {
    // console.clear()
    // console.log('main if');
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

const clickMarkUpButton = () => {
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

const clickSaveMemButton = (clickedNum) => {
  if (sign !== '=' && sign !== '') {
    addOperValue(result)
    currentResult =
      solveBinary(currentResult, sign, operValues[operValues.length - 1])
    sign = '='
    rewriteCurrentResult('')
    clearResult()
    addToResult(currentResult)
    if (document.getElementById('downBar_formula').value !== '' &&
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
    memVal.value = solveBinary(memVal.value, clickedNum, currentResult)
    saveMemNum(memVal.value)
  }
}

// MEMORY END

// INTERACTIVE START

formula.addEventListener('wheel', (e) => {
  e.preventDefault()
  if (formula.value !== '') {
    formula.focus()
  }
  const scrollAmount = e.deltaY / 10
  const scrollDuration = 200 // milliseconds
  const startTime = performance.now()

  const scrollStep = () => {
    const elapsed = performance.now() - startTime
    const progress = Math.min(elapsed / scrollDuration, 1)
    const scrollDelta = scrollAmount * progress
    formula.scrollLeft += scrollDelta
    if (progress < 1) {
      requestAnimationFrame(scrollStep)
    }
  }

  scrollStep()
})

const buttons = document.querySelectorAll('.button')
for (const button of buttons) {
  button.onclick = (e) => {
    switch (true) {
    case button.classList.contains('button_number'):
      clickNumberButton(e.target.value)
      break
    case button.classList.contains('button_operBinary'):
      clickBinaryButton(e.target.textContent.trim())
      break
    case button.classList.contains('button_operUnary'):
      if (result !== '') {
        solveUnary(currentResult, e.target.value)
      }
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
      clickSolveButton()
      break
    case button.classList.contains('button_percent'):
      clickPercentButton()
      break
    case button.classList.contains('button_markUp'):
      clickMarkUpButton()
      break
    case button.classList.contains('button_numberOfDecimals'):
      changeDecNum()
      break
    case button.classList.contains('button_saveMem'):
      clickSaveMemButton(e.target.value[1]) // + or -
      break
    case button.classList.contains('button_resetMemory'):
      clearMemory()
      break
    case button.classList.contains('button_showMemory'):
      clickShowMemBut()
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
