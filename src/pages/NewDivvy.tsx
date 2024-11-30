import {TbRocket, TbPuzzle} from 'react-icons/tb'
import {useState} from "react";
import {useNavigate} from "react-router";

function NewDivvy() {

  const [, setIsComplexDivvy] = useState(false);
  const navigator = useNavigate()

  const divvyID = crypto.randomUUID();

  const changeToComplexDivvy = () => {
    setIsComplexDivvy(true);
    navigator(`/new/dd/${divvyID}`)
  }

  const changeToSimpleDivvy = () => {
    setIsComplexDivvy(false);
    navigator(`/new/sd/${divvyID}`)
  }

  return (
    <div className={"flex flex-col h-full w-full justify-center items-center"}>
      <div className={"flex flex-col gap-y-4"}>
        <h1 className={"text-xl"}>Select a category</h1>
        <div className={"grid grid-rows-2 gap-4 lg:grid-cols-2 lg:grid-rows-1"}>
          <button type={"button"} onClick={changeToSimpleDivvy}
                  className={"grid grid-cols-[auto_1fr] gap-4 hover:bg-base-200 p-4 rounded-md border " +
                    "border-base-200 dark:border-neutral-800"}>
            <TbRocket className={"text-4xl self-center"}/>
            <div className={"flex flex-col"}>
              <h2 className={"font-bold text-left text-lg"}>Even Split</h2>
              <p className={"text-left text-sm md:text-base"}>Split expenses evenly between all members</p>
            </div>
          </button>
          <button type={"button"} onClick={changeToComplexDivvy}
                  className={"grid grid-cols-[auto_1fr] gap-4 hover:bg-base-200 p-4 rounded-md border " +
                    "border-base-200 dark:border-neutral-800"}>
            <TbPuzzle className={"text-4xl self-center"}/>
            <div className={"flex flex-col"}>
              <h2 className={"font-bold text-left text-lg"}>Divvy Up</h2>
              <p className={"text-left text-sm md:text-base"}>Individually assign expenses to each member</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewDivvy;