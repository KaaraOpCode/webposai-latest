// components/Market/MarketHeader.tsx
'use client';
import Link from 'next/link';

export function MarketHeader() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Market Processes</h1>
      <Link
        href="/dashboard"
        className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-1"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}