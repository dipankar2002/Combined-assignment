/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function sortString(s) {
  return s.toLowerCase().split('').sort().join('');
}

// This is a funnction to compaire two object.
function isEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if(keys1.length !== keys2.length) return false;

  for(let key of keys1) {
    if(obj1[key] !== obj2[key]) return false;
  }
  return true;
}

// using objects methode.
function isAnagram(str1, str2) {
  if(str1.length !== str2.length) {
    return false;
  }
  let obj1 = {};
  let obj2 = {};
  for(let i = 0; i < str1.length; i++) {
    let char1 = str1[i].toLowerCase();
    let char2 = str2[i].toLowerCase();
    
    obj1[char1] = (obj1[char1] || 0) + 1;
    obj2[char2] = (obj2[char2] || 0) + 1;
  }
  return isEqual(obj1, obj2);
}

module.exports = isAnagram;