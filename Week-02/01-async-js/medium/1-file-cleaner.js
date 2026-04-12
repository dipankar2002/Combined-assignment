// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require("fs");

// this will store the file content into string type.
const data = fs.readFileSync("./medium/text_file.txt", "utf-8");

// const newString = data.replace(/\s+/g, " ").trim(); // this is only remove spaces and lines into one line.

// this will remove all spaces and extra lines.
const newString = data
.split("\n") // divide every line into array.
.map(line => line.replace(/\s+/g, " ").trim()) // remove inside spaces from every array string.
.filter(line => line.length>0) // remove all empty string array elements and reduce lines.
.join("\n"); // join the string from the array of strings.

fs.writeFileSync("./medium/text_file.txt", newString);