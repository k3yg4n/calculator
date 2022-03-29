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
    if(op === "+"){return add(num1,num2);}
    if(op === "-"){return subtract(num1,num2);}
    if(op === multSymbol){return multiply(num1,num2);}
    if(op === divSymbol){return divide(num1,num2);}
    else{return "ERROR";}
}

// Button Event Listener Function
function updateDisplay(e){
    console.log("updateDisplay was run");
    if(e.target.id === "clrBtn"){ // Clear button is pressed
        display.textContent = "";
    } else if (e.target.id === "eqBtn"){ // Equal button is pressed
        if(display.textContent.includes("+")){
            op = "+";
        } else if (display.textContent.includes("-")){
            op = "-";
        } else if (display.textContent.includes(multSymbol)){
            op = multSymbol;
        } else if (display.textContent.includes(divSymbol)){
            op = divSymbol
        }

        [num1,num2] = display.textContent.split(op);

        display.textContent = operate(op, num1, num2);
    } else if (e.target) { // Numerical value is pressed or Operator is pressed
        display.textContent += e.target.textContent;
    }
}

function updateVars(e){
    console.log("updateVars was run");
    const value = e.target.textContent;
    if(e.target.className === "numBtn"){
        (num1 === null ? num1 = value : num2 = value);
    } else { // An operator button has been pressed
        op = e.target.textContent;
    }
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

for (let btn of opButtons){
    btn.addEventListener('click',updateVars);
}

for (let btn of numButtons){
    btn.addEventListener('click',updateVars);
}

// Global variables
let num1 = null;
let num2 = null;
let op = null;
const divSymbol = "\u00f7";
const multSymbol = "\u00d7"

