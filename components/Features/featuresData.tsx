import { JSX } from "react";

export interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
}

export const featuresData: Feature[] = [
  {
    icon: (
      <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Smart Inventory",
    description: "AI-powered inventory management with automatic reorder suggestions and demand forecasting.",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    borderColor: "border-green-200 dark:border-green-800",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1m1 0V9a4 4 0 00-8 0v3H7a1 1 0 000 2h1v4h1v-4h4v4h1v-4h1a1 1 0 000-2z" />
      </svg>
    ),
    title: "Predictive Analytics",
    description: "Gain foresight into customer behaviors and trends with our predictive analytics engine.",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L15 12.75 9.75 8.5V17z" />
      </svg>
    ),
    title: "Visual Recognition",
    description: "Utilize AI-based vision to identify product placement, shelf status, and compliance in real-time.",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h2l.4 2M7 6h14l-1.35 6.45a2 2 0 01-1.98 1.55H6.16" />
      </svg>
    ),
    title: "Dynamic Pricing",
    description: "Adjust prices in real-time based on demand, competitor pricing, and inventory levels.",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405M20 12h-1.586A2 2 0 0017 9.586L15 7H9L7 9.586A2 2 0 005.586 12H4" />
      </svg>
    ),
    title: "Fraud Detection",
    description: "Monitor transactions and detect fraudulent activities using machine learning algorithms.",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 6v6" />
      </svg>
    ),
    title: "Customer Insights",
    description: "Deep understanding of customer preferences and lifetime value with data-driven insights.",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    borderColor: "border-indigo-200 dark:border-indigo-800",
  },
];
