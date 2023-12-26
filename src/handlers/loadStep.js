import {getArr} from "../data.js";
import {decreaseStep, getCurrentStep, increaseStep} from "../../app.js";
import {addDel} from "./addDel.js";

const stepMessage = document.getElementById("next_step_text");
const prevStepBtn = document.getElementById('prev_step_btn');
const nextStepBtn = document.getElementById('next_step_btn');

/**
 * Loads the next or previous step based on the dataset action of the event target.
 *
 * @param {Event} e - The event object.
 * @return {void}
 */
export function loadStep(e) {
  switch (e.target.dataset.action) {
    case "next":
      nextStep();
      break;
    case "prev":
      prevStep();
      break;
    default:
      break;
  }
}

/**
 * Progress to next step and update UI accordingly
 */
function nextStep() {
  if(getCurrentStep() === 3) return;

  const currentStep = increaseStep()

  if (currentStep === 2) {
    prevStepBtn.style.display = "block";
    if(getArr("exp").length >= 1) {
      nextStepBtn.style.display = "block";
    } else {
      nextStepBtn.style.display = "none"
    }
    stepMessage.textContent = "Step 2. Add expenses"
    document.getElementById('step_one').style.display = "none";
    document.getElementById('step_two').style.display = "block";
  } else if (currentStep === 3) {
    stepMessage.textContent = "Step 3. Assign expenses"
    nextStepBtn.style.display = "none"
    document.getElementById("step_two").style.display = "none";
    document.getElementById("step_three").style.display = "block"
    addDel()
  }
}

/**
 * Regress to previous step and update UI accordingly
 */
function prevStep() {
  if(getCurrentStep() === 1) return;

  const currentStep = decreaseStep();

  if (currentStep === 1) {
    prevStepBtn.style.display = "none";
    nextStepBtn.style.display = "block";
    stepMessage.textContent = "Step 1. Add participants";
    document.getElementById('step_one').style.display = "block";
    document.getElementById('step_two').style.display = "none";
    console.log(getArr("part"));
  } else if (currentStep === 2) {
    stepMessage.textContent = "Step 2. Add expenses";
    nextStepBtn.style.display = "block";
    nextStepBtn.textContent = "Next";
    document.getElementById("step_two").style.display = "block";
    document.getElementById("step_three").style.display = "none";
    console.log(getArr("part"), getArr("exp"));
  }
}