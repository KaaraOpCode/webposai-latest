'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import LoadingModal from "@/components/LoadingModal"; // ✅ Ensure path is correct

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login success (replace with real auth later)
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <>
      <LoadingModal isOpen={loading} message="Logging you in..." />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Login to WebPOSAI</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-gray-500 dark:text-gray-400">
            Don’t have an account?{' '}
            <Link href="/auth/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
