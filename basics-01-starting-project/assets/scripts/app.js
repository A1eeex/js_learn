const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

//Get input from input filed
function getUserNumberInput() {
    return parseInt(ustInput.value);
}

function createAndWriteOutput(operator, resultBefore, calcNumber) {
    const calcDescription = `${resultBefore} ${operator} ${calcNumber}`;
    outputResult(currentResult, calcDescription);
}

function writeToLog(operationIdentifier, prevResult, operationNumber, numberResult) {
    const logEntry = {
        operator: operationIdentifier,
        prevResult: prevResult,
        number: operationNumber,
        result: numberResult
    }
    logEntries.push(logEntry)
    console.log(logEntries)
}

function calculateResult(calculationType) {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    let mathOperator;

    if (calculationType === "ADD") {
        currentResult = currentResult + enteredNumber;
        mathOperator = '+';
    } else if(calculationType === "subtraction"){
        currentResult -= enteredNumber;
        mathOperator = '-';
    } else if(calculationType === "MULTIPLY"){
        currentResult *= enteredNumber;
        mathOperator = '*';
    }else if(calculationType === "DIVIDE"){
        currentResult /= enteredNumber;
        mathOperator = '/';
    }
    createAndWriteOutput(mathOperator, initialResult, enteredNumber);
    writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add() {
    calculateResult('ADD')
}

function subtraction() {
    calculateResult('subtraction')
}

function multiply() {
    calculateResult('MULTIPLY')
}

function divide() {
    calculateResult('DIVIDE')
}

addBtn.addEventListener('click', add)
subtractBtn.addEventListener('click', subtraction)
multiplyBtn.addEventListener('click', multiply)
divideBtn.addEventListener('click', divide)

