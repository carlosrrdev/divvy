import "./style.css";
import "./src/data.js"
import {loadStep} from "./src/handlers/loadStep.js";
import {addPart} from "./src/handlers/addPart.js";
import {addExp} from "./src/handlers/addExp.js";

let currentStep = 1;

const addPartForm = document.getElementById("add_part");
const addExpForm = document.getElementById("add_exp");
const prevStepBtn = document.getElementById('prev_step_btn')
const nextStepBtn = document.getElementById('next_step_btn');

addPartForm.addEventListener('submit', addPart)
addExpForm.addEventListener('submit', addExp);

prevStepBtn.addEventListener('click', loadStep)
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