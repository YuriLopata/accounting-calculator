'use strict'

import { mirrorText, currentResult, result, modifyResult, sign, formula,
  changeDecNumBtn, modifyChangeDecNumBtn, memValues, memBtn,
  modifyMemBtn, modifyMemShown, solve, isDelLastChar,
  isLastChar } from './0_variables_and_checks_min.js'

import { rewriteCurrentResult, rewriteResult, rewriteFormula, addToFormula,
  clearResult, clearCalc } from './1_common_functions_min.js'

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

    if (!isLastChar(mirrorText(formula.value), ' ') && !isDelLastChar) {
      addToFormula('; ' + strShorted)
    }

    if (!isLastChar(mirrorText(formula.value), ' ') && isDelLastChar) {
      rewriteFormula(delLastChar(mirrorText(formula.value)))
    }
  }

  if (result.length === 0 && formula.value.length === 1) clearCalc()

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

const changeSign = (num) => {
  if (Math.sign(Number(num)) === 1) return -Math.abs(num)
  return Math.abs(num)
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
    modifyChangeDecNumBtn('F:<br>0')
    break
  case 'F:<br>0':
    modifyChangeDecNumBtn('F:<br>1')
    break
  case 'F:<br>1':
    modifyChangeDecNumBtn('F:<br>2')
    break
  case 'F:<br>2':
    modifyChangeDecNumBtn('F:<br>3')
    break
  case 'F:<br>3':
    modifyChangeDecNumBtn('F:<br>4')
    break
  case 'F:<br>4':
    modifyChangeDecNumBtn('F:<br>initial')
    break
  }

  if (solve || Number(result) === 0) {
    rewriteResult(changeDecResult(currentResult))
  }
  modifyResult(changeDecResult(result))
}

const getMemNum = () => {
  return memBtn.textContent.trim()
}

const changeMemNum = () => {
  switch (getMemNum()) {
  case 'M1:':
    modifyMemBtn('M2:')
    modifyMemShown(memValues[1])
    break
  case 'M2:':
    modifyMemBtn('M3:')
    modifyMemShown(memValues[2])
    break
  case 'M3:':
    modifyMemBtn('M1:')
    modifyMemShown(memValues[0])
    break
  }
}

const saveMemNum = (num) => {
  switch (getMemNum()) {
  case 'M1:':
    memValues[0] = num
    modifyMemShown(memValues[0])
    break
  case 'M2:':
    memValues[1] = num
    modifyMemShown(memValues[1])
    break
  case 'M3:':
    memValues[2] = num
    modifyMemShown(memValues[2])
    break
  }
}

export { delLastChar, addShortedRes, delSeveralLastChars, changeSign, changeDecResult, changeDecNum, getMemNum, changeMemNum, saveMemNum }
