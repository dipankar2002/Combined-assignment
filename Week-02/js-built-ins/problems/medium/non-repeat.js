/*
  Write a function `nonrepeat` which takes a string as input and returns the first non-repeating character in the string.

  What is a non-repeating character?
  - A character that appears only once in the entire string.

  Example:
  - Input: "abcab"
  - Output: "c"

  - Input: "aabbcc"
  - Output: null

  - Input: "abcdef"
  - Output: "a"

  - Input: ""
  - Output: null

  Once you've implemented the logic, test your code by running
  - `npm run test-nonrepeat`
*/
function nonrepeat(str) {
  // Your code here
  let obj = {};
  for(let i = 0; i < str.length; i++) {
    let ch = str[i];
    obj[ch] = ( obj[ch] || 0 ) + 1;
  }
  let keys = Object.keys(obj);
  for(let key of keys) {
    if(obj[key] == 1) return key;
  }
  return null;
}
module.exports = nonrepeat;
