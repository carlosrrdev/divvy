import React, {useRef, useState} from 'react'
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
import {TrashIcon} from "@radix-ui/react-icons";
import toast, {Toaster} from "react-hot-toast"
import useMemberStore from "../stores/Member.ts";

type Expense = {
  id: string;
  name: string;
  amount: number;
}

export const NewDivvy: React.FC = () => {
  const [isComplexDivvy, setIsComplexDivvy] = useState<boolean>(false);
  const memberNameInputRef = useRef<HTMLInputElement>(null)

  const {members, addMember} = useMemberStore()
  const [expenses] = useState<Expense[]>([
    {id: "1", name: "Rent", amount: 1000},
    {id: "2", name: "Gas", amount: 100},
    {id: "3", name: "Food", amount: 100},
    {id: "4", name: "Clothes", amount: 100},
    {id: "5", name: "Gym", amount: 100},
    {id: "6", name: "Groceries", amount: 100},
    {id: "7", name: "Bills", amount: 100},
    {id: "8", name: "Utilities", amount: 100},
    {id: "9", name: "Entertainment", amount: 100},
    {id: "10", name: "Other", amount: 100},
  ])

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    const name = memberNameInputRef.current?.value.trim()
    if(name) {
      const newMemberObj = {
        id: crypto.randomUUID(),
        name: name,
      }
      addMember(newMemberObj)
      toast.success(`${name} added!`)
    } else {
      toast.error("Member name cannot be empty")
    }
    if(memberNameInputRef.current) {
      memberNameInputRef.current.value = ""
    }
  }


  return (
    <Flex height={"100%"} justify={"center"} align={"center"}>
      <Container>
        <form style={{maxWidth: "var(--container-2)", margin: "auto"}}>
          <Flex direction={"column"} gap={"2"}>
            <label style={{fontSize: "var(--font-size-2)"}}>
              Divvy name
              <TextField.Root size={"3"} required={true} placeholder={"Enter name"}/>
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
                      <Button type={"button"} size={{initial: "2", md: "3"}}>I got it!</Button>
                    </Dialog.Close>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root>
            </Flex>
            <Separator size={"4"} my={"4"}/>
            <Flex direction={{initial: "column", md: "row"}} gap={"2"}>
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
                      <TextField.Root ref={memberNameInputRef} required={true} size={"2"} placeholder={"Enter name"}/>
                      <Button type={"submit"} variant={"surface"}>Add new member</Button>
                    </Flex>
                  </form>
                  <Flex>
                    <Dialog.Close style={{marginTop: "var(--space-4)", marginLeft: "auto"}}>
                      <Button type={"button"}>Close</Button>
                    </Dialog.Close>
                  </Flex>
                  <Toaster toastOptions={{
                    style: {
                      borderRadius: "var(--radius-4)",
                      padding: "var(--space-3)",
                      fontSize: "var(--font-size-2)",
                      fontWeight: "bold",
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
                  <form>
                    <Flex direction={"column"} gap={"2"}>
                      <TextField.Root required={true} size={"2"} placeholder={"Enter name"}/>
                      <TextField.Root step={"0.01"} type={"number"} required={true} size={"2"} placeholder={"0.00"}/>
                      <Button type={"submit"} variant={"surface"}>Add new expense</Button>
                    </Flex>
                  </form>
                  <Flex>
                    <Dialog.Close style={{marginTop: "var(--space-4)", marginLeft: "auto"}}>
                      <Button type={"button"}>Close</Button>
                    </Dialog.Close>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root>
            </Flex>
            <Separator size={"4"} my={"4"}/>
            <Tabs.Root defaultValue={"members"}>
              <Tabs.List>
                <Tabs.Trigger value={"members"}>Members</Tabs.Trigger>
                <Tabs.Trigger value={"expenses"}>Expenses</Tabs.Trigger>
              </Tabs.List>
              <ScrollArea type={"auto"} scrollbars={"vertical"} style={{minHeight: "200px", maxHeight: "400px"}}>
                <Box>
                  <Tabs.Content value={"members"}>
                    {members.length ? <Table.Root size={"1"}>
                      <Table.Body>
                        {members.map((member) => (
                          <Table.Row align={"center"} key={member.id}>
                            <Table.RowHeaderCell>{member.name}</Table.RowHeaderCell>
                            {isComplexDivvy && <Table.Cell align={"center"}>
                                <Button variant={"soft"} size={"1"}>Assign expense</Button>
                            </Table.Cell>}
                            <Table.Cell align={"right"}>
                              <IconButton mr={"2"} color={"ruby"} variant={"soft"}>
                                <TrashIcon/>
                              </IconButton>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root> : <Text style={{display: "block"}} m={"2"}>No members added yet, try adding some!</Text>}
                  </Tabs.Content>
                  <Tabs.Content value={"expenses"}>
                    <Table.Root size={"1"}>
                      <Table.Body>
                        {expenses.map((expense) => (
                          <Table.Row align={"center"} key={expense.id}>
                            <Table.RowHeaderCell>{expense.name}</Table.RowHeaderCell>
                            <Table.Cell>{expense.amount}</Table.Cell>
                            <Table.Cell align={"right"}>
                              <IconButton mr={"2"} color={"ruby"} variant={"soft"}>
                                <TrashIcon/>
                              </IconButton>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Tabs.Content>
                </Box>
              </ScrollArea>
            </Tabs.Root>
            <Separator size={"4"} my={"4"}/>
            <Button style={{backgroundColor: "var(--gray-12)"}} size={"3"}>Finalize results</Button>
          </Flex>
        </form>
      </Container>
    </Flex>

  )
}
