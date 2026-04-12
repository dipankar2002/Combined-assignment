// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

let HH_24f;
let MM_24f;
let SS_24f;

let HH_12f;
let MM_12f;
let SS_12f;
let FORMAT;

const MODE = "machine"; // "manual"

if (MODE === "machine") {
    const date = new Date();
    HH_24f = date.getHours();
    MM_24f = date.getMinutes();
    SS_24f = date.getSeconds();

    HH_12f = date.getHours();
    HH_12f = HH_12f % 12;
    if (HH_12f === 0) HH_12f = 12;
    MM_12f = date.getMinutes();
    SS_12f = date.getSeconds();
    FORMAT = HH_12f >= 12 ? "PM" : "AM";
} else {
    // manual increment logic
    HH_24f = 0; 
    MM_24f = 0; 
    SS_24f = 0; 

    HH_12f = 2; 
    MM_12f = 13; 
    SS_12f = 0; 
    FORMAT = "AM";
}

// This function also works with a manual HH,MM,SS values.
function clock24H() {console.clear();
    console.log(
        `Digital Clock 24H format: ` +
        `${String(HH_24f).padStart(2, "0")}:` +
        `${String(MM_24f).padStart(2, "0")}:` +
        `${String(SS_24f).padStart(2, "0")}`
    );

    SS_24f++;
    if(SS_24f === 60) {
        SS_24f = 0;
        MM_24f++;
    } 
    if(MM_24f === 60) {
        MM_24f = 0;
        HH_24f++;
    } 
    if(HH_24f == 24) {
        HH_24f = 0;
    }
    
    setTimeout(clock24H, 1 * 1000);   
}


function clock12H() {
    console.clear();
    console.log(
        `Digital Clock 12H format: ` +
        `${String(HH_12f).padStart(2, "0")}:` +
        `${String(MM_12f).padStart(2, "0")}:` +
        `${String(SS_12f).padStart(2, "0")}` +
        ` ${FORMAT}`
    );

    SS_12f++;
    if(SS_12f === 60) {
        SS_12f = 0;
        MM_12f++;
    } 
    if(MM_12f === 60) {
        MM_12f = 0;
        HH_12f++;
    } 
    // This is good for manual time set. (Uncomment in Manual Mode).
    // if(HH_12f > 12) {
    //     HH_12f = 1;
    // }
   
    // This works manual time set. (Uncomment in Manual Mode).
    // if (HH_12f === 12 && MM_12f === 0 && SS_12f === 0) {
    //     FORMAT = FORMAT === "AM" ? "PM" : "AM";
    // }

    setTimeout(clock12H, 1 * 1000);
}

clock24H();
clock12H();