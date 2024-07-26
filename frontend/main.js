import { generateArray } from "./src/investmentGoals";

const form = document.getElementById("investmentForm");
const clearFormButton = document.getElementById("clearForm");

function renderProgression(evt) {
  evt.preventDefault();

  if (document.querySelector(".error")) {
    return;
  }

  const startingAmount = Number(
    document.getElementById("startingAmount").value.replace(",", ".")
  );
  const additionalContribution = Number(
    document.getElementById("additionalContribution").value.replace(",", ".")
  );
  const timeAmount = Number(document.getElementById("timeAmount").value);
  const timeAmountPeriod = document.getElementById("timeAmountPeriod").value;
  const returnRate = Number(
    document.getElementById("returnRate").value.replace(",", ".")
  );
  const evaluationPeriod = document.getElementById("evaluationPeriod").value;
  const taxRate = Number(
    document.getElementById("taxRate").value.replace(",", ".")
  );

  const returnArray = generateArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    evaluationPeriod
  );

  console.log(returnArray);
}

function clearForm() {
  form["startingAmount"].value = "";
  form["additionalContribution"].value = "";
  form["timeAmount"].value = "";
  form["returnRate"].value = "";
  form["taxRate"].value = "";

  const errorInputs = document.querySelectorAll(".error");

  for (const error of errorInputs) {
    error.classList.remove("error");
    error.parentElement.querySelector("p").remove();
  }
}

function validateInput(evt) {
  if (evt.target.value === "") {
    return;
  }

  const { parentElement } = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");

  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("errorText");
    errorTextElement.innerText = "Insira um valor numérico e maior que zero";

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);
clearFormButton.addEventListener("click", clearForm);
