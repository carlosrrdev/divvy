import React, {useEffect, useState} from 'react'
import Modal from "../components/Modal";
import {Expense, Member} from "../types";

export const NewDivvyRoute: React.FC = () => {

  const [showIntroModal, setShowIntroModal] = useState(false)
  const [showMembersModal, setShowMembersModal] = useState(false)
  const [showExpensesModal, setShowExpensesModal] = useState(false)
  const [divvyTitle, setDivvyTitle] = useState('New Divvy')
  const [divvyMembers, setDivvyMembers] = useState<Member[]>([])
  const [divvyExpenses, setDivvyExpenses] = useState<Expense[]>([])

  const handleModalClose = () => {
    localStorage.setItem('hasSeenIntro', 'true')
  }

  const handleAddMember = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowMembersModal(true)
  }

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro')
    if (hasSeenIntro === 'true') {
      setShowIntroModal(false)
    } else {
      setShowIntroModal(true)
    }
  }, [])

  return (
    <div className={"w-full flex-1"}>
      <form className={"divvy-form"}>
        <fieldset>
          <label htmlFor="divvy-title">Divvy Title</label>
          <input id="divvy-title" type="text" value={divvyTitle} onChange={(e) => setDivvyTitle(e.target.value)}/>
        </fieldset>
        <fieldset style={{animationDelay: '100ms'}} className={"border border-slate-500/10 rounded-md p-4"}>
          <button onClick={handleAddMember} className={"px-4 py-2 bg-slate-300 md:hover:bg-slate-400 text-slate-900 transition-colors rounded-md"}>Add Member</button>
        </fieldset>
        <fieldset style={{animationDelay: '200ms'}} className={"border border-slate-500/10 rounded-md p-4"}>
          <button className={"px-4 py-2 bg-slate-300 md:hover:bg-slate-400 text-slate-900 transition-colors rounded-md"}>Add Expense</button>
        </fieldset>
        <fieldset style={{animationDelay: '300ms'}} className={"grid grid-cols-2 gap-x-4"}>
          <button disabled className={"px-4 py-2 bg-indigo-700 rounded-md"}>Split Evenly</button>
          <button disabled className={"px-4 py-2 bg-indigo-700 rounded-md"}>Divvy Up</button>
        </fieldset>
      </form>
      <Modal 
        isShowing={showMembersModal} 
        setIsShowing={setShowMembersModal} 
        closeButtonText="I understand!" 
      >
        <div>
          <p>add members</p>
        </div>
      </Modal>
      <Modal 
        isShowing={showIntroModal} 
        setIsShowing={setShowIntroModal} 
        backdropClose={false} 
        closeButtonText="I understand!" 
        onClose={handleModalClose}  
      >
        <div className={"flex flex-col gap-y-4"}>
          <h1 className={"text-xl md:text-2xl"}>Welcome to Divvy! 🎉</h1>
          <p className={"text-sm md:text-base leading-relaxed"}>
            Looks like this is your first time creating a Divvy. Here is a super quick
            introduction to Divvy.
          </p>
          <div className={"border border-slate-700/50 rounded-md p-4"}>
            <h2 className={"text-lg md:text-xl font-bold"}>Even split</h2>
            <p className={"text-sm md:text-base leading-relaxed mt-1"}>
              Quick and fast. All expenses are evenly split between all participants.
            </p>
          </div>
          <div className={"border border-slate-700/50 rounded-md p-4"}>
            <h2 className={"text-lg md:text-xl font-bold"}>Divvy up!</h2>
            <p className={"text-sm md:text-base leading-relaxed mt-1"}>
              This is where Divvy truly shines. You'll have full control over who pays what and how much.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}
