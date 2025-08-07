'use client';

import Header from "@/components/Layout/Header";
import Hero from "@/components/Layout/Hero";
import Features from "@/components/Features/Features";
import Stats from "@/components/Layout/Stats";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <Hero />
      <Features />
      <Stats />
    </div>
  );
}
