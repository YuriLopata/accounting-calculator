'use strict'

let result = document.getElementById('display_output').innerHTML

// let firstValue = 0
// let secondValue = 0
// let thirdValue = 0
// let fourthValue = 0
// let fifthValue = 0

const writeNumber = (newNumberChar) => {
  result = Number(result + newNumberChar)
  document.getElementById('display_output').innerHTML = result
}

let checkFirstValue = () => {
  if (firstValue === 0) {
    firstValue = result
  }
  console.log(firstValue) // check current firstValue
  document.getElementById('display_formula').innerHTML = firstValue
}

const buttonNumbers = document.getElementsByClassName('button_number')

for (const button of buttonNumbers) {
  button.onclick = (e) => {
    writeNumber(e.target.value)
  }
}

let sum = (firstSummand, secondSummand) => {
  document.getElementById('display_output').innerHTML = result + '+'
}

document.getElementById('button_sum').onclick = () => {
  sum(firstValue, secondValue)
}
