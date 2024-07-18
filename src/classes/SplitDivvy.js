import {nanoid} from 'nanoid';
import {Timestamp} from 'firebase/firestore'
import {Divvy} from "./Divvy.js";
import {roundUpToNearest} from "../util.js";

/**
 * @typedef {Object} SplitDivvyObj
 * @property {string} id
 * @property {string} name
 * @property {string} createdAt
 * @property {Array<Member> | Array<*>} members
 * @property {Array<Expense> | Array<*>} expenses
 * @property {number} expenseTotal
 * @property {number} expenseSplit
 * @property {boolean} complex
 * @property {boolean} [cloud]
 * @property {boolean} [local]
 * @property {string} [fDate]
 */

export class SplitDivvy extends Divvy {
  /**
   * The SplitDivvy constructor creates a "simple" divvy in which all expenses are divided evenly between all
   * members.
   */
  constructor() {
    super();
    this.divvyName = `dv_split_${nanoid(8)}`
  }

  /**
   * Creates the Divvy object that will be sent to local storage and Firebase for saving
   * @param {string} dvName
   * @return {Promise<SplitDivvyObj>}
   */
  async createDivvyObj(dvName) {
    if (dvName.trim() !== '') this.divvyName = dvName;
    return  {
      id: nanoid(12),
      name: dvName,
      createdAt: Timestamp.now().toDate().toISOString(),
      members: this.members,
      expenses: this.expenses,
      expenseTotal: this.calcExpTotal(),
      expenseSplit: this.calcSplitTotal(),
      complex: false
    }
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