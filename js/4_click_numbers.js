'use strict'

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
