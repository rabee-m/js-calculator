//Html elements
const display = document.querySelector(".display")
const buttons = document.querySelectorAll('button')

//variables used for computational logic of calculator
let lastNum = 0;
let a = 0;
let lastCmd = 'N/A';
let currOperator = 'N/A';
let numString = "";
const operators = ['+', '-', '*', '/'];

//Functions to handle basic operations
function add (a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a* b;}
function divide(a,b) { return b == 0 ? null : a /b;}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a ,b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function resetCalculator(lastResult, lastOperation) {
    display.textConetent = lastResult;
    a = lastResult;
    lastNum = lastResult;
    lastCmd = 'N/A';
    currOperator = lastOperation;
    numString = "";
}


//loop through buttons, and add event listenr for numeric buttons
for(let i = 0; i < buttons.length; i++) {
    if (!isNaN(buttons[i].id)) {
        buttons[i].addEventListener('click', () => {
            if (currOperator != 'N/A') {
                numString += buttons[i].id;
                display.textContent = numString;
                lastNum = parseFloat(numString)
                lastCmd = buttons[i].id;
            } else {
                numString += buttons[i].id;
                display.textContent = numString;
                lastNum = parseFloat(numString);
                lastCmd = buttons[i].id;
            }
        })
    }
}

//add event listener to operators and symbols
for (let i = 0; i < buttons.length; i++) {
    if (operators.includes(buttons[i].id)) {
        buttons[i].addEventListener('click', () => {
            if (currOperator == 'N/A') {
                a = lastNum
                numString = "";
                currOperator = buttons[i].id;
                lastCmd = buttons[i].id;
            } else {
                //chaining operations
                let result = operate(a, lastNum, currOperator)
                display.textContent = result
                resetCalculator(parseFloat(result), buttons[i].id);
            }
        })
    } else if (buttons[i].id == '=') {
        buttons[i].addEventListener('click', () => {
            if (currOperator == '/' && lastNum == 0) {
                //handle division by zero error
                display.textContent = 'ERROR';
                resetCalculator(0);
            } else {
                let result = operate(a, lastNum, currOperator)
                display.textContent = result
                resetCalculator(parseFloat(result), 'N/A');
            }
        })
    } else if (buttons[i].id == 'AC') {
        display.textContent = '0';
        buttons[i].addEventListener('click', () => {
            display.textContent = 0;
            resetCalculator(0, 'N/A');
        })
    }
}

//when a user presses an operator store lastNum into a
// if lastCmd is operator, then store num into b
// when '=' pressed call operate function
//then search for next number and operate on equal sign


//have value display value stored
// when operate is clicked, anticipate next     

