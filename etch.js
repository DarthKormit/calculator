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

userInput.oninput = function () {
  userInput.value = userInput.value.replace(/(?!^-)[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1").replace(/^0[^.]/, "0");
};

addButton.addEventListener("click", () => {
  resetArray();
  booleanArray[0] = 1;
  console.log(booleanArray[0]);
  saveInput();
  firstInputText.innerHTML = firstInput;
});

subButton.addEventListener("click", () => {
  resetArray();
  booleanArray[1] = 2;
  saveInput();
});

mulButton.addEventListener("click", () => {
  resetArray();
  booleanArray[2] = 3;
  saveInput();
});

divideButton.addEventListener("click", () => {
  resetArray();
  booleanArray[3] = 4;
  saveInput();
});

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
  return console.log(firstInput + secondInput);
}

function subtraction() {
  return console.log(firstInput - secondInput);
}

function multiplication() {
  return console.log(firstInput * secondInput);
}

function division() {
  return console.log(firstInput / secondInput);
}

function sign() {

}

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
      addition();
      break;
    case 2:
      secondInput = parseFloat(userInput.value);
      subtraction();
      break;

    case 3:
      secondInput = parseFloat(userInput.value);
      multiplication();
      break;

    case 4:
      secondInput = parseFloat(userInput.value);
      division();
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

function deleteInput() {
  
}
