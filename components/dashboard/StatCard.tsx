'use client';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend?: 'up' | 'down';
  onClick?: () => void;
  isClickable?: boolean;
}

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend = 'up',
  onClick,
  isClickable = false,
}: StatCardProps) => (
  <div 
    className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 ${
      isClickable ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-600' : ''
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        <p className={`text-sm mt-1 flex items-center gap-1 ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          <TrendingUp size={14} className={trend === 'down' ? 'rotate-180' : ''} />
          {change}
        </p>
      </div>
      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        <Icon size={24} className="text-blue-600 dark:text-blue-400" />
      </div>
    </div>
    {isClickable && (
      <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium">
        Click to manage →
      </div>
    )}
  </div>
);

export default StatCard;
