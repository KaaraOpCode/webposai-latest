'use client';
import { Eye } from 'lucide-react';

const OverviewCard = ({ role, onNavigate }: { role: string; onNavigate: (path: string) => void }) => {
  const getContent = () => {
    switch (role) {
      case 'Admin':
        return {
          title: 'Admin Control Center',
          items: [
            { icon: '🔧', text: 'Configure AI integrations and system settings', path: '/admin/settings' },
            { icon: '📦', text: 'Manage inventory, pricing, and product catalog', path: '/admin/products' },
            { icon: '👥', text: 'Control staff permissions and user roles', path: '/admin/staff' },
            { icon: '📊', text: 'Access comprehensive analytics and reports', path: '/admin/analytics' },
            { icon: '🔒', text: 'Monitor security and system performance', path: '/admin/security' }
          ]
        };
      case 'AI Assistant':
        return {
          title: 'AI Intelligence Hub',
          items: [
            { icon: '📊', text: 'Predict inventory needs with machine learning', path: '/admin/ai/inventory' },
            { icon: '🎯', text: 'Recommend targeted promotions and offers', path: '/admin/ai/promotions' },
            { icon: '🛡️', text: 'Monitor fraud detection and anomalies', path: '/admin/ai/security' },
            { icon: '📈', text: 'Generate sales forecasts and trends', path: '/admin/ai/forecasts' },
            { icon: '🔍', text: 'Provide customer behavior insights', path: '/admin/ai/insights' }
          ]
        };
      default:
        return { title: '', items: [] };
    }
  };

  const content = getContent();

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Eye className="text-blue-600 dark:text-blue-400" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{content.title}</h2>
      </div>
           
      <div className="grid gap-4">
        {content.items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer hover:shadow-md"
            onClick={() => onNavigate(item.path)}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium flex-1">{item.text}</span>
            <div className="text-blue-600 dark:text-blue-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCard;
