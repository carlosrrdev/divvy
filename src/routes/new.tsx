import React, {useEffect, useState} from 'react'
import {Modal} from "../components/Modal";

export const NewDivvyRoute: React.FC = () => {

  const [showIntroModal, setShowIntroModal] = useState(false)

  useEffect(() => {
    const introModal = localStorage.getItem('introModal')
    if (!introModal) {
      setShowIntroModal(true)
      localStorage.setItem('introModal', 'true')
    }
  }, [])

  return (
    <div>
      <p>new page</p>
      <Modal isOpen={showIntroModal} setIsOpen={setShowIntroModal} closeButtonText="I understand!">
        <div className={"flex flex-col gap-y-4"}>
          <h1 className={"text-xl md:text-2xl"}>Welcome to Divvy! 🎉</h1>
          <p className={"text-sm md:text-base leading-relaxed"}>
            Looks like this is your first time creating a Divvy. Here is a super quick
            introduction to Divvy.
          </p>
          <div className={"border border-slate-500 rounded-md p-4"}>
            <h2 className={"text-lg md:text-xl font-bold"}>Even split</h2>
            <p className={"text-sm md:text-base leading-relaxed mt-1"}>
              Quick and fast. All expenses are evenly split between all participants.
            </p>
          </div>
          <div className={"border border-slate-500 rounded-md p-4"}>
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
