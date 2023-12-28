import {nanoid} from "nanoid";
import {capitalizeFirstLetter, createDeleteBtn, createNewRow} from "../utility.js";
import {addToArr} from "../data.js";

const inputVal = document.getElementById("part_input");
const container = document.getElementById('participants_container');
const noPartMessage = document.getElementById('no_part')
const nextStepBtn = document.getElementById('next_step_btn')

/**
 * Adds a new participant to the container.
 * @param {Event} e - The event object.
 */
export function addPart(e) {
  e.preventDefault()

  const partName = inputVal.value.trim();
  if (partName === "") return;

  const newPartObj = {id: nanoid(5), name: capitalizeFirstLetter(partName)}
  const partArr = addToArr("part", newPartObj)
  if (partArr.length > 1) {
    nextStepBtn.style.display = 'block';
  }

  const partLi = createNewRow(capitalizeFirstLetter(partName))
  const deleteBtn = createDeleteBtn("part", newPartObj.id, partLi, 2, noPartMessage)
  partLi.appendChild(deleteBtn)

  container.appendChild(partLi);
  noPartMessage.style.display = 'none';
  inputVal.value = '';
}
