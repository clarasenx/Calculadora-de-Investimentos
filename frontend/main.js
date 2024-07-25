import { generateArray } from './src/investmentGoals';

const form = document.getElementById("investmentForm");

function renderProgression(evt) {
  evt.preventDefault();
  const startingAmount = Number(
    document.getElementById("startingAmount").value.replace(",", ".")
  );
  const additionContribution = Number(
    document.getElementById("additionalContribution").value.replace(",", ".")
  );
  const timeAmount = Number(
    document.getElementById("timeAmount").value.replace(",", ".")
  );
  const timeAmountPeriod = document.getElementById("timeAmountPeriod").value;
  const returnRate = Number(
    document.getElementById("returnRate").value.replace(",", ".")
  );
  const evaluationPeriod = document.getElementById("evaluationPeriod").value;
  const taxRate = Number(
    document.getElementById("taxRate").value.replace(",", ".")
  );

  const returnArray = generateArray(startingAmount, timeAmount, timeAmountPeriod, additionContribution, returnRate, evaluationPeriod);

  console.log(returnArray);
}

form.addEventListener('submit', renderProgression);
