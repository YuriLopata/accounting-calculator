"use strict";import{mirrorText as e,currentResult as t,modifyCurrentResult as r,result as c,modifyResult as a,sign as l,modifySign as n,resultText as s,formula as i,modifyFormula as $,operValues as o,binaryOperChars as u,solve as _,modifySolve as h,isSignChanged as m,modifyIsSignChanged as g,isLastCharOper as k}from"./0_variables_and_checks_min.js";import{rewriteCurrentResult as v,rewriteResult as p,rewriteFormula as b,addToResult as d,addToFormula as f,clearResult as y,clearFormula as B,clearCurrentResultText as U}from"./1_common_functions_min.js";import{delLastChar as j,delSeveralLastChars as w,changeSign as x}from"./3_other_logic_min.js";let checkNum=e=>{let t=e.toString(),r=parseInt(t[t.length-1]),c=t.slice(t.length-10,t.length-1),a=c.split("").every(e=>e===c[0]);return!!(r<parseInt(c[0]))&&!!a},checkDecimalPlaces=e=>{let t=e.toString();return!!t.includes(".")&&!!(t.split(".")[1].length>=10)},solveBinary=(e,t,r)=>{let c="";switch(t){case"+":c=(Number(e)+Number(r))*10/10;break;case"-":c=(Number(e)-Number(r))*10/10;break;case"\xd7":c=Number(e)*Number(r)*10/10;break;case"\xf7":c=Number(e)/Number(r)*10/10}return(checkNum(c)&&(c=c.toFixed(1)),checkDecimalPlaces(c))?c.toFixed(10):c},solveUnary=(D,N)=>{let P;if(""===c)return;let S=()=>{r(Math.sqrt(Number(D))),y(),p(t),f(t),U(),d(t),n("√"),h(!0),g(!0)};switch(N){case"√":if(k(c))return;if("="===l){f("; "+N+e(c)+"="),S();return}D=s.value,B(),f(N+c+"="),S();break;case"+/-":P=c.toString(),k(c)&&a(j(c)),D=x(c),a(D),""!==l||_||""!==t||(v(D),p(D),b(D)),""!==l&&!_&&k(P)&&(r(D),o[0]=c,v(D),p(D+l),b(w(e(i.value),P.length)),a(c+l),f(c)),u.includes(l)&&""!==t&&!_&&!k(P)&&P>0&&(p(D),b(w(e(i.value),P.length)),f(")"+c+"(")),u.includes(l)&&""!==t&&!k(P)&&!_&&P<0&&(p(D),$(e(w(e(i.value),P.length+2))),f(c)),u.includes(l)||m||k(P)||!_||(p(D),f("; "+c)),!u.includes(l)&&m&&!k(P)&&_&&(p(D),b(w(e(i.value),P.length)),f(c)),g(!0)}},percentage=(e,t)=>Number(e)/100*Number(t),markUp=()=>{if(o.length<1)return;let e=percentage(t,100-c);switch(l){case"\xf7":r(solveBinary(t,l,e)*t);break;case"\xd7":e=percentage(t,c),r(solveBinary(t,"+",e));break;case"+":r(100*(Number(t)+Number(c))/Number(c));break;case"-":r(100*(Number(t)-Number(c))/Number(c))}};export{checkNum,checkDecimalPlaces,solveBinary,solveUnary,percentage,markUp};