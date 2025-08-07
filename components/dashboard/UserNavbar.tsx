'use client';

import { Bell, User, BarChart, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import NavButton from './NavButton'; // Ensure this exists or adapt as needed

export default function UserNavbar() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogoClick = () => {
    router.push('/dashboard');
  };

  const handleSignOut = () => {
    // TODO: Add logout logic (clear auth, tokens, etc.)
    router.push('/auth/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AIWebPOS
            </h1>
          </button>

          <div className="flex items-center gap-2">
            <NavButton
              icon={Bell}
              label="Notifications"
              onClick={() => handleNavigation('/notifications')}
            />
            <NavButton
              icon={User}
              label="Profile"
              onClick={() => handleNavigation('/profile')}
            />
            <NavButton
              icon={BarChart}
              label="Analytics"
              onClick={() => handleNavigation('/analytics')}
            />
            <NavButton
              icon={Settings}
              label="Settings"
              onClick={() => handleNavigation('/settings')}
            />
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />
            <NavButton
              icon={LogOut}
              label="Sign Out"
              variant="danger"
              onClick={handleSignOut}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
