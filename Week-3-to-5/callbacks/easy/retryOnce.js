// Problem Description – Retry Async Function Once

// You are given an asynchronous function fn. Your task is to return a new function that calls fn and retries it once if the first attempt fails. 
// If the second attempt also fails, the error should be properly propagated. 
// This problem tests error handling, retry logic, and correct use of async/await with Promises.

function retryOnce(fn) {
    return async function (...args) {
        try {
            return await fn(...args); // first try
        } catch (error) {
            try {
                return await fn(...args); // retry
            } catch (err2) {
                throw err2; // IMPORTANT: throw original error
            }
        }
    };
}

module.exports = retryOnce;