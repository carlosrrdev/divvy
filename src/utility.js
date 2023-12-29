import {trashIcon} from "./icons.js";
import {clearArrays, updateAndDelete} from "./data.js";

const nextStepBtn = document.getElementById('next_step_btn')

/**
 * Creates a new HTML list item element with the specified name.
 *
 * @param {string} name - The name to be displayed in the list item.
 * @returns {HTMLLIElement} - The newly created list item element.
 */
export function createNewRow(name) {
  const newLi = document.createElement('li');
  newLi.textContent = name;
  newLi.classList.add('form-list-item')

  return newLi;
}

/**
 * Creates a delete button element and attaches a click event listener to it.
 * Upon click, it calls the deleteAndUpdate function with the provided arguments.
 *
 * @param {string} arr - The array to be updated after deletion.
 * @param {string} id - The unique identifier of the item to be deleted.
 * @param {HTMLElement} parent - The parent element where the delete button will be appended.
 * @param {number} min - The minimum value for the delete button.
 * @param {HTMLElement} message - The message to be displayed after deletion.
 * @returns {HTMLButtonElement} - The created delete button element.
 */
export function createDeleteBtn(arr, id, parent, min, message) {
  const deletePartBtn = document.createElement('button');
  deletePartBtn.innerHTML = trashIcon;
  deletePartBtn.setAttribute("type", "button");
  deletePartBtn.addEventListener('click', () => deleteAndUpdate(arr, id, parent, min, message));

  return deletePartBtn;
}

/**
 * Deletes an item from an array and updates the parent element.
 * @param {string} arr - The name of the array to update
 * @param {string} id - The ID of the item to delete.
 * @param {HTMLElement} parent - The parent element to update.
 * @param {number} min - The minimum length of the array required for nextStepBtn to be hidden.
 * @param {HTMLElement} message - The message element to display if the array becomes empty.
 *
 */
function deleteAndUpdate(arr, id, parent, min, message) {
  const currentArr = updateAndDelete(arr, id)
  parent.remove()

  if (currentArr.length < min) {
    nextStepBtn.style.display = "none"
  }

  if (currentArr.length === 0) {
    message.style.display = "block"
  }
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} string - The input string to capitalize the first letter of.
 * @returns {string} - The capitalized string.
 */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function reset() {
  // const step1 = document.getElementById("step_one");
  // const step2 = document.getElementById("step_two");
  // const step3 = document.getElementById("step_three");
  //
  // const partContainer = document.getElementById('participants_container')
  //
  // step1.style.display = "block";
  // step2.style.display = "none";
  // step3.style.display = "none";
  //
  // clearArrays()

  // TODO add methods to reset all data and UI back to original state
  window.location.reload();
}