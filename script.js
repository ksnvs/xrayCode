let _allOnes = 4294967295;
let codeArr = (4);

const CodeGenerator = function (code) {
  var numArray = new Array(256);
  var buffer = new Array();
  let DefaultPolynomial = 1230198834;
  let _crc = 4294967295;

  for (let i = 0; i < code.length; i++) {
    buffer[i] = code.charCodeAt(i);
  }

  for (let index1 = 0; index1 < 256; ++index1) {
    let num = index1;
    for (let index2 = 8; index2 > 0; --index2) {
      if ((num & 1) == 1) num = (num >>> 1) ^ DefaultPolynomial;
      else num >>>= 1;
    }
    numArray[index1] = num;
  }

  for (let index1 = 0; index1 < buffer.length; ++index1) {
    let index2 = (_crc & 255) ^ buffer[index1];
    _crc >>>= 8;
    _crc ^= numArray[index2];
  }
  return finalCal(_crc);
};

const finalCal = function (crc){
  let num = crc ^ _allOnes;
  let codeArr = new Uint8Array(4);
  codeArr[0] = num & 255;
  codeArr[1] = num >>> 8 & 255;
  codeArr[2] = num >>> 16 & 255;
  codeArr[3] = num >>> 24 & 255;
  // Javascript is treating your final result as a signed number. You can fix this by ending your bitwise operation with codeArr >>> 0, which will force the sign bit to be 0.
  var byte2Uint = (codeArr[0] | codeArr[1]<<8 | codeArr[2] << 16 | codeArr[3] << 24) >>> 0;
  let hexString = byte2Uint.toString(16, 8).toUpperCase();
  return hexString;
};

function clickFc(){
  const input = document.querySelector('#xrayCode');
  const h4 =  document.querySelector('#serviceCode');
  if (input.value !== "" && input.value.length >= 8 && input.value.length <= 9)
  {
    h4.textContent = CodeGenerator(input.value).toString();
  }
  else
  {
    alert("Please input XRay Code from 8 to 9 Characters");
  }
}
