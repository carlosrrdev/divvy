import React, {useRef, useEffect} from 'react'

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  closeButtonText?: string;
}

export const Modal: React.FC<ModalProps> = (
  {
    isOpen,
    setIsOpen,
    children,
    closeButtonText = "Close"
  }
) => {

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
        setIsOpen(false);
      }
    }
  }, [isOpen, setIsOpen]);

  // close modal on backdrop click
  useEffect(() => {
    const handleBackdropClick = (event: MouseEvent) => {
      const dialog = dialogRef.current;
      if (dialog && event.target === dialog) {
        setIsOpen(false);
      }
    };

    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener('click', handleBackdropClick);
    }

    return () => {
      if (dialog) {
        dialog.removeEventListener('click', handleBackdropClick);
      }
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  function handleModalClose() {
    dialogRef.current?.close()
    setIsOpen(false);
  }

  dialogRef.current?.addEventListener('close', () => {
    console.log('dialog closed');
  })

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-content">
        {children}
        <div className="flex mt-6 justify-end">
          <button className={"px-6 py-2 text-sm md:text-base rounded-md dark:bg-slate-300 dark:text-slate-800"} onClick={handleModalClose}>{closeButtonText}</button>
        </div>
      </div>
    </dialog>
  );
}
