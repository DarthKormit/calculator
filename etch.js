let userInput = document.getElementById("user-input");
let equalsButton = document.getElementById("equals");
let addButton = document.getElementById("add");
let subButton = document.getElementById("sub");
let mulButton = document.getElementById("mul");
let divideButton = document.getElementById("divide");
let firstInputText = document.getElementById("first-input-text");
let clearAllButton = document.getElementById("clear-all");
let clearEntryButton = document.getElementById("clear-entry");
let backspaceButton = document.getElementById("backspace");
let signButton = document.getElementById("sign");
let exponentialButton = document.getElementById("exponential");
let rootButton = document.getElementById("root");

//input variables and boolean array that handles which operation to calculate
const booleanArray = [0, 0, 0, 0, 0, 0];
let firstInput;
let secondInput;

//event listeners handling user input into the input field
window.addEventListener("keydown", keyboardInput, false);
window.addEventListener("keydown", keyboardOperator, false);
userInput.addEventListener("input", inputValidation, false);
userInput.addEventListener("keyup", inputAlwaysZero, false);

//stops invalid user input from being placed inside of the input field
function inputValidation() {
  userInput.value = userInput.value
    .replace(/(?!^-)[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1")
    .replace(/^0[^.]/, "0");

  if (userInput.value === ".") {
    userInput.value = "0" + userInput.value;
  }
}

//handles input from the keyboard when not selecting the input field
function keyboardInput(k) {
  if (k.shiftKey == true && k.keyCode == 56) {
    operatorSelection(2, 3);
    return;
  }
  if (userInput.value === "0") {
    userInput.value = "";
  }
  if (!(userInput === document.activeElement)) {
    userInput.value = userInput.value + String.fromCharCode(k.keyCode);
    if (k.keyCode == 190 && !(userInput.value === "0")) {
      userInput.value = userInput.value + ".";
    } else if (k.keyCode == 190 && userInput.value === "0") {
      userInput.value = userInput.value + "0";
    }
  }
  inputValidation();
  inputAlwaysZero();
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
    default:
      break;
  }
}

//makes sure there is always a 0 in the input just like how it is in a calculator
function inputAlwaysZero() {
  if (userInput.value == "" && !(userInput === document.activeElement)) {
    console.log(userInput.value);
    userInput.value = "0";
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
backspaceButton.addEventListener("click", () => backspace());
signButton.addEventListener("click", () => sign());

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
  firstInputText.innerHTML = firstInput;
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
      firstInputText.innerHTML = firstInput + "*" + secondInput;
      break;

    case 4:
      secondInput = parseFloat(userInput.value);
      userInput.value = division();
      firstInputText.innerHTML = firstInput + "/" + secondInput;
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