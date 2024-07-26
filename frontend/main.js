import { Chart } from "chart.js/auto";
import { generateArray } from "./src/investmentGoals";

const form = document.getElementById("investmentForm");
const clearFormButton = document.getElementById("clearForm");

const finalMoneyChart = document.getElementById("finalMoneyDistribution");
const progressionChart = document.getElementById("progression");
let doughnutChartReference = {};
let progressionChartReference = {};


function formatCurrency(value) {
  return value.toFixed();
}

function renderProgression(evt) {
  evt.preventDefault();
  resetCharts();

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

  const finalInvestmentObject = returnArray[returnArray.length - 1];

  doughnutChartReference = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Total Investido", "Rendimento", "Imposto"],
      datasets: [
        {
          data: [
            formatCurrency(finalInvestmentObject),
            formatCurrency(
              finalInvestmentObject.totalInterestReturns * (1 - taxRate / 100)
            ),
            formatCurrency(
              finalInvestmentObject.totalInterestReturns * (taxRate / 100)
            ),
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  progressionChartReference = new Chart(progressionChart, {
    type: "bar",
    data: {
      label: returnArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: "Total Investido",
          data: returnArray.map(
            (investmentObject) => investmentObject.investedAmount
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Retorno do Investimento",
          data: returnArray.map(
            (investmentObject) => investmentObject.interestReturns
          ),
          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
}

function isObjctEmpty(objct) {
  return Object.keys(objct).length === 0;
}

function resetCharts() {
  if (!isObjctEmpty(doughnutChartReference) && !isObjctEmpty(progressionChartReference)) {
    doughnutChartReference.destroy()
    progressionChartReference.destroy();
  }
}

function clearForm() {
  form["startingAmount"].value = "";
  form["additionalContribution"].value = "";
  form["timeAmount"].value = "";
  form["returnRate"].value = "";
  form["taxRate"].value = "";
  
  resetCharts();

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
