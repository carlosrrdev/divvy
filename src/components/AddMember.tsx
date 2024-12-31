import React, {useRef} from 'react'
import {Button} from "@/components/ui/button.tsx";
import {TbUserPlus} from "react-icons/tb";
import {Member} from "@/types.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog.tsx";
import {useToast} from "@/hooks/use-toast";
import {capitalizeFirstLetter} from "@/helpers.ts";

interface Props {
  setMember: React.Dispatch<React.SetStateAction<Member[]>>
}

export const AddMember: React.FC<Props> = ({setMember}) => {

  const memberNameInput = useRef<HTMLInputElement>(null)
  const {toast} = useToast()

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (memberNameInput.current) {
      const name = memberNameInput.current.value

      if (name.trim() === "") return;
      const formattedName = capitalizeFirstLetter(name)

      const newMemberObj: Member = {
        id: crypto.randomUUID(),
        name: formattedName,
        expenses: []
      }

      setMember(prev => [...prev, newMemberObj])
      memberNameInput.current.value = ""
      toast({
        title: "New member added",
        description: `Successfully added ${formattedName} as a new member`,
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>
          <TbUserPlus/>
          Add members
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new member</DialogTitle>
          <DialogDescription>
            Please provide a name for the new member.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col space-y-2" onSubmit={handleAddMember}>
          <div>
            <Label htmlFor="name">
              Name
            </Label>
            <Input required={true} ref={memberNameInput} id="name"/>
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
