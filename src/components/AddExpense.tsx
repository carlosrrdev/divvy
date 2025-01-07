import React, {useRef} from 'react'
import {Button} from "@/components/ui/button.tsx";
import {TbCash} from "react-icons/tb";
import {Expense} from "@/types.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogOverlay
} from "@/components/ui/dialog.tsx";
import {useToast} from "@/hooks/use-toast";
import {capitalizeFirstLetter} from "@/helpers.ts";

interface Props {
  setExpense: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const AddExpense: React.FC<Props> = ({setExpense}) => {

  const expenseNameInput = useRef<HTMLInputElement>(null)
  const expenseAmountInput = useRef<HTMLInputElement>(null)
  const {toast} = useToast()

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (expenseNameInput.current && expenseAmountInput.current) {
      const name = expenseNameInput.current.value
      const amount = expenseAmountInput.current.value

      if (name.trim() === "") return;
      const formattedName = capitalizeFirstLetter(name)

      const newMemberObj: Expense = {
        id: crypto.randomUUID(),
        name: formattedName,
        amount: parseFloat(amount),
        memberCount: 0
      }

      setExpense(prev => [...prev, newMemberObj])
      expenseNameInput.current.value = ""
      expenseAmountInput.current.value = ""
      expenseNameInput.current.focus()

      toast({
        title: "New expense added",
        description: `Successfully added ${formattedName} as a new expense`,
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>
          <TbCash/>
          Add expenses
        </Button>
      </DialogTrigger>
      <DialogOverlay className={"bg-black/60"}/>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new expense</DialogTitle>
          <DialogDescription>
            Please provide the name and value of the expense.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col space-y-2" onSubmit={handleAddExpense}>
          <div>
            <Label htmlFor="name">
              Name
            </Label>
            <Input required={true} ref={expenseNameInput} id="name"/>
          </div>
          <div>
            <Label htmlFor="name">
              Amount
            </Label>
            <Input required={true} type={"number"} step={"0.01"} ref={expenseAmountInput} id="amount"/>
          </div>
          <DialogFooter className={"flex gap-y-2"}>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}
