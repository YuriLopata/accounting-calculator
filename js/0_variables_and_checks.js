'use strict'

// Variables start

let currentResult = ''
let result = ''
let sign = ''
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

// Variables end

// Checks start

let solve = false
let isSignChanged = false
let isDelLastChar = false

const areClickedNumZeros = (clickedNum) => {
  if (clickedNum === '0' || clickedNum === '00') return true
  return false
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

// Checks end
