let userInput = document.getElementById("user-input");
let equalsButton = document.getElementById("equals");
let addButton = document.getElementById("add");
let subButton = document.getElementById("sub");
let mulButton = document.getElementById("mul");
let divideButton = document.getElementById("divide");
let firstInputText = document.getElementById("first-input-text");

const booleanArray = [0, 0, 0, 0];
let firstInput;
let secondInput;

window.addEventListener("keydown", keyboardInput, false);

userInput.addEventListener("input", inputValidation);

function inputValidation() {
  userInput.value = userInput.value
    .replace(/(?!^-)[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1")
    .replace(/^0[^.]/, "0");
}

function keyboardInput(k) {
  inputValidation();
  if (k.keyCode == "191") {
    k.preventDefault();
    console.log("/");
  }
}

function operatorSelection(arrayIndex, arrayValue) {
  resetArray();
  booleanArray[arrayIndex] = arrayValue;
  console.log(booleanArray[arrayIndex]);
  saveInput();
  firstInputText.innerHTML = firstInput;
}

addButton.addEventListener("click", operatorSelection(0, 1));
subButton.addEventListener("click", operatorSelection(1, 2));
mulButton.addEventListener("click", operatorSelection(2, 3));
divideButton.addEventListener("click", operatorSelection(3, 4));

equalsButton.addEventListener("click", () => {
  equals();
  resetArray();
});

function resetArray() {
  for (let i = 0; i < booleanArray.length; i++) {
    booleanArray[i] = 0;
  }
}

function saveInput() {
  if (firstInput === undefined) {
    firstInput = parseFloat(userInput.value);
    userInput.value = "";
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
      userInput.value = toString(subtraction());
      firstInputText.innerHTML = firstInput + "-" + secondInput;
      break;

    case 3:
      secondInput = parseFloat(userInput.value);
      userInput.value = toString(multiplication());
      firstInputText.innerHTML = firstInput + "*" + secondInput;
      break;

    case 4:
      secondInput = parseFloat(userInput.value);
      userInput.value = toString(division());
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
  userInput.value = "";
  resetArray();
}

function deleteInput() {}
