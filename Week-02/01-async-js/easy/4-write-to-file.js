// ## Write to a file

// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs");

console.log("Start");

const data1 = "Hello from writeFile (async)\n";
fs.writeFile("./easy/text_file.txt", data1, 
    (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        console.log("Async write completed");
    }
)
const data2 = "Hello from writeFileSync (sync)\n";
fs.writeFileSync(
    "./easy/text_file.txt", data2
);
console.log("Sync write completed");

// Expensive operation
let sum = 0;
for (let i = 0; i < 1e9; i++) {
    sum += i;
}
console.log("Sum is: ",sum);

console.log("End");