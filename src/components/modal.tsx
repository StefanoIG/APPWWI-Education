import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800"
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
