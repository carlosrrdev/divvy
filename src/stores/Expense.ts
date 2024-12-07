import { create } from "zustand"

type Expense = {
    id: string
    name: string
    amount: number
}

interface ExpenseStore {
    expenses: Expense[]
    addExpense: (expense: Expense) => void
    removeExpense: (id: string) => void
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
    expenses: [],
    addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
    removeExpense: (id) => set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id !== id)
    })),
}))

