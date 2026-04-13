// Problem Description – rejectAfter(ms)

// You are required to create a function named rejectAfter that accepts a time duration in milliseconds. 
// The function should return a Promise that waits for the specified time and then rejects.

function rejectAfter(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Rejected after ${ms}ms`));
        }, ms);
    });
}

module.exports = rejectAfter;