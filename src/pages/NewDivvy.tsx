import React, {useState} from 'react'
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

type Member = {
  id: string;
  name: string;
}

export const NewDivvy: React.FC = () => {
  const [isComplexDivvy, setIsComplexDivvy] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([{id: "1", name: "Carlos"}, {id: "2", name: "James"}, {id: "3", name: "Jessica"}, {
    id: "4",
    name: "Joseph"
  }, {id: "5", name: "Joshua"}]);


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
                <SegmentedControl.Item onClick={() => setIsComplexDivvy(false)} value={"simple"}>Simple</SegmentedControl.Item>
                <SegmentedControl.Item onClick={() => setIsComplexDivvy(true)} value={"complex"}>Complex</SegmentedControl.Item>
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
              <Button variant={"surface"}>
                Add members
              </Button>
              <Button variant={"surface"}>
                Add expenses
              </Button>
            </Flex>
            <Separator size={"4"} my={"4"}/>
            <Tabs.Root defaultValue={"members"}>
              <Tabs.List>
                <Tabs.Trigger value={"members"}>Members</Tabs.Trigger>
                <Tabs.Trigger value={"expenses"}>Expenses</Tabs.Trigger>
              </Tabs.List>
              <ScrollArea type={"auto"} scrollbars={"vertical"} style={{height: "260px"}}>
                <Box>
                  <Tabs.Content value={"members"}>
                    <Table.Root size={"1"}>
                      <Table.Body>
                        {members.map((member) => (
                          <Table.Row align={"center"} key={member.id}>
                            <Table.RowHeaderCell>{member.name}</Table.RowHeaderCell>
                            {isComplexDivvy && <Table.Cell align={"right"}>
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
                    </Table.Root>
                  </Tabs.Content>
                  <Tabs.Content value={"expenses"}>
                    <Table.Root>
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                        </Table.Row>
                      </Table.Header>
                    </Table.Root>
                  </Tabs.Content>
                </Box>
              </ScrollArea>
            </Tabs.Root>
          </Flex>
        </form>
      </Container>
    </Flex>

  )
}
