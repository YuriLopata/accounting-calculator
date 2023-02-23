// const saveMemButtons = document.getElementsByClassName('button_save')
// for (const saveMemButton of saveMemButtons) {
//   saveMemButton.onclick = (e) => {
//     if (sign !== '=') {
//       console.clear()
//       console.log('currentResult: ' + currentResult);
//       console.log('sign: ' + sign);
//       console.log('middleBar_result: ' + document.getElementById('middleBar_result').value);
      
//       currentResult = solveBinary(currentResult, sign, document.getElementById('middleBar_result').value)
//       memVal.value = Number(memVal.value) + currentResult
//       saveMemNum(memVal.value)
//       document.getElementById('upperBar_currentResult').value = ''
//       rewriteResult(currentResult)
//     } else {
//       memVal.value = Number(memVal.value) + currentResult
//       saveMemNum(memVal.value)
//     }
//   }
// }