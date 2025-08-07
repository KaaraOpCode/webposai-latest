export const PaymentToast = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 pointer-events-none">
    <div
      className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg text-lg font-semibold select-none animate-fadeinout"
      style={{ minWidth: '280px' }}
    >
      Payment completed successfully!
    </div>
    <style jsx>{`
      @keyframes fadeinout {
        0% {
          opacity: 0;
          transform: translateY(-10px);
        }
        10%,
        90% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
    `}</style>
  </div>
);
