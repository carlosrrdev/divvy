import Alpine from 'alpinejs';
import currency from 'currency.js'
import {capitalizeFirstLetter} from "../helpers.ts";

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

type CalculatedMember = Member & {
  calculatedExpenseTotal: currency;
}

export interface DivvyStore {
  divvyTitle: string;
  divvyId: null | string;
  divvyIsValidForEvenSplit: () => boolean;
  divvyIsValidForDivvyUp: () => boolean;
  divvyUpIsValidForResults: () => boolean;
  divvyMembers: Member[];
  divvyExpenses: Expense[];
  calculatedMembers: CalculatedMember[];
  addNewMember: (memberName: string) => void;
  addNewExpense: (expenseName: string, expenseAmount: number) => void;
  addExpenseToMember: (memberId: string, expenseId: string) => void;
  removeExpenseFromMember: (memberId: string, expenseId: string) => void;
  removeMember: (memberId: string) => void;
  removeExpense: (expenseId: string) => void;
  handleAddMemberFormSubmit: (input: HTMLInputElement) => void;
  handleAddExpenseFormSubmit: (
    nameInput: HTMLInputElement,
    valueInput: HTMLInputElement,
  ) => void;
  handleSplitEvenly: () => void;
  handleDivvyUp: (ref: HTMLElement) => void;
  handleAddRemoveExpense: (status: boolean, memberId: string, expenseId: string) => void;
  toastIsVisible: boolean;
  toastText: string;
  toastTimeoutId: number | null;
  handleShowToast: (text: string) => void;
  showToast: (text: string) => void;
  divvySplitTotal: number | null;
  divvyExpensesTotal: number | null;
  resetDivvy: () => void;
}

export const divvyStore: DivvyStore = {
  divvyTitle: "New Divvy",
  divvyId: null,
  divvyIsValidForEvenSplit: function () {
    return this.divvyExpenses.length > 0 && this.divvyMembers.length > 1;
  },
  divvyIsValidForDivvyUp: function () {
    return this.divvyExpenses.length > 1 && this.divvyMembers.length > 1;
  },
  divvyUpIsValidForResults: function () {
    return this.divvyMembers.every(member => member.expenses.length > 0);
  },
  divvyMembers: [],
  divvyExpenses: [],
  calculatedMembers: [],
  toastIsVisible: false,
  toastText: "",
  toastTimeoutId: null,
  divvySplitTotal: null,
  divvyExpensesTotal: null,
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
      const expense = this.divvyExpenses.find((expense) => expense.id === expenseId);
      if (expense) {
        expense.memberCount++;
      }
    }
  },
  removeExpenseFromMember(memberId: string, expenseId: string) {
    const member = this.divvyMembers.find((member) => member.id === memberId);
    if (member) {
      member.expenses = member.expenses.filter(
        (exId) => exId !== expenseId,
      );
      const expense = this.divvyExpenses.find((expense) => expense.id === expenseId);
      if (expense) {
        expense.memberCount--;
      }
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
        (exId) => exId !== expenseId,
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
      return currency(total).add(expense.amount);
    }, currency(0))
    const splitTotal = currency(expenseTotal).divide(this.divvyMembers.length);
    Alpine.store("modalStore").handleSplitResultsModal()
    this.divvySplitTotal = splitTotal.value;
    this.divvyExpensesTotal = expenseTotal.value;
  },
  handleDivvyUp(ref) {
    this.calculatedMembers = this.divvyMembers.map((member) => {
      return {
        ...member,
        calculatedExpenseTotal: member.expenses.reduce((total, expenseId) => {
          const expense = this.divvyExpenses.find((expense) => expense.id === expenseId);
          if (expense) {
            return currency(expense.amount).divide(expense.memberCount).add(total);
          } else {
            return currency(total);
          }
        }, currency(0)),
      }
    });
    const expenseTotal =  this.divvyExpenses.reduce((total, expense) => {
      return currency(total).add(expense.amount);
    }, currency(0))
    this.divvyExpensesTotal = expenseTotal.value;
    Alpine.store("modalStore").handleDivvyUpResultsModal(ref)
  },
  handleAddRemoveExpense(status, memberId, expenseId) {
    if (status) {
      this.addExpenseToMember(memberId, expenseId);
    } else {
      this.removeExpenseFromMember(memberId, expenseId);
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
  resetDivvy() {
    this.divvyTitle = "New Divvy";
    this.divvyId = null;
    this.divvyMembers = [];
    this.divvyExpenses = [];
    this.calculatedMembers = [];
    this.divvySplitTotal = null;
    this.divvyExpensesTotal = null;
  }
};
