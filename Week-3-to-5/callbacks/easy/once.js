// Problem Description – once(fn)

// You are required to implement a wrapper function named once that accepts an asynchronous function fn.
// The wrapper should ensure that fn is executed only on the first call.
// Any subsequent calls must not re-execute fn and should instead return the same Promise or resolved result from the first invocation.
function once(fn) {
    let call = false;
    let storedData;

    return function(...args) {
        if(!call) {
            storedData = fn(...args);
            call = true;
        }
        return storedData;
    }
}

module.exports = once;