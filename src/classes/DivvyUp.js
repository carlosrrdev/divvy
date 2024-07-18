import {Divvy} from "./Divvy.js";
import {nanoid} from "nanoid";
import {capitalizeFirstLetter, roundUpToNearest} from "../util.js";

/**
 * @typedef {Object} DivvyUpObj
 * @property {string} id
 * @property {string} name
 * @property {string} createdAt
 * @property {Array<Member> | Array<*>} members
 * @property {Array<Expense> | Array<*>} expenses
 * @property {number} expenseTotal
 * @property {boolean} complex
 * @property {boolean} [cloud]
 * @property {boolean} [local]
 * @property {string} [fDate]
 */

export class DivvyUp extends Divvy {
  /**
   * DivvyUp constructor creates a complex divvy which can calculate expenses for each
   * individual member
   */
  constructor() {
    super();
    this.divvyName = `dv_up_${nanoid(8)}`
  }

  /**
   * Adds a new member into the members array. This method overrides the parent class Divvy's own
   * addMember method due to the fact that DivvyUp instances also track expenses assigned to each member
   * @param {string} memberName - The name of the new member
   * @return {Member} - The newly created Member object
   */
  addMember(memberName) {
    const newMemberObj = {
      mem_id: nanoid(8),
      mem_name: capitalizeFirstLetter(memberName),
      mem_expenses: []
    }
    this.members.push(newMemberObj);
    return newMemberObj
  }

  /**
   * Adds a new expense to the expenses array. This method overrides parent class Divvy's own
   * addExpense method due to the fact that DivvyUp instances also track members assigned to expenses
   * @param {string} expenseName - The name of the expense.
   * @param {number} expenseAmount - The amount of the expense.
   * @return {Expense} - The newly created expense object.
   */
  addExpense(expenseName, expenseAmount) {
    const newExpenseObj = {
      exp_id: nanoid(8),
      exp_name: capitalizeFirstLetter(expenseName),
      exp_amount: roundUpToNearest(expenseAmount),
      exp_members: []
    }
    this.expenses.push(newExpenseObj);
    return newExpenseObj;
  }

  /**
   * Removes a member from the members array and also remove the members ID from any expenses
   * @param {string} id - The ID of the member to remove.
   */
  removeMember(id) {
    this.members = this.members.filter(member => member.mem_id !== id);
    this.expenses.forEach(expense => {
      expense.exp_members = expense.exp_members.filter(member => member.id !== id);
    });
  }

  removeExpense(id) {
    this.expenses = this.expenses.filter(expense => expense.exp_id !== id);
    this.members.forEach(member => {
      member.mem_expenses = member.mem_expenses.filter(expense => expense.id !== id);
    })
  }

  /**
   * Assigns an expense to a member and also updates the expense members array
   * @param {string} memId
   * @param {string} expId
   */
  assignExpenseToMember(memId, expId) {
    const memberIndex = this.members.findIndex(member => member.mem_id === memId);
    const expenseIndex = this.expenses.findIndex(expense => expense.exp_id === expId);
    this.members[memberIndex].mem_expenses.push({id: expId});
    this.expenses[expenseIndex].exp_members.push({id: memId});
  }

  /**
   * Removes the expense from a member and also updates the expense members array
   * @param memId
   * @param expId
   */
  removeExpenseFromMember(memId, expId) {
    const memberIndex = this.members.findIndex(member => member.mem_id === memId);
    const expenseIndex = this.expenses.findIndex(expense => expense.exp_id === expId);
    this.members[memberIndex].mem_expenses = this.members[memberIndex].mem_expenses.filter(expense => expense.id !== expId);
    this.expenses[expenseIndex].exp_members = this.expenses[expenseIndex].exp_members.filter(member => member.id !== memId);
  }

  /**
   * Calculate the members expense by adding up the expenses and then dividing by how
   * many members are contributing to this expense
   * @param {string} id
   * @return {number}
   */
  calculateUserExpenses(id) {
    let userTotal = 0;
    const member = this.members.find(member => member.mem_id === id);
    member.mem_expenses.forEach(e => {
      const expense = this.expenses.find(exp => exp.exp_id === e.id)
      userTotal += expense.exp_amount / expense.exp_members.length
    })
    return roundUpToNearest(userTotal)
  }
}