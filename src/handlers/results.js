import {getArr} from "../data.js";

const resultDialog = document.getElementById('results');

export function showResults(delArr) {
  resultDialog.innerHTML = "";

  const partArr = getArr("part");
  const expArr = getArr("exp");

  const dialogContainer = document.createElement('div');
  const dialogHeading = document.createElement("h2");
  const expensesContainer = document.createElement('div');
  const partContainer = document.createElement('div');

  dialogHeading.textContent = "Final results"
  dialogHeading.className = "text-xl text-center font-bold"
  dialogContainer.classList.add('dialog-flex');

  expensesContainer.innerHTML = `<p class="form-list-item">Total Expenses: <span>$${calcTotalExpenses()}</span></p>`


  dialogContainer.append(dialogHeading, expensesContainer, partContainer)
  resultDialog.appendChild(dialogContainer)
  resultDialog.showModal();
}

function calcTotalExpenses() {
  const expensesArr = getArr("exp");
  let totalExpenses = 0;
  for (let expense of expensesArr) {
    totalExpenses += expense.amount;
  }
  return totalExpenses;
}