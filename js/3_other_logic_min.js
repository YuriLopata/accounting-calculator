"use strict";import{mirrorText as e,currentResult as a,result as r,modifyResult as t,sign as s,formula as c,changeDecNumBtn as n,modifyChangeDecNumBtn as l,memValues as i,memBtn as u,modifyMemBtn as b,modifyMemShown as h,solve as m,isDelLastChar as g,isLastChar as F}from"./0_variables_and_checks_min.js";import{rewriteCurrentResult as M,rewriteResult as d,rewriteFormula as o,addToFormula as v,clearResult as _,clearCalc as $}from"./1_common_functions_min.js";let delLastChar=e=>{e=e.toString();let a=e.slice(0,e.length-1);return a},addShortedRes=a=>{let t=c.value.slice(1,c.value.length);""===r||""===c.value||m||(M(a),d(a+s),o(e(t))),""!==r&&""!==c.value&&m&&(d(a),F(e(c.value)," ")||g||v("; "+a),!F(e(c.value)," ")&&g&&o(delLastChar(e(c.value)))),0===r.length&&1===c.value.length&&$(),0!==r.length||F(e(c.value),";")||F(e(c.value)," ")||(_(),o(delLastChar(e(c.value))))},delSeveralLastChars=(e,a)=>{e=e.toString();let r=e.slice(0,e.length-a);return r},changeSign=e=>1===Math.sign(Number(e))?-Math.abs(e):Math.abs(e),changeDecResult=e=>{let a=Number(e);switch(n.innerHTML.trim()){case"F:<br>initial":return a;case"F:<br>0":return a.toFixed(0);case"F:<br>1":return a.toFixed(1);case"F:<br>2":return a.toFixed(2);case"F:<br>3":return a.toFixed(3);case"F:<br>4":return a.toFixed(4)}},changeDecNum=()=>{switch(n.innerHTML.trim()){case"F:<br>initial":l("F:<br>0");break;case"F:<br>0":l("F:<br>1");break;case"F:<br>1":l("F:<br>2");break;case"F:<br>2":l("F:<br>3");break;case"F:<br>3":l("F:<br>4");break;case"F:<br>4":l("F:<br>initial")}(m||0===Number(r))&&d(changeDecResult(a)),t(changeDecResult(r))},getMemNum=()=>u.textContent.trim(),changeMemNum=()=>{switch(getMemNum()){case"M1:":b("M2:"),h(i[1]);break;case"M2:":b("M3:"),h(i[2]);break;case"M3:":b("M1:"),h(i[0])}},saveMemNum=e=>{switch(getMemNum()){case"M1:":i[0]=e,h(i[0]);break;case"M2:":i[1]=e,h(i[1]);break;case"M3:":i[2]=e,h(i[2])}};export{delLastChar,addShortedRes,delSeveralLastChars,changeSign,changeDecResult,changeDecNum,getMemNum,changeMemNum,saveMemNum};