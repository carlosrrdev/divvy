import React from 'react'
import {Expense} from "@/types.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {TbTrash} from "react-icons/tb";

interface Props {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const ExpensesTable: React.FC<Props> = ({expenses, setExpenses}) => {

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map(expense => (
          <TableRow key={expense.id}>
            <TableCell>{expense.name}</TableCell>
            <TableCell>${expense.amount}</TableCell>
            <TableCell className={"flex justify-end"}>
              <Button onClick={() => handleRemoveExpense(expense.id)} size={"icon"}>
                <TbTrash/>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
