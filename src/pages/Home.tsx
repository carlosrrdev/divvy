import {useState} from 'react';
import {FiPlus, FiFile} from 'react-icons/fi';
import Modal from "../components/Modal.tsx";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className={"w-full h-full flex flex-col md:flex-row md:gap-x-4 gap-y-4 justify-center items-center"}>
      <button type={"button"} className={"btn w-full max-w-52 btn-primary"}>
        <FiPlus className={"text-xl"} />
        <span>New Divvy</span>
      </button>
      <button type={"button"} onClick={toggleModal} className={"btn w-full max-w-52 btn-outline btn-accent"}>
        <FiFile className={"text-xl"} />
        <span>View Saved</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h1>Saved Divvies</h1>
      </Modal>
    </div>
  );
}

export default Home;