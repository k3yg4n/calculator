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
        if(result === null) {
            alert("You cannot divide by 0!")
            return "ERROR";
        } else {
        return fixDec(result); 
        }
    }
    else{return "ERROR";}
}

function fixDec(value){ // This function rounds the result to 3 decimal places and removes the decimal if unnecessary
    return value.toFixed(3).replace(/\.000/, "");
}

function updateDisplay(e){
    let textToDisplay = "";

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
        newOp = e.target.textContent;

        if(op === null){ // Pressed after num1
            console.log("Case1")
            op = newOp;
            num1 = display.textContent;
            textToDisplay = num1;
        } else if(num1 !== null && op !== null && display.textContent === num1) { // We are changing the op
            console.log("We are changing operation.")
            op = newOp;
            textToDisplay = num1;
        } else if(num1 !== null && op !== null) { // Pressed to evaluate prev expression 
            console.log("Case2")
            num2 = display.textContent;
            textToDisplay = operate(op,num1,num2);
            num1 = textToDisplay;
            num2 = null;
            op = newOp;
        }

    } else if(e.target.id === "eqBtn"){ // if eq btn is pressed
        if(num1 === null || op === null){ //  if equal btn is pressed without all entries
            console.log("not all entries have not been entered.")
            return;
        } else { // otherwise perform operation as usual
            console.log("perform regular calculation.") 
            num2 = display.textContent;
            textToDisplay = operate(op, num1, num2);
            
            num1 = textToDisplay;
            op = null;
            num2 = null;
        }

    } else if(e.target.id === "decBtn"){ // if decimal btn is pressed
       
        if(display.textContent.includes(".")){
            return;
        } else {
            textToDisplay = display.textContent + ".";
        }

    } else if(e.target.id === "delBtn"){ // if delete btn is pressed
        console.log("Delete button pressed.")
        let lenDisplay = display.textContent.length;
        finalChar = display.textContent.charAt(lenDisplay - 1);

        if(opArray.includes(finalChar)){
            op = null;
        } 

        textToDisplay = display.textContent.slice(0,display.textContent.length - 1);
        
        if(textToDisplay === ""){
            textToDisplay = startDisplayVal;
            num1 = null;
            num2 = null;
            op = null;
        }

    } else { // if numerical btn is pressed
        console.log("numerical button pressed.");
        if(display.textContent === "0"){
            console.log(1);
            textToDisplay = e.target.textContent;
        }else if(display.textContent.charAt(display.textContent.length - 1) === "."){
            console.log(2);
            textToDisplay = display.textContent + e.target.textContent;
        }else if( (num1 !== null && op !== null && num2 === null) || (num1 !== null && op === null && num2 === null) ){ // op is known so begin displaying num2
            textToDisplay = e.target.textContent;
            console.log(3);
        } else {
            textToDisplay = (display.textContent + e.target.textContent);
            console.log(4);
        }
    }
    
    display.textContent = textToDisplay;
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

