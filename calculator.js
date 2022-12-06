const userInput = document.getElementById("user-input");
const firstInputText = document.getElementById("first-input-text");
const equalsButton = document.getElementById("equals");
const addButton = document.getElementById("add");
const subButton = document.getElementById("sub");
const mulButton = document.getElementById("mul");
const divideButton = document.getElementById("divide");
const clearAllButton = document.getElementById("clear-all");
const clearEntryButton = document.getElementById("clear-entry");
const backspaceButton = document.getElementById("backspace");
const signButton = document.getElementById("sign");
const exponentialButton = document.getElementById("exponential");
const rootButton = document.getElementById("root");
const numericButtons = document.querySelectorAll(".button-numeric");
const decimalButton = document.getElementById("decimal");
const pieButton = document.getElementById("pie");
const eulerNumberButton = document.getElementById("euler");

//input variables and boolean array that handles which operation to calculate
const booleanArray = [0, 0, 0, 0, 0, 0];
let firstInput;
let secondInput;
let inputFontSize = 38;

//event listeners handling user input into the input field
window.addEventListener("keydown", numericKeyboardInput, false);
window.addEventListener("keydown", keyboardOperator, false);
window.addEventListener("keydown", specialKeyboardInput, false);
userInput.addEventListener("input", inputValidation, false);
userInput.addEventListener("keyup", inputAlwaysZero, false);
userInput.addEventListener("dragstart", function (e) {
  e.preventDefault();
});

//stops invalid user input from being placed inside of the input field
function inputValidation() {
  userInput.value = userInput.value
    .replace(/(?!^-)(!^e)[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1")
    .replace(/^0[^.]/, "0");

  if (userInput.value === ".") {
    userInput.value = "0" + userInput.value;
  }
  inputAlwaysZero();
}

//makes sure there is always a 0 in the input just like how it is in a calculator
function inputAlwaysZero() {
  if (userInput.value == "" && !(userInput === document.activeElement)) {
    console.log(userInput.value);
    userInput.value = "0";
  }
  if (userInput.value.length < 1 && userInput === document.activeElement) {
    console.log(userInput.value);
    userInput.value = "0";
    console.log("removed");
  }
}

function keyboardNumeric(numericValue) {
  let buttonNumber = numericValue;
  if (userInput.value === "0") {
    userInput.value = "";
  }
  userInput.value = userInput.value + buttonNumber;
  inputValidation();
}

function numericKeyboardInput(k) {
  if (!(userInput === document.activeElement)) {
    if (k.key >= 0 && k.key <= 9) {
      console.log(k.key);
      let key = String(k.key);
      console.log(key);
      let element = document.getElementById(key);
      console.log(element);
      element.click();
    }
  }
}

//handles input from the keyboard when not selecting the input field
function specialKeyboardInput(k) {
  if (k.shiftKey == true && k.keyCode == 56) {
    operatorSelection(2, 3);
    return;
  }
  if (k.keyCode === 173 && userInput.value === "-0") {
    userInput.value = "0";
  }
  if (k.keyCode === 190) {
    document.getElementById("decimal").click();
  }
  inputValidation();
}

//handles which operation is selected by the keyboard input
function keyboardOperator(k) {
  console.log(k.which);
  console.log(String.fromCharCode(k.keyCode));
  switch (k.keyCode) {
    case 61:
      if (k.shiftKey == true) {
        operatorSelection(0, 1);
        break;
      }
      console.log("activated");
      equals();
      resetArray();
      break;
    case 173:
      if (userInput.value == "") {
        userInput.value = "0";
      }
      operatorSelection(1, 2);
      break;
    case 56:
      if (k.shiftKey == true) {
        if (userInput === document.activeElement) {
          operatorSelection(2, 3);
        }
      }
      break;
    case 191:
      k.preventDefault();
      operatorSelection(3, 4);
      break;
    case 13:
      equals();
      resetArray();
      break;
    case 8:
      backspace();
      break;
    case 120:
      sign();
      break;
    default:
      break;
  }
}

//event listeners for all buttons
addButton.addEventListener("click", function () {
  operatorSelection(0, 1);
});
subButton.addEventListener("click", function () {
  operatorSelection(1, 2);
});
mulButton.addEventListener("click", function () {
  operatorSelection(2, 3);
});
divideButton.addEventListener("click", function () {
  operatorSelection(3, 4);
});
exponentialButton.addEventListener("click", () => {
  operatorSelection(4, 5);
});
rootButton.addEventListener("click", () => {
  operatorSelection(5, 6);
});
clearAllButton.addEventListener("click", () => clearAll());
clearEntryButton.addEventListener("click", () => clearEntry());
equalsButton.addEventListener("click", () => {
  equals();
  resetArray();
});
pieButton.addEventListener("click", function () {
  userInput.value = Math.PI;
  inputValidation();
  inputAlwaysZero();
});
eulerNumberButton.addEventListener("click", function () {
  userInput.value = Math.E;
  inputValidation();
  inputAlwaysZero();
});
backspaceButton.addEventListener("click", () => backspace());
signButton.addEventListener("click", () => sign());
decimalButton.addEventListener("click", () => decimal());
numericButtons.forEach((numericButton) => {
  numericButton.addEventListener("click", () =>
    keyboardNumeric(numericButton.value)
  );
});

//functions of all operations
function addition() {
  console.log(firstInput + secondInput);
  return firstInput + secondInput;
}

function subtraction() {
  console.log(firstInput - secondInput);
  return firstInput - secondInput;
}

function multiplication() {
  console.log(firstInput * secondInput);
  return firstInput * secondInput;
}

function division() {
  console.log(firstInput / secondInput);
  return firstInput / secondInput;
}

function exponential() {
  console.log(Math.pow(firstInput, secondInput));
  return Math.pow(firstInput, secondInput);
}

function decimal() {
  if (!(userInput === document.activeElement)) {
    userInput.value = userInput.value + ".";
  }
  inputValidation();
}

function root() {
  console.log(Math.pow(firstInput, 1 / secondInput));
  return Math.pow(firstInput, 1 / secondInput);
}

function sign() {
  let signString = userInput.value;
  if (signString.startsWith("-", 0)) {
    userInput.value = signString.substring(1);
  } else {
    userInput.value = "-" + signString;
  }
}

function resetArray() {
  for (let i = 0; i < booleanArray.length; i++) {
    booleanArray[i] = 0;
  }
}

function saveInput() {
  if (firstInput === undefined) {
    firstInput = parseFloat(userInput.value);
    userInput.value = "0";
  }
}

function operatorSelection(arrayIndex, arrayValue) {
  resetArray();
  booleanArray[arrayIndex] = arrayValue;
  console.log(booleanArray[arrayIndex]);
  saveInput();
  changeFirstInputText();
  // firstInputText.innerHTML = firstInput;
}

function changeFirstInputText() {
  let operationNumber = 0;
  for (var i = 0; i < booleanArray.length; i++) {
    operationNumber = operationNumber + booleanArray[i];
  }
  switch (operationNumber) {
    case 1:
      firstInputText.innerHTML = firstInput + "+";
      break;
    case 2:
      firstInputText.innerHTML = firstInput + "-";
      break;

    case 3:
      firstInputText.innerHTML = firstInput + "×";
      break;

    case 4:
      firstInputText.innerHTML = firstInput + "÷";
      break;
    case 5:
      firstInputText.innerHTML = firstInput + "^";
      break;
    case 6:
      firstInputText.innerHTML =
        "<sup>" + "&#119909;" + "</sup>" + "√" + firstInput;
      break;
    default:
      console.log("Unsuccessful");
      break;
  }
}

function clearAll() {
  firstInput = undefined;
  secondInput = undefined;
  userInput.value = "0";
  firstInputText.innerHTML = "0";
  resetArray();
  console.log("executed");
}

function clearEntry() {
  userInput.value = "0";
}

function backspace() {
  if (!(userInput === document.activeElement)) {
    let backspaceString = userInput.value;
    console.log(backspaceString);
    backspaceString = backspaceString.slice(0, -1);
    console.log(backspaceString);
    userInput.value = backspaceString;
    console.log("worked");
    inputAlwaysZero();
  }
  inputAlwaysZero();
}

function equals() {
  let caseNumber = 0;
  for (var i = 0; i < booleanArray.length; i++) {
    caseNumber = caseNumber + booleanArray[i];
  }
  console.log(caseNumber);
  switch (caseNumber) {
    case 1:
      secondInput = parseFloat(userInput.value);
      userInput.value = addition();
      firstInputText.innerHTML = firstInput + "+" + secondInput;
      break;
    case 2:
      secondInput = parseFloat(userInput.value);
      userInput.value = subtraction();
      firstInputText.innerHTML = firstInput + "-" + secondInput;
      break;

    case 3:
      secondInput = parseFloat(userInput.value);
      userInput.value = multiplication();
      firstInputText.innerHTML = firstInput + "×" + secondInput;
      break;

    case 4:
      secondInput = parseFloat(userInput.value);
      userInput.value = division();
      firstInputText.innerHTML = firstInput + "÷" + secondInput;
      break;
    case 5:
      secondInput = parseFloat(userInput.value);
      userInput.value = exponential();
      firstInputText.innerHTML = firstInput + "<sup>" + secondInput + "</sup>";
      break;
    case 6:
      secondInput = parseFloat(userInput.value);
      userInput.value = root();
      firstInputText.innerHTML =
        "<sup>" + secondInput + "</sup>" + "√" + firstInput;
      break;
    default:
      console.log("Unsuccessful");
      break;
  }
  firstInput = undefined;
  secondInput = undefined;
  console.log("reached");
}
