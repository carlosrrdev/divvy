import Alpine from 'alpinejs';
import {capitalizeFirstLetter, nearestHundredth} from "../helpers.ts";

type Member = {
  name: string;
  id: string;
  expenses: string[];
};

type Expense = {
  name: string;
  id: string;
  amount: number;
  memberCount: number;
};

export interface DivvyStore {
  divvyTitle: string;
  divvyId: null | string;
  divvyIsReadyToSave: boolean;
  divvyIsValidForEvenSplit: () => boolean;
  divvyIsValidForDivvyUp: () => boolean;
  divvyMembers: Member[];
  divvyExpenses: Expense[];
  addNewMember: (memberName: string) => void;
  addNewExpense: (expenseName: string, expenseAmount: number) => void;
  addExpenseToMember: (memberId: string, expenseId: string) => void;
  removeMember: (memberId: string) => void;
  removeExpense: (expenseId: string) => void;
  handleAddMemberFormSubmit: (input: HTMLInputElement) => void;
  handleAddExpenseFormSubmit: (
    nameInput: HTMLInputElement,
    valueInput: HTMLInputElement,
  ) => void;
  handleSplitEvenly: () => void;
  toastIsVisible: boolean;
  toastText: string;
  toastTimeoutId: number | null;
  handleShowToast: (text: string) => void;
  showToast: (text: string) => void;
  divvySplitResults: {
    expenseTotal: number;
    splitTotal: number;
  } | null;
}

export const divvyStore: DivvyStore = {
  divvyTitle: "New Divvy",
  divvyId: null,
  divvyIsReadyToSave: false,
  divvyIsValidForEvenSplit: function () {
    return this.divvyExpenses.length > 0 && this.divvyMembers.length > 1;
  },
  divvyIsValidForDivvyUp: function() {
    return this.divvyExpenses.length > 1 && this.divvyMembers.length > 1;
  },
  divvyMembers: [],
  divvyExpenses: [],
  toastIsVisible: false,
  toastText: "",
  toastTimeoutId: null,
  divvySplitResults: null,
  addNewMember(memberName: string) {
    this.divvyMembers.push({
      name: capitalizeFirstLetter(memberName),
      id: crypto.randomUUID(),
      expenses: [],
    });
    this.handleShowToast(
      `${capitalizeFirstLetter(memberName)} was added as a member.`,
    );
  },
  addNewExpense(expenseName: string, expenseAmount: number) {
    this.divvyExpenses.push({
      name: capitalizeFirstLetter(expenseName),
      id: crypto.randomUUID(),
      amount: expenseAmount,
      memberCount: 0,
    });
    this.handleShowToast(
      `${capitalizeFirstLetter(expenseName)} was added as an expense.`,
    );
  },
  addExpenseToMember(memberId: string, expenseId: string) {
    const member = this.divvyMembers.find((member) => member.id === memberId);
    if (member) {
      member.expenses.push(expenseId);
    }
  },
  removeMember(memberId: string) {
    this.divvyMembers = this.divvyMembers.filter(
      (member) => member.id !== memberId,
    );
  },
  removeExpense(expenseId: string) {
    this.divvyExpenses = this.divvyExpenses.filter(
      (expense) => expense.id !== expenseId,
    );
    this.divvyMembers.forEach((member) => {
      member.expenses = member.expenses.filter(
        (expenseId) => expenseId !== expenseId,
      );
    });
  },

  handleAddMemberFormSubmit(input: HTMLInputElement) {
    if (!input.value.trim()) {
      input.value = "";
      input.focus();
      return;
    } else {
      this.addNewMember(input.value.trim());
      input.value = "";
    }
  },
  handleAddExpenseFormSubmit(
    nameInput: HTMLInputElement,
    valueInput: HTMLInputElement,
  ) {
    if (!nameInput.value.trim() || !valueInput.value.trim()) {
      nameInput.value = "";
      valueInput.value = "";
      nameInput.focus();
      return;
    } else {
      this.addNewExpense(
        nameInput.value.trim(),
        Number(valueInput.value.trim()),
      );
      nameInput.value = "";
      valueInput.value = "";
      nameInput.focus();
    }
  },
  handleSplitEvenly() {
    const expenseTotal = this.divvyExpenses.reduce((total, expense) => {
      return total + expense.amount;
    }, 0)
    const splitTotal = nearestHundredth(expenseTotal / this.divvyMembers.length);
    Alpine.store("modalStore").handleSplitResultsModal()
    this.divvySplitResults = {
      expenseTotal,
      splitTotal,
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
      }, 50);
    } else {
      this.showToast(text);
    }
  },
  showToast(text: string) {
    this.toastText = text;
    this.toastIsVisible = true;
    this.toastTimeoutId = setTimeout(() => {
      this.toastIsVisible = false;
    }, 3000);
  },
};
