/**
 * Defines the User type. All users must have an id, name, and array of expense id's
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {Array.<string>} expenseIds
 */

/**
 * Defines Expense type. Each expense must contain an id, name, and members.
 * Members is an array of user id's
 * @typedef {Object} Expense
 * @property {string} id
 * @property {string} name
 * @property {Array.<string>} members
 */

/**
 * State store
 * @typedef {{users: Array.<User>, expenses: Array.<Expense>, step: number}} Store
 * @global
 */

export const store = {
  /**
   * Contains all data for users and expenses
   * @private
   * @type {Store}
   */
  _state: {
    users: [],
    expenses: [],
    step: 1
  },

  /**
   * An array to store event listeners.
   * @type {Array.<Function>}
   * @private
   */
  _listeners: [],

  /**
   * Retrieves the current state of the object.
   * @returns {Object} The state object.
   */
  get state() {
    return this._state;
  },

  /**
   * Sets the state of the object.
   * @param {any} newState - The new state to be set.
   */
  set state(newState) {
    this._state = newState;
    this._listeners.forEach(listener => listener(newState));
  },

  /**
   * Subscribes a listener to the event.
   * @param {Function} listener - The listener function to be subscribed.
   */
  subscribe(listener) {
    this._listeners.push(listener)
  },

  /**
   * Updates the state object with new values.
   * @param {Object} newState - The new state values to be merged with the existing state.
   */
  setState(newState) {
    this.state = {...this.state, ...newState}
  },

  /**
   * Add a new user to the state.
   *
   * @param {User} data - The user data to be added.
   */
  addUser(data) {
    this.setState({users: [...this.state.users, data]})
  },

  /**
   * Removes a user from the state based on the given id.
   *
   * @param {string} id - The id of the user to be removed.
   *
   * @return {void}
   */
  removeUser(id) {
    this.setState({users: this.state.users.filter(user => user.id !== id)})
  },

  /**
   * Advances the current step and returns the new step number.
   *
   * @returns {number} The new step number.
   */
  nextStep() {
    if(this._state.step < 4) {
      this.setState({step: this.state.step + 1});
    }
    return this._state.step;
  },

  /**
   * Decrements the step value and returns the updated step value.
   *
   * @returns {number} - The updated step value.
   */
  prevStep() {
    if(this._state.step > 1) {
      this.setState({step: this.state.step - 1});
    }
    return this._state.step
  }
}