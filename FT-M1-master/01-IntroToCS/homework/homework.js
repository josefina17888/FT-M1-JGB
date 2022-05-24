'use strict'

function BinarioADecimal(num) {
  // tu codigo aca
  let decimal = 0;
  for (var i = 0; i < num.length; i++) {
    decimal = decimal + num[i] * 2 ** (num.length - 1 - i);
  }
  return decimal;
}

function DecimalABinario(num) {
  // tu codigo aca
return num.toString(2);
}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}