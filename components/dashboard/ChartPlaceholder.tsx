'use client';
import { BarChart } from 'lucide-react';

const ChartPlaceholder = ({ title, height = 'h-40' }: { title: string; height?: string }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
    <div className={`${height} bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center`}>
      <div className="text-center">
        <BarChart size={32} className="text-blue-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Chart visualization</p>
      </div>
    </div>
  </div>
);

export default ChartPlaceholder;
