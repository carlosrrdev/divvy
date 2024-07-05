import {nanoid} from 'nanoid';
import {capitalizeFirstLetter, roundUpToNearest} from "../util.js";
import {Timestamp} from 'firebase/firestore'

/**
 * @typedef {Object} Member
 * @property {string} mem_id - Unique 8-digit member ID
 * @property {string} mem_name - User assigned string representing this member
 */

/**
 * @typedef {Object} Expense
 * @property {string} exp_id - Unique 8-digit expense ID
 * @property {string} exp_name - The name assigned to this expense
 * @property {number} exp_amount - Numerical amount for this expense
 */

/**
 * A Split-Divvy simply splits the total expenses evenly between all members
 */

export class SplitDivvy {
  constructor() {
    /** @type {Array<Member>} */
    this.members = []
    /** @type {Array<Expense>} */
    this.expenses = []
    /** @type {string} */
    this.divvyName = `dv_split_${nanoid(8)}`
  }

  /**
   * Adds a new member into the members array
   * @param {string} memberName - The name of the new member
   * @return {Member} - The newly created Member object
   */
  addMember(memberName) {
    const newMemberObj = {
      mem_id: nanoid(8),
      mem_name: capitalizeFirstLetter(memberName)
    }
    this.members.push(newMemberObj);
    return newMemberObj
  }

  /**
   * Removes a member from the list of members.
   * @param {string} id - The ID of the member to remove.
   * @return {void}
   */
  removeMember(id) {
    this.members = this.members.filter(member => member.mem_id !== id);
  }

  /**
   * Resets the members of the class to an empty array.
   * @return {void}
   */
  resetMembers() {
    this.members = [];
  }

  /**
   * Adds a new expense to the expenses array.
   * @param {string} expenseName - The name of the expense.
   * @param {number} expenseAmount - The amount of the expense.
   * @return {Expense} - The newly created expense object.
   */
  addExpense(expenseName, expenseAmount) {
    const newExpenseObj = {
      exp_id: nanoid(8),
      exp_name: capitalizeFirstLetter(expenseName),
      exp_amount: roundUpToNearest(expenseAmount),
    }
    this.expenses.push(newExpenseObj);
    return newExpenseObj;
  }

  /**
   * Removes an expense from the list of expenses.
   * @param {string} id - The ID of the expense to be removed.
   * @return {void}
   */
  removeExpense(id) {
    this.expenses = this.expenses.filter(expense => expense.exp_id !== id);
  }

  /**
   * Resets the expenses array.
   * @return {void}
   */
  resetExpenses() {
    this.expenses = [];
  }

  /**
   * Creates the Divvy object that will be sent to local storage and Firebase for saving
   * @param {string} dvName
   * @return {Promise<{createdAt: string, members: string[], complex: boolean, name: string, id: string, expenses: {expAmount: number, expName: string, id: string, expMemCount: null | number}[]}>}
   */
  async createDivvyObj(dvName) {
    if (dvName.trim() !== '') this.divvyName = dvName;
    return  {
      id: nanoid(12),
      name: dvName,
      createdAt: Timestamp.now().toDate().toISOString(),
      members: this.members.map(member => member.mem_name),
      expenses: this.expenses.map(expense => {
        return {
          id: expense.exp_id,
          expName: expense.exp_name,
          expAmount: expense.exp_amount,
          expMemCount: null
        }
      }),
      complex: false
    }
  }

  /**
   * Calculates the total expenses.
   * @return {number} The total expenses.
   */
  calcExpTotal() {
    let total = 0;
    this.expenses.forEach(expense => {
      total += expense.exp_amount;
    });
    return roundUpToNearest(total);
  }

  /**
   * Calculates the split total for expenses.
   * @return {number} The split total amount.
   */
  calcSplitTotal() {
    let splitTotal = this.calcExpTotal() / this.members.length;
    return roundUpToNearest(splitTotal);
  }
}