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

const booleanArray = [0, 0, 0, 0];
let firstInput;
let secondInput;

window.addEventListener("keydown", keyboardInput, false);
window.addEventListener("keydown", keyboardOperator, false);
userInput.addEventListener("input", inputValidation);

function inputValidation() {
  userInput.value = userInput.value
    .replace(/(?!^-)[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1")
    .replace(/^0[^.]/, "0");
  if (userInput.value == "") {
    userInput.value = "0";
  }
}

function keyboardInput(k) {
  k.preventDefault();
  if (userInput.value == "0") {
    userInput.value = "";
  }
  if (!(userInput === document.activeElement)) {
    userInput.value = userInput.value + String.fromCharCode(k.keyCode);
    if (k.keyCode == 190) {
      userInput.value = userInput.value + ".";
    }
  }
  inputValidation();
}

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
      if (k.shiftKey == true) {
        operatorSelection(1, 2);
      }
      break;
    case 56:
      if (k.shiftKey == true) {
        operatorSelection(2, 3);
      }
      break;
    case 191:
      operatorSelection(3, 4);
      break;
    case 13:
      equals();
      resetArray();
      break;
    case 8:
      break;
    default:
      break;
  }
}

function operatorSelection(arrayIndex, arrayValue) {
  resetArray();
  booleanArray[arrayIndex] = arrayValue;
  console.log(booleanArray[arrayIndex]);
  saveInput();
  firstInputText.innerHTML = firstInput;
}

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
clearAllButton.addEventListener("click", () => clearAll());
clearEntryButton.addEventListener("click", () => clearEntry());
equalsButton.addEventListener("click", () => {
  equals();
  resetArray();
});
backspaceButton.addEventListener("click", () => backspace());

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

function sign() {}

function squareRoot() {}

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
  let backspaceString = userInput.value;
  console.log(backspaceString);
  backspaceString = backspaceString.slice(0, -1);
  console.log(backspaceString);
  userInput.value = backspaceString;
  console.log("worked");
}