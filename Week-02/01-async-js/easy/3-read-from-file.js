// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

const fs = require("fs");

console.log("Start");

fs.readFile("./easy/text_file.txt", "utf8", (err, data) => {
    if(err) {
        console.error("Error Found:\n", err);
        return;
    }
    console.log("File data in readFile:\n", data);
})

const data = fs.readFileSync("./easy/text_file.txt", "utf8");
console.log("File data in readFileSync:\n",data);

// Expensive operation (blocking)
let sum = 0;
for (let i = 0; i < 1e9; i++) {
    sum += i;
}
console.log("Sum is: ",sum);

console.log("End");