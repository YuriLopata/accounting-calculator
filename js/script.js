'use strict'

import { currentResult, formula } from './0_variables_and_checks_min.js'

import { clearCalc, clearMemory, clearAll } from './1_common_functions_min.js'

import { solveUnary } from './2_calculation_logic_min.js'

import { changeDecNum, changeMemNum } from './3_other_logic_min.js'

import { clickNumberBtn } from './4_click_numbers_min.js'

import { clickDelLastChar, clickShowMemBtn, clickSolveBtn, clickBinaryBtn,
  clickPercentBtn, clickMarkUpBtn, clickSaveMemBtn } from './5_click_others.js'

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
  number: (button) => clickNumberBtn(button.value),
  binary: (button) => clickBinaryBtn(button.textContent.trim()),
  unary: (button) => solveUnary(currentResult, button.value),
  save_mem: (button) => clickSaveMemBtn(button.value[1]), // + or -
  reset_calc: clearCalc,
  reset_all: clearAll,
  del_last_char: clickDelLastChar,
  solve: clickSolveBtn,
  percent: clickPercentBtn,
  mark_up: clickMarkUpBtn,
  decimals: changeDecNum,
  change_mem: changeMemNum,
  reset_mem: clearMemory,
  show_mem: clickShowMemBtn
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
