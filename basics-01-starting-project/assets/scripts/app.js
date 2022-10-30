const defaultResult = 0;
let currentResult = defaultResult;

function getUserNumberInput() {
    return parseInt(ustInput.value);
}

function createAndWriteOutput(operator, resultBefore, calcNumber){
    const calcDescription = `${resultBefore} ${operator} ${calcNumber}`;
    outputResult(currentResult, calcDescription);
}

function add() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult = currentResult + enteredNumber;
    createAndWriteOutput('+', initialResult, enteredNumber)

}

function subtraction() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult = currentResult - enteredNumber;
    createAndWriteOutput('-', initialResult, enteredNumber)
}
function multiply() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult = currentResult * enteredNumber;
    createAndWriteOutput('*', initialResult, enteredNumber)
}
function divide() {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult = currentResult / enteredNumber;
    createAndWriteOutput('/', initialResult, enteredNumber)
}
addBtn.addEventListener('click', add)

subtractBtn.addEventListener('click', subtraction)
multiplyBtn.addEventListener('click', multiply)
divideBtn.addEventListener('click', divide)

