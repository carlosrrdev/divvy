import React, {useState, useEffect} from 'react'
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Member, Expense} from "@/types.ts";
import {AddMember} from "@/components/AddMember.tsx";
import {AddExpense} from "@/components/AddExpense.tsx";
import {MembersTable} from "@/components/MembersTable.tsx";
import {ExpensesTable} from "@/components/ExpensesTable.tsx";
import {SplitDivvy} from "@/components/SplitDivvy.tsx";

export const NewDivvyRoute: React.FC = () => {

  const [divvyTitle, setDivvyTitle] = useState<string>("My New Divvy")
  const [members, setMembers] = useState<Member[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isSplitValid, setIsSplitValid] = useState<boolean>(false)
  const [isDivvyValid, setIsDivvyValid] = useState<boolean>(false)

  useEffect(() => {
    if (members.length >= 2 && expenses.length > 0) {
      setIsSplitValid(true)
    } else {
      setIsSplitValid(false)
    }
  }, [members, expenses])

  useEffect(() => {
    if (members.length >= 2 && expenses.length >= 2) {
      setIsDivvyValid(true)
    } else {
      setIsDivvyValid(false)
    }
  }, [members, expenses])

  return (
    <div className={"w-full max-w-screen-lg mx-auto grid grid-rows-[auto_auto_1fr_auto] gap-y-4"}>
      <section>
        <Label htmlFor={"divvy-title"}>Divvy Title</Label>
        <Input type={"text"} id={"divvy-title"} autoFocus={true} value={divvyTitle}
               onChange={(e) => setDivvyTitle(e.target.value)}/>
      </section>
      <section className={"grid grid-cols-2 my-4 gap-x-4"}>
        <AddMember setMember={setMembers}/>
        <AddExpense setExpense={setExpenses}/>
      </section>
      <section className={"lg:hidden"}>
        <Tabs className={"h-full grid grid-rows-[auto_1fr]"} defaultValue="members">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <TabsContent className={"mt-0"} value="members">
            <Card className={"h-full"}>
              <CardHeader>
                <CardDescription>
                  List of all participating members.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <MembersTable members={members} setMembers={setMembers}/>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent className={"mt-0"} value="expenses">
            <Card className={"h-full"}>
              <CardHeader>
                <CardDescription>
                  List of expenses to be paid
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ExpensesTable expenses={expenses} setExpenses={setExpenses}/>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
      <section className={"hidden lg:grid lg:grid-cols-2 gap-x-4"}>
        <MembersTable members={members} setMembers={setMembers}/>
        <ExpensesTable expenses={expenses} setExpenses={setExpenses}/>
      </section>
      <section className={"grid grid-cols-2 gap-x-4 gap-y-2"}>
        <SplitDivvy expenses={expenses} members={members} disabled={!isSplitValid} />
        <Button disabled={!isDivvyValid}>Divvy Up!</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className={"col-span-2"} variant="outline">Which do I pick?</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Two types of Divvies</AlertDialogTitle>
              <AlertDialogDescription>
                After adding members and expenses, you can choose between splitting all
                expenses evenly or divvying up the expenses on a per-member basis.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Got it!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  )
}
