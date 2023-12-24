import {trashIcon} from "../icons.js";
import {nanoid} from "nanoid";

const inputVal = document.getElementById("part_input");
const container = document.getElementById('participants_container');
const noPartMessage = document.getElementById('no_part')
const nextStepBtn = document.getElementById('next_step_btn')

/**
 * Represents an array to store parts.
 *
 * @type {Array<{id: string, name: string}>}
 */
export let partArr = [];

/**
 * Adds a new participant to the container.
 *
 * @param {Event} e - The event object.
 */
export function addPart(e) {
  e.preventDefault()
  const partName = inputVal.value.trim();
  if(partName === "") return;

  const newPartObj = {id: nanoid(5), name: partName}
  partArr.push(newPartObj);
  if(partArr.length > 1) {
    nextStepBtn.style.display = 'block';
  }

  const newPart = document.createElement('li');
  const deletePartBtn = document.createElement('button');

  deletePartBtn.innerHTML = trashIcon;
  deletePartBtn.setAttribute("type", "button");
  deletePartBtn.classList.add('delete-participant');
  deletePartBtn.addEventListener('click',() => deletePart(newPart, newPartObj.id));

  newPart.textContent = partName;
  newPart.appendChild(deletePartBtn);
  newPart.classList.add('form-list-item')

  container.appendChild(newPart);
  noPartMessage.style.display = 'none';

  inputVal.value = '';
}

/**
 * Deletes a participant from the partArr array and removes the corresponding element from the DOM.
 *
 * @param {Element} parentEl - The parent element containing the part element to be deleted.
 * @param {string} id - The ID of the participant to be deleted.
 */
function deletePart(parentEl, id) {
  partArr = partArr.filter(part => part.id !== id);
  parentEl.remove();

  if(partArr.length < 2) {
    nextStepBtn.style.display = 'none';
  }

  if (partArr.length === 0) {
    noPartMessage.style.display = 'block';
  }
}