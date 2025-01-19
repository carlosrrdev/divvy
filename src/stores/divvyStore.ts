import {capitalizeFirstLetter} from "../helpers.ts";

type Member = {
  name: string;
  id: string;
  expenses: string[];
}

type Expense = {
  name: string;
  id: string;
  amount: number;
}

interface DivvyStore {
  divvyTitle: string;
  divvyId: null | string;
  divvyIsReadyToSave: boolean;
  divvyIsValidForEvenSplit: boolean;
  divvyIsValidForDivvyUp: boolean;
  divvyMembers: Member[];
  divvyExpenses: Expense[];
  addNewMember: (memberName: string) => void;
  addNewExpense: (expenseName: string, expenseAmount: number) => void;
  addExpenseToMember: (memberId: string, expenseId: string) => void;
  removeMember: (memberId: string) => void;
  removeExpense: (expenseId: string) => void;
  handleAddMemberFormSubmit: (input: HTMLInputElement) => void;
  toastIsVisible: boolean;
  toastText: string;
  toastTimeoutId: number | null;
  handleShowToast: (text: string) => void;
  showToast: (text: string) => void;
}

export const divvyStore: DivvyStore = {
  divvyTitle: 'New Divvy',
  divvyId: null,
  divvyIsReadyToSave: false,
  divvyIsValidForEvenSplit: false,
  divvyIsValidForDivvyUp: false,
  divvyMembers: [],
  divvyExpenses: [],
  toastIsVisible: false,
  toastText: "",
  toastTimeoutId: null,
  addNewMember(memberName: string) {
    this.divvyMembers.push({
      name: capitalizeFirstLetter(memberName),
      id: crypto.randomUUID(),
      expenses: [],
    });
    this.handleShowToast(`${capitalizeFirstLetter(memberName)} was added as a member.`)
    console.log(this.divvyMembers);
  },
  addNewExpense(expenseName: string, expenseAmount: number) {
    this.divvyExpenses.push({
      name: capitalizeFirstLetter(expenseName),
      id: crypto.randomUUID(),
      amount: expenseAmount,
    });
  },
  addExpenseToMember(memberId: string, expenseId: string) {
    const member = this.divvyMembers.find((member) => member.id === memberId);
    if (member) {
      member.expenses.push(expenseId);
    }
  },
  removeMember(memberId: string) {
    this.divvyMembers = this.divvyMembers.filter((member) => member.id !== memberId);
  },
  removeExpense(expenseId: string) {
    this.divvyExpenses = this.divvyExpenses.filter((expense) => expense.id !== expenseId);
    this.divvyMembers.forEach((member) => {
      member.expenses = member.expenses.filter((expenseId) => expenseId !== expenseId);
    });
  },

  handleAddMemberFormSubmit(input: HTMLInputElement) {
    if (!input.value.trim()) {
      input.value = '';
      input.focus();
      return;
    } else {
      this.addNewMember(input.value.trim());
      input.value = '';
    }
  },
  handleShowToast(text: string) {
    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
      this.toastTimeoutId = null;
    }
    if (this.toastIsVisible) {
      this.toastIsVisible = false;
      setTimeout(() => {
        this.showToast(text);
      }, 50)
    } else {
      this.showToast(text);
    }
  },
  showToast(text: string) {
    this.toastText = text;
    this.toastIsVisible = true;
    this.toastTimeoutId = setTimeout(() => {
      this.toastIsVisible = false;
    }, 3000)
  }
}
