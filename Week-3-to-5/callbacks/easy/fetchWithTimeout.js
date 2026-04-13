// Problem Description – fetchWithTimeout(url, ms)

// You are required to write a function named fetchWithTimeout that accepts a URL and a time limit in milliseconds. 
// The function must return a Promise that attempts to fetch data from the given URL.
// If the request completes within the specified time, the Promise resolves with the fetched data. 
// If the operation exceeds the time limit, the Promise rejects with the message "Request Timed Out".

function fetchWithTimeout(url, ms) {
    const fetchData = fetch(url);
    
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Request Timed Out");
        }, ms);
    })

    return Promise.race([ fetchData, timeoutPromise ]);
}

function fetchWithTimeoutClean(url, ms) {
    const fetchData = fetch(url);
    
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Request Timed Out");
        }, ms);
    })
    return Promise.race([ fetchData, timeoutPromise ]);
}

module.exports = { fetchWithTimeout, fetchWithTimeoutClean };