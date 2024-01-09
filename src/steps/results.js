import {store} from "../store.js";
import {userIcon} from "../icons.js";

const resultsList = document.getElementById('results_list')
const resultsInitialMessage = document.getElementById('results_initial_message');

/**
 * Renders the final results.
 * @param {(import("../store.js").Store)} state - The current state object containing user and expense information.
 * @returns {void} - This method does not return any value.
 */
function renderResults(state) {

  if (state.users.length >= 2 && state.expenses.length >= 1) {
    resultsInitialMessage.classList.add("hidden")
    resultsList.innerHTML = "";

    state.expenses.forEach(expense => {
      const expenseElement = document.createElement('li');
      const expenseTitleContainer = document.createElement('div')
      const membersList = document.createElement('ul');
      membersList.className = "ml-2 pl-4 pt-2 border-l border-indigo-200 hidden"
      expenseTitleContainer.className = "flex border-b border-indigo-200 justify-between font-bold"
      expenseTitleContainer.innerHTML = `
      <p>${expense.name}</p>
      <p>$${expense.amount}</p>
      `
      if(expense.members.length >= 1) {
        expense.members.forEach(memberId => {
          membersList.classList.remove('hidden')
          const member = store.getUser(memberId);
          const memberElement = document.createElement('li');
          memberElement.className = "flex items-center gap-x-2"
          memberElement.innerHTML = `
        ${userIcon}
        <span>${member.name}</span>
        `
          membersList.appendChild(memberElement);
        });
      }

      expenseElement.append(expenseTitleContainer, membersList)
      resultsList.appendChild(expenseElement);
    });

  } else {
    resultsInitialMessage.classList.remove("hidden")
    resultsList.innerHTML = '';
  }
}

store.subscribe((state) => renderResults(state))