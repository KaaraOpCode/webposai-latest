'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    clsx(
      "font-medium transition-colors",
      pathname === href
        ? "text-indigo-600 dark:text-indigo-400"
        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
    );

  return (
    <header className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WebPOSAI
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className={linkClasses("/features")}>
              Features
            </Link>
            <Link href="/pricing" className={linkClasses("/pricing")}>
              Pricing
            </Link>
            <Link href="/demo" className={linkClasses("/demo")}>
              Demo
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="auth/login" className={linkClasses("auth/login")}>
              Login
            </Link>
            <Link
              href="auth/signup"
              
              className={clsx(
                "px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors",
                pathname === "auth/signup" && "bg-indigo-700"
              )}>
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
