import {formatCurrency} from '../scripts/utils/money.js';
console.log('Test suite: Formatted currency');
console.log('Converts Cents into dollars');
if (formatCurrency(2095)=== '20.95'){
  console.log('Test passed');
}else{
  console.log('Test failed');
}

console.log('Works with 0');
if(formatCurrency(0)=== '0.0'){
  console.log('Test passed');
}else{
  console.log('Test failed');
}

console.log('Rounds up to the nearest cent');
if(formatCurrency(2000.5)=== '20.01'){
  console.log('Test passed');
}else{
  console.log('Test failed');
}