import {getArr} from "../data.js";
import {reset} from "../utility.js";

const resultDialog = document.getElementById('results');

export function showResults(delArr) {
  console.log(delArr)
  resultDialog.innerHTML = "";

  const partArr = getArr("part");
  const expArr = getArr("exp");
  console.log(expArr)

  const dialogContainer = document.createElement('div');
  const dialogHeading = document.createElement("h2");
  const totalExpensesContainer = document.createElement('div');
  const partContainer = document.createElement('div');
  const finishBtn = document.createElement("button");

  finishBtn.className = "form-btn"
  finishBtn.type = "button";
  finishBtn.textContent = "Close"

  dialogHeading.textContent = "Final results"
  dialogHeading.className = "text-xl text-center font-bold"
  dialogContainer.classList.add('dialog-flex');

  partContainer.className = "flex flex-col gap-y-1"

  totalExpensesContainer.innerHTML = `<p class="form-list-item">Total Expenses: <span>$${calcTotalExpenses()}</span></p>`

    partArr.forEach((participant) => {
      const participantContainer = document.createElement('div');
      participantContainer.innerHTML = `
        <p class="form-list-item">${participant.name} <span>Total: $${calcUserTotal(participant.id, delArr)}</span></p>
      `;
      partContainer.appendChild(participantContainer);
  })

  finishBtn.addEventListener("click", closeDialog)

  dialogContainer.append(dialogHeading, totalExpensesContainer, partContainer, finishBtn)
  resultDialog.appendChild(dialogContainer)
  resultDialog.showModal();
}

function calcTotalExpenses() {
  const expensesArr = getArr("exp");
  let totalExpenses = 0;
  for (let expense of expensesArr) {
    totalExpenses += expense.amount;
  }

  // Only show two decimal places for totalExpenses
  totalExpenses = parseFloat(totalExpenses.toFixed(2));
  return totalExpenses;
}

function calcUserTotal(id, data) {
  let userTotal = 0;

  const expArr = getArr('exp');
  const userIndex = data.findIndex((u) => u.id === id);
  const userData = data[userIndex];

  for (let expense of userData.expenses) {
    const expIndex = expArr.findIndex((e) => e.id === expense);
    userTotal += expArr[expIndex].amount/expArr[expIndex].participants.length
  }

  // Only show two decimal places for userTotal
  userTotal = parseFloat(userTotal.toFixed(2));
  return userTotal;
}

function closeDialog() {
  reset()
  resultDialog.close();
}