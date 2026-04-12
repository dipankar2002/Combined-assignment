/*
  Write a function `compressWords` which takes an array of strings as input and returns a new array with consecutive duplicate elements compressed. If an element appears consecutively, it is replaced by the element followed by the count of its occurrences.

  Example:
  - Input: ["apple", "apple", "banana", "banana", "banana", "cherry", "apple", "apple"]
  - Output: ["apple2", "banana3", "cherry", "apple2"]

  - Input: ["cat", "dog", "dog", "dog", "cat"]
  - Output: ["cat", "dog3", "cat"]

  - Input: ["one", "two", "three"]
  - Output: ["one", "two", "three"]

  - Input: []
  - Output: []

  Note:
  - The function should handle empty arrays and arrays with no consecutive duplicates.

  Once you've implemented the logic, test your code by running
  - `npm run test-compressWord`
*/


function compressWords(arr) {
  // Your code here
  if(arr.length === 0) return [];
  let result = [];
  let currStr = "";
  let count = 0;

  for(let i = 0; i < arr.length; i++) {
    currStr = arr[i];
    count++;
    if(currStr !== arr[i+1]) {
      let strWord = "";
      strWord += currStr;
      if(count > 1) {
        strWord += count;
      }
      result.push(strWord);
      count = 0;
    }
  }
  return result;
}


module.exports = compressWords;
