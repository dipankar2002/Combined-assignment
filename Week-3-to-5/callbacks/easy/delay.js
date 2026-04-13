// Problem Description – delay(ms, value)

// You are required to write a function named delay that takes two parameters: a time duration in milliseconds and a value. 
// The function should return a Promise that waits for the given time and then resolves with the provided value.

function delay(ms, value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, ms)
    })
}

module.exports = delay;