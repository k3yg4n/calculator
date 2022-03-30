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
    return a/b;
}

function operate(op, num1, num2){
    num1 = Number(num1);
    num2 = Number(num2);
    if(op === "+"){return add(num1,num2).toFixed(3);}
    if(op === "-"){return subtract(num1,num2).toFixed(3);}
    if(op === multSymbol){return multiply(num1,num2).toFixed(3);}
    if(op === divSymbol){return divide(num1,num2).toFixed(3);}
    else{return "ERROR";}
}

// Button Event Listener Function
// function updateDisplay(e){
//     console.log("updateDisplay was run");
//     if(e.target.id === "clrBtn"){ // Clear button is pressed
//         display.textContent = "";
//     } else if (e.target.id === "eqBtn"){ // Equal button is pressed
        
//         if(display.textContent.includes("+")){
//             op = "+";
//         } else if (display.textContent.includes("-")){
//             op = "-";
//         } else if (display.textContent.includes(multSymbol)){
//             op = multSymbol;
//         } else if (display.textContent.includes(divSymbol)){
//             op = divSymbol
//         }

//         [num1,num2] = display.textContent.split(op);

//         display.textContent = operate(op, num1, num2);
//     } else { // Numerical Button is pressed or Operator is pressed
//         display.textContent += e.target.textContent;
//     }
// }

// function updateVars(e){
//     console.log("updateVars was run");
//     const value = e.target.textContent;
//     if(e.target.className === "numBtn"){
//         (num1 === null ? num1 = value : num2 = value);
//     } else { // An operator button has been pressed
//         op = e.target.textContent;
//     }
// }

function updateDisplay(e){
    let textToDisplay = "";

    if(e.target.id === "clrBtn") { // if clear button is pressed
        textToDisplay = ""; 
        num1 = null;
        num2 = null;
        op = null;
    } else if(e.target.className === "opBtn"){ // if operator button is pressed
            let currOp = e.target.textContent;
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
            op = currOp;
            textToDisplay = display.textContent + op;
        }

    } else if(e.target.id === "eqBtn"){ // at this point we should have num1 and op
        console.log("Equal button pressed.")
        num2 = getAfterOp(display.textContent);
        textToDisplay = operate(op, num1, num2);
        num1 = textToDisplay;
        op = null;
        num2 = null;
    } else { // if numerical btn is pressed
        textToDisplay = (display.textContent + e.target.textContent);
    }
    
    display.textContent = textToDisplay;
}

function getAfterOp(displayText){
    return displayText.split(String(op))[1];
}

///// MAIN /////

// Initialize the display
const display = document.querySelector('#display');
const startDisplayVal = "";
let curDisplayVal = startDisplayVal;

display.textContent = startDisplayVal;

// Buttons
const buttons = document.querySelectorAll('button');
const opButtons = document.querySelectorAll('.opbtn');
const numButtons = document.querySelectorAll('.numBtn')

for(let btn of buttons){
    btn.addEventListener('click',updateDisplay);
}


// Global variables
let num1 = null;
let num2 = null;
let op = null;
const divSymbol = "\u00f7";
const multSymbol = "\u00d7"

