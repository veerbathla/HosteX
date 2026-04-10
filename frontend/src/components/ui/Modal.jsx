import Button from "./Button";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          X
        </Button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
