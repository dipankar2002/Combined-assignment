/*
  Write a function `compression` which takes a string as input and returns a compressed version of the string. The compression is done by replacing consecutive repeating characters with the character followed by the count of repetitions. If a character does not repeat, it is not followed by a count.

  Example:
  - Input: "aaabbbbcccvvmm"
  - Output: "a3b4c3v2m2"

  - Input: "abc"
  - Output: "abc"

  - Input: "aabbcc"
  - Output: "a2b2c2"

  - Input: ""
  - Output: ""

  Note:
  - The function should work for any alphanumeric string.

  Once you've implemented the logic, test your code by running
  - `npm run test-compressString`
*/
function compression(str) {
  // Your code here
  if(str.length === 0) return "";
  let result = "";
  let currCh = "";
  let count = 0;

  for(let i = 0 ; i < str.length; i++) {
    currCh = str[i];
    count++;
    if(currCh !== str[i+1]) {
      result += currCh;
      if(count > 1) {
        result += count;
      }
      count = 0;
    }
  }
  return result;
}

module.exports = compression;