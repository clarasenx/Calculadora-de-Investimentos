import { generateArray } from "./src/investmentGoals";

const form = document.getElementById("investmentForm");

function renderProgression(evt) {
  evt.preventDefault();
  const startingAmount = Number(
    document.getElementById("startingAmount").value.replace(",", ".")
  );
  const additionContribution = Number(
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
    additionContribution,
    returnRate,
    evaluationPeriod
  );

  console.log(returnArray);
};

function validateInput(evt) {
  if (evt.target.value === "") {
    return;
  };

  const parentElement = evt.target.parentElement;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");

  if (isNaN(inputValue) || Number(inputValue) <= 0) {
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-600 text-semibold text-sm");
    errorTextElement.innerText = "Insira um valor numérico e maior que zero";

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  };
};

for (const formElement of form) {
  if (formElement.tagName === "input" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  };
};

form.addEventListener("submit", renderProgression);
