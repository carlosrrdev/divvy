import React from 'react'
import {Member} from "@/types.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {TbTrash} from "react-icons/tb";

interface Props {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
}

export const MembersTable: React.FC<Props> = ({members, setMembers}) => {

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map(member => (
          <TableRow key={member.id} className={"flex justify-between"}>
            <TableCell>{member.name}</TableCell>
            <TableCell>
              <Button onClick={() => handleRemoveMember(member.id)} size={"icon"}>
                <TbTrash/>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
