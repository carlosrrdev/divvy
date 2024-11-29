import React, {useRef, useEffect} from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
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
    <dialog ref={dialogRef} className="p-0 rounded-md shadow-md">
      <div className="p-4 bg-white dark:bg-base-100 rounded-md dark:text-white">
        {children}
        <button onClick={onClose} className="mt-4 btn btn-neutral">Close</button>
      </div>
    </dialog>
  );
};

export default Modal;