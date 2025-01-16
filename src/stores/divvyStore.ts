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
}

export const divvyStore: DivvyStore = {
  divvyTitle: 'New Divvy',
  divvyId: null,
  divvyIsReadyToSave: false,
  divvyIsValidForEvenSplit: false,
  divvyIsValidForDivvyUp: false,
  divvyMembers: [],
  divvyExpenses: [],
}