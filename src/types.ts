export type Member = {
  id: string
  name: string
  expenses?: Expense[]
}

export type Expense = {
  id: string
  name: string
  amount: number
}