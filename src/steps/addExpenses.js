import {store} from "../store.js";
import {trashIcon} from "../icons.js"
import {nanoid} from "nanoid/non-secure";
import {capitalizeFirstLetter} from "../util.js";

const step2Form = document.getElementById('step_2_form');
const expNameInput = document.getElementById('expense_name_input');
const expAmountInput = document.getElementById('expense_amount_input')
const step1List = document.getElementById('step_2_list');

step2Form.addEventListener("submit", (e) => {
  e.preventDefault()
  if(expNameInput.value.trim() === "") return;
  if(expAmountInput.value.trim() === "") return;
  if(!parseFloat(expAmountInput.value)) return;

  const expName = capitalizeFirstLetter(expNameInput.value.trim())
  const expAmount = parseFloat(expAmountInput.value.trim())

  const expense = store.addExpense({id: nanoid(15), name: expName, amount: expAmount, members:[]})

  expNameInput.value = "";
  expAmountInput.value = ""
  expNameInput.focus()

  addLiElement(expense)
})

/**
 * Adds a new list item element to the step1List.
 *
 * @param {(import("../store.js").Expense)} expense - The username to be displayed in the list item.
 * @return {void}
 */
function addLiElement(expense) {
  const liEl = document.createElement('li');
  const spanNameEl = document.createElement('span')
  const spanAmountEl = document.createElement('span');
  const delBtn = document.createElement('button')

  spanNameEl.textContent = expense.name;
  spanAmountEl.textContent = `$${expense.amount}`;
  delBtn.setAttribute("type", "button");
  delBtn.innerHTML = trashIcon;
  delBtn.addEventListener("click", () => deleteEl(liEl, expense.id))

  liEl.className = "divvy-li-grid"
  liEl.append(spanNameEl, spanAmountEl, delBtn)
  step1List.appendChild(liEl);
}

/**
 * Deletes an element from the DOM and removes a user from the store.
 *
 * @param {HTMLElement} parent - The parent element containing the element to delete.
 * @param {string} expenseId - The ID of the user to remove from the store.
 *
 * @return {void}
 */
function deleteEl(parent, expenseId) {
  store.removeExpense(expenseId)
  parent.remove();
}