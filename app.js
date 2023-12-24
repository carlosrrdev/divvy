import "./style.css";
import {addPart} from "./src/handlers/addPart.js";
import {loadStep} from "./src/handlers/loadStep.js";

let currentStep = 1;

const addPartForm = document.getElementById("add_part");
const prevStepBtn = document.getElementById('prev_step_btn')
const nextStepBtn = document.getElementById('next_step_btn');

addPartForm.addEventListener('submit', addPart)
nextStepBtn.addEventListener('click', loadStep)

export function getCurrentStep() {
  return currentStep;
}
export function increaseStep() {
  currentStep++;
  return currentStep;
}
export function decreaseStep() {
  currentStep--;
  return currentStep;
}