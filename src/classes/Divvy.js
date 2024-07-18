import {nanoid} from 'nanoid';
import {capitalizeFirstLetter, roundUpToNearest} from "../util.js";

/**
 * @typedef {Object} Member
 * @property {string} mem_id - Unique 8-digit member ID
 * @property {string} mem_name - User assigned string representing this member
 * @property {Array<{id: string}>} [mem_expenses] - An array of all expense id's assigned to this user
 */

/**
 * @typedef {Object} Expense
 * @property {string} exp_id - Unique 8-digit expense ID
 * @property {string} exp_name - The name assigned to this expense
 * @property {number} exp_amount - Numerical amount for this expense
 * @property {Array<{id: string}>} [exp_members] - The numerical count of members currently paying for this expense
 */

/**
 * @typedef {Object} DivvyObj
 * @property {string} id
 * @property {string} name
 * @property {string} createdAt
 * @property {Array<Member> | Array<*>} members
 * @property {Array<Expense> | Array<*>} expenses
 * @property {boolean} complex
 * @property {boolean} [cloud]
 * @property {boolean} [local]
 * @property {string} [fDate]
 */

export class Divvy {
  /**
   * The Divvy constructor creates a new Divvy object with initial empty arrays for members, expenses
   * and a randomly created name.
   */
  constructor() {
    /** @type {Array<Member>} */
    this.members = []
    /** @type {Array<Expense>} */
    this.expenses = []
    /** @type {string} */
  }

  /**
   * Adds a new member into the members array
   * @param {string} memberName - The name of the new member
   * @return {Member} - The newly created Member object
   */
  addMember(memberName) {
    const newMemberObj = {
      mem_id: nanoid(8),
      mem_name: capitalizeFirstLetter(memberName),
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
}