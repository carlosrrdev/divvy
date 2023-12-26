import {nanoid} from "nanoid";
import {trashIcon} from "../icons.js";
import {addToArr} from "../data.js";
import {createDeleteBtn, createNewRow} from "../utility.js";

const expNameInput = document.getElementById('exp_input');
const expNumInput = document.getElementById('exp_num');
const container = document.getElementById('expenses_container')
const noExpMessage = document.getElementById('no_exp');
const nextStepBtn = document.getElementById('next_step_btn')

/**
 * Add an expense to the list of expenses
 *
 * @param {Event} e - The event object from the event listener
 */
export function addExp(e) {
  e.preventDefault()

  const expName = expNameInput.value.trim();
  const expAmount = parseFloat(expNumInput.value.trim())
  const newExpObj = {id: nanoid(5), name: expName, amount: expAmount}
  const expArr = addToArr("exp", newExpObj)
  if(expArr.length >= 1 ) {
    nextStepBtn.style.display = "block"
  }

  const expLi = createNewRow(expName);
  const amountSpan = document.createElement("span");
  amountSpan.textContent = `$${expAmount}`
  const deleteBtn = createDeleteBtn("exp", newExpObj.id, expLi, 1, noExpMessage);
  expLi.append(amountSpan, deleteBtn)

  container.appendChild(expLi);
  noExpMessage.style.display = 'none';

  expNameInput.value = '';
  expNumInput.value = '';
}