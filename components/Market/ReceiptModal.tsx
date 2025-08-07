interface ReceiptModalProps {
  onOptionSelect: (option: string) => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ onOptionSelect }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Select Receipt Option</h2>
      <div className="flex flex-col gap-2">
        {['print', 'email', 'qr'].map(option => (
          <button
            key={option}
            onClick={() => onOptionSelect(option)}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 capitalize"
          >
            {option} receipt
          </button>
        ))}
        <button
          onClick={() => onOptionSelect('none')}
          className="text-gray-600 underline hover:text-gray-800"
        >
          No receipt
        </button>
      </div>
    </div>
  </div>
);
