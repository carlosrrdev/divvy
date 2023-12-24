import {partArr} from "./addPart.js";
import {getCurrentStep, increaseStep} from "../../app.js";

const stepMessage = document.getElementById("next_step_text");
const prevStepBtn = document.getElementById('prev_step_btn');
const nextStepBtn = document.getElementById('next_step_btn');

export function loadStep(e) {
  switch (e.target.dataset.action) {
    case "next":
      nextStep();
      break;
    case "prev":
      break;
    default:
      break;
  }
}

function nextStep() {
  if(getCurrentStep() === 3) return;

  const currentStep = increaseStep()

  if (currentStep === 2) {
    prevStepBtn.style.display = "block";
    stepMessage.textContent = "Step 2. Add expenses"
  } else if (currentStep === 3) {
    stepMessage.textContent = "Step 3. Assign expenses"
    nextStepBtn.textContent = "Finish"
  }
}