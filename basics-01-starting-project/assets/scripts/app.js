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

function add() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult = currentResult + enteredNumber;
    createAndWriteOutput('+', initialResult, enteredNumber);
    writeToLog("ADD", initialResult, enteredNumber, currentResult);

}

function subtraction() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult -= enteredNumber;
    createAndWriteOutput('-', initialResult, enteredNumber);
    writeToLog("subtraction", initialResult, enteredNumber, currentResult);

}

function multiply() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult *= enteredNumber;
    createAndWriteOutput('*', initialResult, enteredNumber);
    writeToLog("multiply", initialResult, enteredNumber, currentResult);
}

function divide() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;
    createAndWriteOutput('/', initialResult, enteredNumber);
    writeToLog("divide", initialResult, enteredNumber, currentResult);
}
addBtn.addEventListener('click', add)
subtractBtn.addEventListener('click', subtraction)
multiplyBtn.addEventListener('click', multiply)
divideBtn.addEventListener('click', divide)

