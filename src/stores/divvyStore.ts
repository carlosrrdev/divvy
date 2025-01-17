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
}

export const divvyStore: DivvyStore = {
  divvyTitle: 'New Divvy',
  divvyId: null,
  divvyIsReadyToSave: false,
  divvyIsValidForEvenSplit: false,
  divvyIsValidForDivvyUp: false,
  divvyMembers: [],
  divvyExpenses: [],
  addNewMember(memberName: string) {
    this.divvyMembers.push({
      name: memberName,
      id: crypto.randomUUID(),
      expenses: [],
    });
  },
  addNewExpense(expenseName: string, expenseAmount: number) {
    this.divvyExpenses.push({
      name: expenseName,
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
}
