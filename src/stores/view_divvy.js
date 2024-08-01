import {roundUpToNearest} from "../util.js";

/** @type {import("/src/classes/SplitDivvy.js").SplitDivvyObj} */

/**
 * TODO type later
 */
export const viewDivvyStore = {
  isModalVisible: false,
  showConfirmDelete: false,
  /** @type {DivvyObj} */
  divvy: {},

  showDivvyModal(data) {
    this.isModalVisible = true;
    this.showConfirmDelete = false;
    this.divvy = data;

    setTimeout(() => {
      document.getElementById('modal_view_divvy').showModal()
    }, 0)
  },

  async deleteDivvy(id) {
    try {
      await Alpine.store("dv_save").deleteSingleDivvy(id)
      this.hideDivvyModal()
      await Alpine.store("dv_save").getSavedData()
    } catch(error) {
      console.error(error)
    }
  },

  hideDivvyModal(){
    this.isModalVisible = false;
  },

  /**
   * Calculate the members expense by adding up the expenses and then dividing by how
   * many members are contributing to this expense
   * @param {string} id
   * @return {number}
   */
  calculateUserExpenses(id) {
    if(this.divvy.members.length >= 1) {
      let userTotal = 0;
      const member = this.divvy.members.find(member => member.mem_id === id);
      member.mem_expenses.forEach(e => {
        const expense = this.divvy.expenses.find(exp => exp.exp_id === e.id)
        userTotal += expense.exp_amount / expense.exp_members.length
      })
      return roundUpToNearest(userTotal)
    }
  },

  /**
   * Returns an array of member names assigned to a particular expense
   * @param {string} exp_id
   * @return {*[] | [string]}
   */
  getExpenseMembers(exp_id) {
    // find the expense using exp_id
    const expense = this.divvy.expenses.find(expense => expense.exp_id === exp_id);
    const members = []

    if(expense.exp_members.length >=1) {
      expense.exp_members.forEach(memObj => {
        const member = this.divvy.members.find(member => member.mem_id === memObj.id);
        members.push(member.mem_name)
      })
      return members;
    }
  },

  /**
   * Returns the split amount based on the expense amount and expense members
   * @param {number} amount
   * @param {Array} expense
   * @return number
   */
  getLocalSplit(amount, expense) {
    return roundUpToNearest(amount/expense.length)
  }
}