import React, {useEffect, useState, useCallback} from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Expense, Member} from "@/types.ts";
import {formatDecimal, chartColors} from "@/helpers.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {TbChevronDown, TbChevronRight} from "react-icons/tb";
import {Separator} from "@/components/ui/separator.tsx";
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegendContent, ChartLegend} from "@/components/ui/chart"
import {PieChart, Pie, Cell} from "recharts";

interface Props {
  isChildModalOpen: boolean;
  setIsChildModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleGoBack: () => void;
  members: Member[];
  expenses: Expense[];
}

interface CalculatedMember extends Member {
  divvyAmount: number;
  chartColor: string;
}

export const CalcResults: React.FC<Props> = ({
                                               isChildModalOpen,
                                               setIsChildModalOpen,
                                               handleGoBack,
                                               members,
                                               expenses
                                             }) => {

  const [total, setTotal] = useState<number>(0)
  const [calculatedMembers, setCalculatedMembers] = useState<CalculatedMember[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)
  const [chartConfig, setChartConfig] = useState<ChartConfig>({})

  const calcUsersExpenses = useCallback(
    (member: Member) => {
      return member.expenses.reduce((total, expense) => {
        const updatedExpense = expenses.find((e) => e.id === expense.id);
        if (updatedExpense && updatedExpense.memberCount > 0) {
          if (updatedExpense.memberCount > 0) {
            return total + updatedExpense.amount / updatedExpense.memberCount;
          }
          return total + updatedExpense.amount;
        }
        return total;
      }, 0);
    },
    [expenses]
  );

  useEffect(() => {
    setTotal(expenses.reduce((acc, expense) => acc + expense.amount, 0))
    setCalculatedMembers(members.map((member, index) => {
      return {
        ...member,
        divvyAmount: formatDecimal(calcUsersExpenses(member)),
        chartColor: chartColors[index % chartColors.length]
      }
    }))
    const dynamicConfig: ChartConfig = calculatedMembers.reduce((config, member) => {
      return {
        ...config,
        [member.name]: {
          label: member.name,
          color: member.chartColor
        }
      }
    }, {})
    setChartConfig(dynamicConfig)
  }, [calcUsersExpenses, expenses, members])


  return (
    <Dialog open={isChildModalOpen} onOpenChange={setIsChildModalOpen}>
      <DialogOverlay className={"bg-transparent"}/>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
          <DialogDescription>
            &#127881; All expenses have been divvied up!
          </DialogDescription>
        </DialogHeader>
        <div className={"flex flex-col space-y-2"}>
          <div>
            <h2 className={"font-bold text-lg"}>Expenses total</h2>
            <h3 className={"text-2xl"}>${formatDecimal(total)}</h3>
          </div>
          <Separator/>
          <ul className={"flex flex-col gap-2"}>
            {calculatedMembers.map(member => (
              <li
                className={"flex items-center justify-between"}
                key={member.id}>
                <span>{member.name}</span>
                <div>
                  <span className={"font-bold mr-2"}>${member.divvyAmount}</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size={"sm"} variant={"outline"}>Details</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <p>{member.name} is contributing to...</p>
                      <ul className={"mt-4 flex flex-wrap gap-2"}>
                        {member.expenses.map(expense => (
                          <li key={expense.id}>
                            <Badge variant={"outline"}>{expense.name}</Badge>
                          </li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>
              </li>
            ))}
          </ul>
          <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen} className={"space-y-2"}>
            <CollapsibleTrigger asChild>
              <Button variant={"outline"} className={"w-full"}>
                <span>{isDetailsOpen? "Hide": "View"} result details</span>
                {isDetailsOpen ? <TbChevronDown/> : <TbChevronRight/>}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
             <h3 className={"mt-6 text-center font-bold"}>Contribution chart</h3>
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel={true}/>} />
                  <Pie data={calculatedMembers} dataKey={"divvyAmount"} nameKey={"name"} innerRadius={50}>
                    {calculatedMembers.map((member) => (
                      <Cell key={member.id} fill={member.chartColor} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent/>}/>
                </PieChart>
              </ChartContainer>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <DialogFooter className={"flex gap-y-2"}>
          <Button>Save results</Button>
          <DialogClose asChild>
            <Button onClick={handleGoBack} variant={"outline"}>Go back</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
