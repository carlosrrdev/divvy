import {store} from "./store.js";
import {trashIcon} from "./icons.js"
import {nanoid} from "nanoid/non-secure";
import {capitalizeFirstLetter} from "./util.js";

const step1Form = document.getElementById('step_1_form');
const userNameInput = document.getElementById('user_name_input');
const step1List = document.getElementById('step_1_list');

step1Form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(userNameInput.value.trim() === "") return;
  const userName = capitalizeFirstLetter(userNameInput.value.trim())

  const user = store.addUser({id: nanoid(15), name: userName, expenseIds: []});

  userNameInput.value = '';
  userNameInput.focus();

  addLiElement(userName, user)
})

/**
 * Adds a new list item element to the step1List.
 *
 * @param {string} username - The username to be displayed in the list item.
 * @param {object} user - The user object associated with the list item.
 * @return {void}
 */
function addLiElement(username, user) {
  const liEl = document.createElement('li');
  const spanEl = document.createElement('span')
  const delBtn = document.createElement('button')

  spanEl.textContent = username;
  delBtn.setAttribute("type", "button");
  delBtn.innerHTML = trashIcon;
  delBtn.addEventListener("click", () => deleteEl(liEl, user.id))

  liEl.className = "divvy-li"
  liEl.append(spanEl, delBtn)
  step1List.appendChild(liEl);
}

/**
 * Deletes an element from the DOM and removes a user from the store.
 *
 * @param {HTMLElement} parent - The parent element containing the element to delete.
 * @param {string} userId - The ID of the user to remove from the store.
 *
 * @return {void}
 */
function deleteEl(parent, userId) {
  store.removeUser(userId)
  parent.remove();
}