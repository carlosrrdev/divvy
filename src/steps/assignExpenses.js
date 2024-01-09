import {store} from "../store.js";

const step3List = document.getElementById('step_3_list')
const step3InitialMessage = document.getElementById('step_3_initial_message');

/**
 * Renders the list based on the state.
 * @param {(import("../store.js").Store)} state - The current state object containing user and expense information.
 * @returns {void} - This method does not return any value.
 */
function renderList(state) {
  if (state.users.length >= 2 && state.expenses.length >= 1) {
    step3InitialMessage.classList.add("hidden")
    step3List.innerHTML = "";

    state.users.forEach((user) => {
      const liParentEl = document.createElement('li');
      const liTextEl = document.createElement('p');
      const innerExpenses = document.createElement('ul')

      liParentEl.className = "p-4 rounded-sm border border-indigo-200 dark:border-indigo-800"
      liTextEl.className = "text-lg font-bold mb-2"
      innerExpenses.className = "grid grid-cols-2"
      liTextEl.textContent = user.name

      state.expenses.forEach((expense) => {
        const expenseLi = document.createElement('li');
        const expenseLabel = document.createElement('label')
        const expenseCheckbox = document.createElement('input');

        expenseCheckbox.checked = user.expenseIds.includes(expense.id);

        expenseLi.dataset.u_id = user.id;
        expenseLi.dataset.e_id = expense.id;

        expenseCheckbox.type = "checkbox";
        expenseCheckbox.className = "divvy-checkbox peer"
        expenseLi.className = "flex items-center gap-x-2"
        expenseCheckbox.setAttribute("id", `${user.id}_${expense.id}`)
        expenseLabel.setAttribute("for", `${user.id}_${expense.id}`)
        expenseLabel.textContent = expense.name
        expenseLabel.className = "peer-checked:text-indigo-500 dark:peer-checked:text-teal-500"

        expenseCheckbox.addEventListener('change', (e) => checkboxChange(e, expenseLi))

        expenseLi.append(expenseCheckbox, expenseLabel)
        innerExpenses.appendChild(expenseLi);
      })

      liParentEl.append(liTextEl, innerExpenses)
      step3List.appendChild(liParentEl)
    })

  } else {
    step3InitialMessage.classList.remove("hidden")
    step3List.innerHTML = '';
  }
}

/**
 * Handles the change event of a checkbox.
 *
 * @param {Event} e - The change event object.
 * @param {HTMLLIElement} li - The list item element associated with the checkbox.
 *
 * @return {void}
 */
function checkboxChange(e, li) {
  const userId = li.dataset.u_id;
  const expId = li.dataset.e_id;

  store.assignExpense(expId, userId)
}

store.subscribe((state) => renderList(state))