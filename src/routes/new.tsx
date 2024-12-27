import React from 'react'
import {TbUserPlus, TbCash} from 'react-icons/tb'
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table.tsx";
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

export const NewDivvyRoute: React.FC = () => {
  return (
    <div className={"w-full grid grid-rows-[auto_auto_1fr_auto] gap-y-4"}>
      <section>
        <Label htmlFor={"divvy-title"}>New Divvy</Label>
        <Input type={"text"} id={"divvy-title"}/>
      </section>
      <section className={"grid grid-cols-2 my-4 gap-x-4"}>
        <Button size={"lg"}>
          <TbUserPlus/>
          Add members
        </Button>
        <Button size={"lg"}>
          <TbCash/>
          Add expenses
        </Button>
      </section>
      <section>
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
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>Name</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   <TableRow>
                     <TableCell>John</TableCell>
                   </TableRow>
                 </TableBody>
               </Table>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John</TableCell>
                      <TableCell>100</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
      <section className={"grid grid-cols-2 gap-x-4 gap-y-2"}>
        <Button disabled={true}>Split Evenly</Button>
        <Button disabled={true}>Divvy Up!</Button>
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
