'use client';

interface RoleButtonProps {
  role: string;
  isActive: boolean;
  onClick: () => void;
}

const RoleButton = ({ role, isActive, onClick }: RoleButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white hover:shadow-md hover:transform hover:scale-105'
    }`}
  >
    {role}
  </button>
);

export default RoleButton;
