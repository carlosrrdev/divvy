import React, { useRef, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Dialog,
  Flex, ScrollArea,
  SegmentedControl,
  Separator, Table,
  Tabs,
  Text,
  TextField,
  IconButton,
} from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import toast, { Toaster } from "react-hot-toast"
import { useMemberStore } from "../stores/Member.ts";
import { useExpenseStore } from "../stores/Expense.ts";

export const NewDivvy: React.FC = () => {
  const [isComplexDivvy, setIsComplexDivvy] = useState<boolean>(false);
  const memberNameInputRef = useRef<HTMLInputElement>(null)
  const expenseNameInputRef = useRef<HTMLInputElement>(null)
  const expenseAmountInputRef = useRef<HTMLInputElement>(null)

  const { members, addMember, removeMember } = useMemberStore()
  const { expenses, addExpense, removeExpense } = useExpenseStore()

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    const name = memberNameInputRef.current?.value.trim()
    if (name) {
      const newMemberObj = {
        id: crypto.randomUUID(),
        name: name,
      }
      addMember(newMemberObj)
      toast.success(`${name} added!`)
    } else {
      toast.error("Member name cannot be empty")
    }
    if (memberNameInputRef.current) {
      memberNameInputRef.current.value = ""
    }
  }

  const handleRemoveMember = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    removeMember(id)
  }

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    const name = expenseNameInputRef.current?.value.trim()
    const amount = parseFloat(expenseAmountInputRef.current?.value.trim() || "0")
    if (name && amount) {
      const newExpenseObj = {
        id: crypto.randomUUID(),
        name: name,
        amount: amount,
      }
      addExpense(newExpenseObj)
      expenseNameInputRef.current?.focus()
      toast.success(`${name} added!`)
    } else {
      toast.error("Expense name and amount cannot be empty")
    }
    if (expenseNameInputRef.current) {
      expenseNameInputRef.current.value = ""
    }
    if (expenseAmountInputRef.current) {
      expenseAmountInputRef.current.value = ""
    }
  }

  const handleRemoveExpense = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    removeExpense(id)
  }

  return (
    <Flex height={"100%"} justify={"center"} align={"center"}>
      <Container>
        <form style={{ maxWidth: "var(--container-1)", margin: "auto" }}>
          <Flex direction={"column"} gap={"2"}>
            <label style={{ fontSize: "var(--font-size-2)" }}>
              Divvy name
              <TextField.Root size={"3"} required={true} placeholder={"Enter name"} />
            </label>
            <Flex direction={"column"} gap={"2"}>
              <Text size={"2"}>Select divvy type</Text>
              <SegmentedControl.Root defaultValue={"simple"}>
                <SegmentedControl.Item onClick={() => setIsComplexDivvy(false)}
                  value={"simple"}>Simple</SegmentedControl.Item>
                <SegmentedControl.Item onClick={() => setIsComplexDivvy(true)}
                  value={"complex"}>Complex</SegmentedControl.Item>
              </SegmentedControl.Root>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button type={"button"} variant={"ghost"}>
                    <Text>What's the difference?</Text>
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content maxWidth={"580px"}>
                  <Dialog.Title>Divvy types</Dialog.Title>
                  <Dialog.Description size={"2"} mb={"4"}>
                    Divvy types are used to determine how expenses are split between party members.
                  </Dialog.Description>
                  <Flex direction={"column"} gap={"4"}>
                    <Flex direction={"column"} gap={"1"}>
                      <Text weight={"bold"} size={"4"}>Simple</Text>
                      <Text size={"2"}>A simple divvy is one where all expenses are split evenly between all party
                        members</Text>
                    </Flex>
                    <Flex direction={"column"} gap={"1"}>
                      <Text weight={"bold"} size={"4"}>Complex</Text>
                      <Text size={"2"}>A complex divvy allows you to manually assign individual expenses to each party
                        member</Text>
                    </Flex>
                    <Dialog.Close>
                      <Button type={"button"} size={{ initial: "2", md: "3" }}>I got it!</Button>
                    </Dialog.Close>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root>
            </Flex>
            <Separator size={"4"} my={"4"} />
            <Flex direction={{ initial: "column", md: "row" }} gap={"2"}>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button type={"button"} variant={"surface"}>
                    <Text>Add member</Text>
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content maxWidth={"450px"}>
                  <Dialog.Title>Add new party member</Dialog.Title>
                  <Dialog.Description size={"2"} mb={"4"}>Please provide the name of new member</Dialog.Description>
                  <form onSubmit={handleAddMember}>
                    <Flex direction={"column"} gap={"2"}>
                      <TextField.Root ref={memberNameInputRef} required={true} size={"2"} placeholder={"Enter name"} />
                      <Button type={"submit"} variant={"surface"}>Add new member</Button>
                    </Flex>
                  </form>
                  <Flex>
                    <Dialog.Close style={{ marginTop: "var(--space-4)", marginLeft: "auto" }}>
                      <Button type={"button"}>Close</Button>
                    </Dialog.Close>
                  </Flex>
                  <Toaster toastOptions={{
                    style: {
                      borderRadius: "var(--radius-4)",
                      padding: "var(--space-3)",
                      fontSize: "var(--font-size-2)",
                    }
                  }} />
                </Dialog.Content>
              </Dialog.Root>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button type={"button"} variant={"surface"}>
                    <Text>Add expense</Text>
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content maxWidth={"450px"}>
                  <Dialog.Title>Add new expense</Dialog.Title>
                  <Dialog.Description size={"2"} mb={"4"}>Please provide a name and value for this
                    expense</Dialog.Description>
                  <form onSubmit={handleAddExpense}>
                    <Flex direction={"column"} gap={"2"}>
                      <TextField.Root ref={expenseNameInputRef} required={true} size={"2"} placeholder={"Enter name"} />
                      <TextField.Root ref={expenseAmountInputRef} step={"0.01"} type={"number"} required={true} size={"2"} placeholder={"0.00"} />
                      <Button type={"submit"} variant={"surface"}>Add new expense</Button>
                    </Flex>
                  </form>
                  <Flex>
                    <Dialog.Close style={{ marginTop: "var(--space-4)", marginLeft: "auto" }}>
                      <Button type={"button"}>Close</Button>
                    </Dialog.Close>
                  </Flex>
                  <Toaster toastOptions={{
                    style: {
                      borderRadius: "var(--radius-4)",
                      padding: "var(--space-3)",
                      fontSize: "var(--font-size-2)",
                    }
                  }} />
                </Dialog.Content>
              </Dialog.Root>
            </Flex>
            <Separator size={"4"} my={"4"} />
            <Tabs.Root defaultValue={"members"}>
              <Tabs.List>
                <Tabs.Trigger value={"members"}>Members</Tabs.Trigger>
                <Tabs.Trigger value={"expenses"}>Expenses</Tabs.Trigger>
              </Tabs.List>
              <ScrollArea type={"auto"} scrollbars={"vertical"} style={{ minHeight: "200px", maxHeight: "400px" }}>
                <Box>
                  <Tabs.Content value={"members"}>
                    {members.length ? <Table.Root size={"1"}>
                      <Table.Body>
                        {members.map((member) => (
                          <Table.Row align={"center"} key={member.id}>
                            <Table.RowHeaderCell>{member.name}</Table.RowHeaderCell>
                            {isComplexDivvy && <Table.Cell align={"center"}>
                              <Dialog.Root>
                                <Dialog.Trigger>
                                  <Button variant={"soft"} size={"1"}>Assign expense</Button>
                                </Dialog.Trigger>
                                <Dialog.Content maxWidth={"450px"}>
                                  <Dialog.Title>Assign expense to {member.name}</Dialog.Title>
                                  <Dialog.Description size={"2"} mb={"4"}>Must have at least one expense assigned to each member</Dialog.Description>
                                  <Flex direction={"column"} gap={"2"}>
                                    {expenses.map((expense) => (
                                      <Button variant={"outline"} key={expense.id} type={"button"}>{expense.name}</Button>
                                    ))}
                                  </Flex>
                                </Dialog.Content>
                              </Dialog.Root>
                            </Table.Cell>}
                            <Table.Cell align={"right"}>
                              <IconButton onClick={(e) => handleRemoveMember(e, member.id)} mr={"2"} color={"ruby"}
                                variant={"soft"}>
                                <TrashIcon />
                              </IconButton>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root> :
                      <Text style={{ display: "block" }} m={"2"}>No members added yet, try adding some!</Text>}
                  </Tabs.Content>
                  <Tabs.Content value={"expenses"}>
                    {expenses.length ? <Table.Root size={"1"}>
                      <Table.Body>
                        {expenses.map((expense) => (
                          <Table.Row align={"center"} key={expense.id}>
                            <Table.RowHeaderCell>{expense.name}</Table.RowHeaderCell>
                            <Table.Cell>{`$${expense.amount.toFixed(2)}`}</Table.Cell>
                            <Table.Cell align={"right"}>
                              <IconButton onClick={(e) => handleRemoveExpense(e, expense.id)} mr={"2"} color={"ruby"}
                                variant={"soft"}>
                                <TrashIcon />
                              </IconButton>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root> :
                      <Text style={{ display: "block" }} m={"2"}>No expenses added yet, try adding some!</Text>}
                  </Tabs.Content>
                </Box>
              </ScrollArea>
            </Tabs.Root>
            <Separator size={"4"} my={"4"} />
            <Button variant={"surface"} size={"3"}>Finalize results</Button>
          </Flex>
        </form>
      </Container>
    </Flex>

  )
}
