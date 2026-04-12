// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)

let counter = 0;

function counterFunc() {
    console.log(counter);
    setTimeout(()=>{
        counter++;
        counterFunc();
    }, 1 * 1000);
}
counterFunc()