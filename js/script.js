
// import { mirrorText, resetChecks, rewriteCurrentResult, rewriteResult, rewriteFormula, addToCurrentResult, addToResult, addToFormula, addToResultAndFormula, addToAll, clearResultValue, clearResultText, clearResult, clearFormula, clearCurrentResultValue, clearCurrentResultText, clearCurrentResult, clearResultsAndOperValues, clearCalc, clearMemory, clearAll, addOperValue, clearOperValues, showZeroDevisionError  } from './1_common_functions.js'

// import { checkNum, checkDecimalPlaces, solveBinary, solveUnary, percentage, markUp } from './2_calculation_logic.js'

// import { delLastChar, addShortedRes, delSeveralLastChars, changeSign, changeDecResult, changeDecNum, getMemNum, changeMemNum, saveMemNum } from './3_other_logic.js'

// import { clickNumberBtn } from './4_click_numbers.js'

// import { clickDelLastChar, clickShowMemBtn, clickSolveBtn, clickBinaryBtn, clickPercentBtn, clickMarkUpBtn, clickSaveMemBtn } from './5_click_others.js'

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
