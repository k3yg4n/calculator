// Operation Functions
function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b === 0){
        return null;
    }
    return a/b;
}

function operate(op, num1, num2){
    num1 = Number(num1);
    num2 = Number(num2);
    if(op === "+"){return fixDec(add(num1,num2));}
    if(op === "-"){return fixDec(subtract(num1,num2));}
    if(op === multSymbol){return fixDec(multiply(num1,num2));}
    if(op === divSymbol){
        let result = divide(num1, num2);
        alert("You cannot divide by 0!")
        return result === null ? "ERROR" : fixDec(result); 
    }
    else{return "ERROR";}
}

function fixDec(value){ // This function rounds the result to 3 decimal places and removes the decimal if unnecessary
    return value.toFixed(3).replace(/\.000/, "");
}

function updateDisplay(e){
    let textToDisplay = "";
    console.log("num1: " + num1);
    console.log("num2: " + num2);
    
    if(display.textContent.includes("ERROR")){ 
        display.textContent = startDisplayVal;
        num1 = null;
        num2 = null;
        op = null;
    }

    if(e.target.id === "clrBtn") { // if clear button is pressed
        textToDisplay = "0"; 
        num1 = null;
        num2 = null;
        op = null;
    } else if(e.target.className === "opBtn"){ // if operator button is pressed
        let currOp = e.target.textContent;
        let lastDisplayChar = display.textContent.charAt(display.textContent.length - 1);
        
        if(lastDisplayChar === currOp){
            return;
        } else if(opArray.includes(lastDisplayChar)){
            display.textContent = (display.textContent.slice(0,-1)) + currOp;
            op = currOp;
            return;
        }
        
        if(num1 === null){ // the first value has not been received
            console.log("FIRST VALUE WAS JUST RECEIVED!")
            num1 = display.textContent;
            op = currOp;
            textToDisplay = num1 + op;
        } else if(num2 === null && op !== null) {// the second value is displayed but not read yet
            console.log("SECOND VALUE WAS JUST RECEIVED!")
            num2 = getAfterOp(display.textContent);
            textToDisplay = operate(op,num1,num2) + currOp;

            num1 = operate(op,num1,num2);
            op = currOp;
            num2 = null;
        } else if(num2 === null && op === null) { // num2 and op are unknown (after using equal button)
            console.log("OP BUTTON PRESSED AFTER EQUAL BUTTON")
            num1 = getBeforeOp(display.textContent);
            op = currOp;
            textToDisplay = display.textContent + op;
        }

    } else if(e.target.id === "eqBtn"){ // if eq btn is pressed
        // at this point we should have num1 and op
        if(num1 === null || op === null){ // if equal btn is pressed without all entries
            //console.log("num1 and num2 are null.")
            textToDisplay = display.textContent;
        } else if(getAfterOp(display.textContent) == ""){ // if num2 is missing
            //console.log("num2 has not been entered.")
            textToDisplay = display.textContent;
        } else { // otherwise perform operation as usual
            //console.log("perform regular calculation.") 
            num2 = getAfterOp(display.textContent);
            textToDisplay = operate(op, num1, num2);
            num1 = textToDisplay;
            op = null;
            num2 = null;
        }

    } else if(e.target.id === "decBtn"){ // if decimal btn is pressed
       
        if(display.textContent.charAt(display.textContent.length - 1) === "."){
            return;
        }
        if(display.textContent == "0"){
            textToDisplay = "0.";
        } else {
            textToDisplay = display.textContent + ".";
        }

    } else if(e.target.id === "delBtn"){ // if delete btn is pressed
        console.log("Delete button pressed.")
        let finalChar = display.textContent.charAt(display.textContent.length - 1);
        if(opArray.includes(finalChar)){
            op = null;
        } 
        textToDisplay = display.textContent.slice(0,display.textContent.length - 1);
        if(textToDisplay === ""){
            textToDisplay = "0";
        }
    } else { // if numerical btn is pressed
        if(display.textContent === "0"){
            textToDisplay = e.target.textContent;
        } else {
        textToDisplay = (display.textContent + e.target.textContent);
        }
    }
    
    display.textContent = textToDisplay;
}

function getAfterOp(displayText){
    return displayText.split(String(op))[1];
}

function getBeforeOp(displayText){
    return displayText.split(String(op))[0];
}

///// MAIN ///// 

// Initialize the display
const display = document.querySelector('#display');
const startDisplayVal = "0";
let curDisplayVal = startDisplayVal;

display.textContent = startDisplayVal;

// Buttons
const buttons = document.querySelectorAll('button');

for(let btn of buttons){
    btn.addEventListener('click',updateDisplay);
}


// Global variables
let num1 = null;
let num2 = null;
let op = null;
const divSymbol = "\u00f7";
const multSymbol = "\u00d7"
let opArray = ["+","-","\u00f7","\u00d7"];

