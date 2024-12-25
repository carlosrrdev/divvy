import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  isShowing: boolean;
  setIsShowing: (isShowing: boolean) => void;
  backdropClose?: boolean;
  onClose?: () => void;
  closeButtonText?: string;
  className?: string;
}

export default function Modal({
  children,
  isShowing,
  setIsShowing,
  backdropClose = true,
  onClose,
  closeButtonText,
  className
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isShowing) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isShowing]);

  const handleClose = () => {
    setIsShowing(false);
    onClose?.();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (backdropClose && e.target === modalRef.current) {
      handleClose();
    }
  };

  if (!isShowing) return null;

  return createPortal(
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className={`modal-content animate-slideIn ${className}`}>
        <div>
          {children}
        </div>
        {closeButtonText && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-slate-700 text-slate-100 md:dark:hover:bg-slate-600 rounded-md"
            >
              {closeButtonText}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}