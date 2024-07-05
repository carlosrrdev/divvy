import {SplitDivvy} from "../classes/SplitDivvy.js";
import {alertStyleHandler} from "../util.js";

export const splitEvenlyStore = {
  /** @type {import("/src/classes/SplitDivvy.js").SplitDivvy} */
  cd: new SplitDivvy(),

  /** @type {boolean} */
  isAlertVisible: false,

  /** @type {string} */
  alertText: "",

  /** @type {number | null} */
  alertTimeoutId: null,

  /** @type {HTMLElement} */
  alertEl: document.getElementById('split_alert'),

  /** @type {boolean} */
  isLoading: false,

  /** @type {boolean} */
  isDivvyComplete: false,

  /** @type {string} */
  saveBtnText: "Save results",

  /** @type {function():boolean} */
  isResultValid: function () {
    return this.cd.members.length >= 2 && this.cd.expenses.length >= 1;
  },

  /**
   * Adds a new member into the SplitDivvy instance
   * @param {HTMLInputElement} inputEl
   */
  addNewMember(inputEl) {
    if (inputEl.value.trim() === '') {
      this.showAlert("Enter a valid name", true)
      inputEl.value = '';
      inputEl.focus()
      inputEl.parentElement.classList.add('input-error')
      return
    }

    const newMember = this.cd.addMember(inputEl.value.trim())
    this.showAlert(`Added ${newMember.mem_name} to members!`, false)
    inputEl.value = ''
    inputEl.focus()
    inputEl.parentElement.classList.remove('input-error')
  },

  /**
   * Adds a new expense into the SplitDivvy instance
   * @param {HTMLInputElement} inputNameEl
   * @param {HTMLInputElement} inputAmountEl
   */
  addNewExpense(inputNameEl, inputAmountEl) {
    if (inputNameEl.value.trim() === '' || inputAmountEl.value.trim() === '') {
      this.showAlert("Enter a valid name and amount", true)
      inputNameEl.value = '';
      inputNameEl.focus();
      inputNameEl.parentElement.classList.add('input-error');
      return
    }

    if (isNaN(parseFloat(inputAmountEl.value.trim()))) {
      this.showAlert("Amount must a numeric value", true)
      inputAmountEl.value = '';
      inputAmountEl.focus();
      inputAmountEl.parentElement.classList.add('input-error');
    }

    const newExpense = this.cd.addExpense(inputNameEl.value.trim(), parseFloat(inputAmountEl.value.trim()))

    this.showAlert(`Expense ${newExpense.exp_name} to expenses!`, false)
    inputNameEl.value = '';
    inputAmountEl.value = '';
    inputNameEl.parentElement.classList.remove('input-error');
    inputAmountEl.parentElement.classList.remove('input-error');
    inputNameEl.focus();
  },

  /**
   * Creates a new SplitDivvy instance and resets alerts and completion status
   */
  resetAll() {
    this.cd = new SplitDivvy()
    this.isAlertVisible = false;
    this.alertText = "";
    this.saveBtnText = "Save results";
    this.isDivvyComplete = false;
  },

  async saveDivvy(dvName) {
    const modalResults = document.getElementById('modal_results_split');
    this.isLoading = true;
    this.saveBtnText = "Saving...";
    if (modalResults.open) {
      modalResults.close();
    }

    const divvyObj = await this.cd.createDivvyObj(dvName)
    await Alpine.store('dv_save').saveData(divvyObj);
    this.showAlert(`${divvyObj.name} Saved!`, false)

    this.isLoading = false;
    this.isDivvyComplete = true;
    this.saveBtnText = "Saved!";

  },

  /**
   * Shows the alert element and displays the appropriate message
   * @param {string} message
   * @param {boolean} isError
   */
  showAlert(message, isError) {
    if (this.alertTimeoutId) clearTimeout(this.alertTimeoutId);

    alertStyleHandler(isError, this.alertEl)

    this.isAlertVisible = true;
    this.alertText = message;
    this.alertTimeoutId = setTimeout(() => {
      this.isAlertVisible = false;
      this.alertText = "";
    }, 4500);
  },
}