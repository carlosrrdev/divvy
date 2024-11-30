// import {useParams} from "react-router";
import {TbUser, TbCash, TbTrashX} from 'react-icons/tb'
import React, {useState} from "react";
import Modal from "../components/Modal.tsx";
import useSimpleMemberStore, {SimpleMember} from "../stores/simpleUserStore.ts";

function NewSimpleDivvy() {

  const {members, addMember, removeMember} = useSimpleMemberStore();

  const [divvyTitle, setDivvyTitle] = useState("New Divvy");
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [expenseName, setExpenseName] = useState("");

  const toggleMemberModal = () => {
    setIsMemberModalOpen(!isMemberModalOpen);
  }

  const toggleExpenseModal = () => {
    setIsExpenseModalOpen(!isExpenseModalOpen);
  }

  const handleDivvyTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDivvyTitle(e.target.value);
  }

  const handleMemberNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberName(e.target.value);
  }

  const handleExpenseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseName(e.target.value);
  }

  const handleAddMember = () => {
    if (memberName.trim()) {
      const newMember: SimpleMember = {id: crypto.randomUUID(), name: memberName};
      addMember(newMember);
      setMemberName("");
    }
  }

  const handleRemoveMember = (id: string) => {
    removeMember(id);
  }

  // const {dId} = useParams()

  return (
    <div className={"flex flex-col h-full"}>
      <form className={"grid grid-rows-[auto_1fr_auto] h-full mt-6 md:mt-20 gap-y-4"}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Divvy Title</span>
          </div>
          <input type="text" autoFocus={true} value={divvyTitle} onChange={handleDivvyTitleChange}
                 className="input input-bordered w-full"/>
        </label>
        <div className={"grid grid-cols-[1fr_auto_1fr] gap-4"}>
          <div>
            <button onClick={toggleMemberModal} type={"button"} className={"btn btn-sm mb-4 w-full btn-primary"}>
              <TbUser className={"text-xl"}/>
              <span>Add member</span>
            </button>
            <ul className={"flex flex-col gap-2"}>
              {members.map((member) =>
                <li className={"flex justify-between items-center bg-accent text-base-100 py-1 px-2 rounded-md"} key={member.id}>
                  <span>{member.name}</span>
                  <button onClick={() => handleRemoveMember(member.id)} type={"button"} className={"btn btn-sm btn-ghost"}>
                    <TbTrashX className={"text-lg"} />
                  </button>
                </li>)}
            </ul>
          </div>
          <div className={"w-0.5 bg-neutral-900"}></div>
          <div>
            <button onClick={toggleExpenseModal} type={"button"} className={"btn btn-sm w-full btn-primary"}>
              <TbCash className={"text-xl"}/>
              <span>Add expense</span>
            </button>
          </div>
        </div>
        <button className={"btn btn-success btn-disabled"} type={"submit"}>Save Divvy</button>
      </form>
      <Modal isOpen={isMemberModalOpen} onClose={toggleMemberModal}
             actionBtn={
               <button type={"button"}
                       className={"btn btn-sm btn-success"}
                       onClick={handleAddMember}>Add member</button>
             }>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Member name</span>
          </div>
          <input type="text" value={memberName} onChange={handleMemberNameChange}
                 className="input input-bordered w-full"/>
        </label>
      </Modal>
      <Modal isOpen={isExpenseModalOpen} onClose={toggleExpenseModal}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Expense name</span>
          </div>
          <input type="text" value={expenseName} onChange={handleExpenseNameChange}
                 className="input input-bordered w-full"/>
        </label>
      </Modal>
    </div>
  )
}

export default NewSimpleDivvy;