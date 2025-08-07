'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Package,
  Users,
  DollarSign,
  ShoppingCart,
} from 'lucide-react';
import RoleButton from '@/components/dashboard/RoleButton';
import StatCard from '@/components/dashboard/StatCard';
import OverviewCard from '@/components/dashboard/OverviewCard';
import ChartPlaceholder from '@/components/dashboard/ChartPlaceholder';
import UserNavbar from '@/components/dashboard/UserNavbar'; // ✅ Import UserNavbar

const roles = ['Admin', 'AI Assistant'] as const;

export default function Dashboard() {
  const [activeRole, setActiveRole] = useState<typeof roles[number]>('Admin');
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleActiveProductsClick = () => {
    router.push('/products?filter=active');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <UserNavbar /> {/* ✅ Place the navbar at the top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Heres whats happening with your store today.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <RoleButton
                key={role}
                role={role}
                isActive={activeRole === role}
                onClick={() => setActiveRole(role)}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Market Till"
            value="LSL 12,426"
            change="+12.5%"
            icon={DollarSign}
            trend="up"
            onClick={() => handleNavigation('/market')}
            isClickable
          />
          <StatCard
            title="Orders"
            value="156"
            change="+8.2%"
            icon={ShoppingCart}
            trend="up"
            onClick={() => handleNavigation('/orders')}
            isClickable
          />
          <StatCard
            title="Products"
            value="1,247"
            change="-2.1%"
            icon={Package}
            trend="down"
            onClick={handleActiveProductsClick}
            isClickable
          />
          <StatCard
            title="Customers"
            value="89"
            change="+15.3%"
            icon={Users}
            trend="up"
            onClick={() => handleNavigation('/customers')}
            isClickable
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 gap-8">
          <div>
            <OverviewCard role={activeRole} onNavigate={handleNavigation} />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          <ChartPlaceholder title="Sales Forecast" />
          <ChartPlaceholder title="Inventory Status" />
          <ChartPlaceholder title="Customer Insights" />
        </div>
      </div>
    </div>
  );
}
