import React, {useEffect, useState} from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {HiUsers} from 'react-icons/hi'
import {Button} from "@/components/ui/button.tsx";
import {Expense, Member} from "@/types.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Badge} from "@/components/ui/badge.tsx";

interface Props {
  disabled?: boolean;
  expenses: Expense[];
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const DivvyUp: React.FC<Props> = ({disabled, members, expenses, setMembers, setExpenses}) => {

  const [isValidDivvy, setIsValidDivvy] = useState<boolean>(false)

  useEffect(() => {
    setIsValidDivvy(members.every(member => member.expenses?.length > 0))
  }, [members])

  const toggleExpenseForMember = (memberId: string, expense: Expense) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? {
            ...member,
            expenses: member.expenses?.some((e) => e.id === expense.id)
              ? member.expenses.filter((e) => e.id !== expense.id)
              : [...(member.expenses || []), expense],
          }
          : member
      )
    );
    setExpenses(() =>
      expenses.map((e) =>
        e.id === expense.id
          ? {
            ...e,
            memberCount: memberHasExpense(memberId, expense.id)
              ? e.memberCount - 1
              : e.memberCount + 1,
          }
          : e
      )
    );
  };

  const memberHasExpense = (memberId: string, expenseId: string): boolean | undefined => {
    const member = members.find((m) => m.id === memberId);
    return member?.expenses?.some((e) => e.id === expenseId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Divvy Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Divvy Up!</DialogTitle>
          <DialogDescription>
            Assign expenses to each member.
          </DialogDescription>
        </DialogHeader>
        <div className={"flex flex-col"}>
          <ul className={"flex flex-col space-y-2"}>
            {members.map(member => (
              <li className={"flex justify-between"} key={member.id}>
                <span>{member.name}</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"}>Assign</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <small>Must have at least one expense assigned</small>
                    <ul className={"mt-2 flex flex-col space-y-2"}>
                      {expenses.map(expense => (
                        <li className={"flex items-center space-x-4"} key={expense.id}>
                          <Checkbox checked={member.expenses?.some((e) => e.id === expense.id) ?? false}
                                    onCheckedChange={() => toggleExpenseForMember(member.id, expense)}/>
                          <label className={"flex items-center"} htmlFor={expense.id}>
                            <span>{expense.name}</span>
                            {expense.memberCount > 0 && (
                              <Badge className={"ml-2"}>
                                <HiUsers/>
                                <span>{expense.memberCount}</span>
                              </Badge>
                            )}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter className={"flex gap-y-2"}>
          <Button
            disabled={!isValidDivvy}>{isValidDivvy ? "Calculate results" : "Assign expense to all members..."}</Button>
          <DialogClose asChild>
            <Button variant={"outline"}>Go back</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
