import React, {useState, useEffect} from 'react'
import {TbChevronDown, TbChevronRight} from 'react-icons/tb'
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Expense, Member} from "@/types.ts";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {formatDecimal} from "@/helpers.ts";

interface Props {
  disabled?: boolean;
  members: Member[];
  expenses: Expense[];
}

export const SplitDivvy: React.FC<Props> = ({disabled, members, expenses}) => {

  const [total, setTotal] = useState<number>(0)
  const [splitTotal, setSplitTotal] = useState<number>(0)
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)

  useEffect(() => {
    setTotal(expenses.reduce((acc, expense) => acc + expense.amount, 0))
    setSplitTotal(total / members.length)
    setIsDetailsOpen(false)
  }, [members, expenses, total])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Split Evenly</Button>
      </DialogTrigger>
      <DialogOverlay className={"bg-black/60"}/>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Splitting Evenly</DialogTitle>
          <DialogDescription>
            All expenses will be split evenly between all members.
          </DialogDescription>
        </DialogHeader>
        <div className={"flex flex-col"}>
          <h2 className={"text-3xl text-center my-2"}>Split total: ${formatDecimal(splitTotal)}</h2>
          <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen} className={"space-y-2"}>
            <CollapsibleTrigger asChild>
              <Button variant={"outline"} className={"w-full"}>
                <span>{isDetailsOpen? "Hide": "View"} result details</span>
                {isDetailsOpen ? <TbChevronDown/> : <TbChevronRight/>}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className={"space-y-2"}>
              <div className={"flex flex-col space-y-2 bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg"}>
                <p className={"font-bold text-lg"}>Expenses</p>
                <Separator/>
                <ul>
                  {expenses.map(expense => (
                    <li key={expense.id} className={"flex space-x-6 justify-between"}>
                      <span>{expense.name}</span>
                      <span>${expense.amount}</span>
                    </li>
                  ))}
                </ul>
                <p className={"font-bold"}>Total expenses: ${formatDecimal(total)}</p>
              </div>
              <div className={"flex flex-col space-y-2 bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg"}>
                <p className={"font-bold text-lg"}>Members</p>
                <Separator/>
                <ul>
                  {members.map(member => (
                    <li key={member.id} className={"flex space-x-6 justify-between"}>
                      <span>{member.name}</span>
                      <p>
                        <span className={"opacity-50"}>
                        (${formatDecimal(total)} / {members.length}){" "}
                        </span>
                        <span className={"font-bold"}>
                        ${formatDecimal(splitTotal)}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <DialogFooter className={"gap-y-2"}>
          <Button>Save results</Button>
          <DialogClose asChild>
            <Button variant={"outline"}>Go back</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
