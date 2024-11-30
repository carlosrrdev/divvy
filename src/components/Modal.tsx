import React, {useRef, useEffect} from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement
  actionBtn?: React.ReactElement
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children, actionBtn}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }

      dialog.addEventListener('click', handleBackdropClick);
    } else {
      dialog.close();
    }

    return () => {
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, [isOpen]);

  const handleBackdropClick = (event: MouseEvent) => {
    const dialog = dialogRef.current;
    if (dialog && event.target === dialog) {
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} className="p-0 w-full mx-auto rounded-md bg-transparent shadow-md">
      <div className="p-4 bg-white dark:bg-base-100 w-full max-w-lg rounded-md dark:text-white">
        {children}
        <div className="flex mt-4 justify-between">
          {actionBtn}
          <button onClick={onClose} className="btn btn-sm md:btn-md btn-neutral">Close</button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;