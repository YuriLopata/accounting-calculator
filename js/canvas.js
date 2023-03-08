// const a = 5
// const func = () => {
//   if (a === 5) {
//     console.log('5');
//     return
//   }
//   console.log('1');
// }
// func()

// console.clear('');
//     initialResult = result.toString()

//     if (isLastCharOper(result)) {
//       result = delLastChar(result)
//     }

//     x = changeSign(result)
//     result = x

//     if (sign === '' && !solve && currentResult === '') {
//       console.log(1);
//       rewriteCurrentResult(x)
//       rewriteResult(x)
//       rewriteFormula(x)
//     }

//     if (sign !== '' &&
//     isLastCharOper(initialResult) && !solve) {
//       console.log(2);
//       currentResult = x // maybe shit
//       operValues[0] = result
//       rewriteCurrentResult(x)
//       rewriteResult(x + sign)
//       formula.value = delSeveralLastChars(formula.value, result.length)
//       addToFormula(result + sign)
//       result += sign
//     }

//     if (!operChars.includes(sign) && currentResult !== '' &&
//     !isLastCharOper(initialResult) && !solve) {
//       console.log(3);
//       rewriteResult(x)
//       addToFormula('; ' + result)
//     }

//     if (!operChars.includes(sign) &&
//     !isLastCharOper(initialResult) && solve && !signChanged) {
//       console.log(3);
//       rewriteResult(x)
//       addToFormula('; ' + result)
//     }

//     if (!operChars.includes(sign) &&
//     !isLastCharOper(initialResult) && solve && signChanged) {
//       console.log(4);
//       rewriteResult(x)
//       formula.value = delSeveralLastChars(formula.value, initialResult.length)
//       addToFormula(result)
//     }
//     signChanged = true

// const a = 245.670000000
// console.log(parseFloat(a));