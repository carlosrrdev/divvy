import {store} from "./store.js";

const currentStepHeading = document.getElementById('divvy-current-step');
const currentStepSubHeading = document.getElementById('divvy-current-step-sub');
const nextStepBtn = document.getElementById('next_step_btn');
const prevStepBtn = document.getElementById('prev_step_btn');

const step1Container = document.getElementById('step_1');
const step2Container = document.getElementById('step_2');
const step3Container = document.getElementById('step_3');
const resultsContainer = document.getElementById('results')

nextStepBtn.addEventListener('click', () => store.nextStep());
prevStepBtn.addEventListener('click', () => store.prevStep());

const stepsContainerArray = [step1Container, step2Container, step3Container, resultsContainer];
const stepsHeadingArray = [
  "Step 1. Add users",
  "Step 2. Add expenses",
  "Step 3. Assign expenses",
  "Results"
];
const stepsSubHeadingArray = [
  "Start by adding participating members",
  "Expenses and their amounts",
  "Who is paying for what?",
  ""
];

/**
 * Updates the UI to reflect the current step of the application.
 *
 * @param {import("./store.js").Store} state - The state object containing the current step information.
 */
function updateStepUI(state) {
  stepsContainerArray.forEach((stepContainer, index) => {
    stepContainer.className = (state.step === index + 1) ? "block" : "hidden";
  });

  if (state.step >= 1 && state.step <= 4) {
    currentStepHeading.textContent = stepsHeadingArray[state.step - 1];
    currentStepSubHeading.textContent = stepsSubHeadingArray[state.step - 1];
  }
}

store.subscribe((state) => updateStepUI(state))