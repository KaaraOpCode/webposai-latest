'use client';

import { useRouter } from 'next/navigation';
import { PricingPlan } from "./pricingData";

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  const router = useRouter();

  const handleGetStarted = () => {
    if (plan.price !== "Custom") {
      router.push('/signup');
    } else {
      // For "Custom" plans, you might want to open a contact modal or something else
      alert('Please contact sales for custom plans.');
    }
  };

  return (
    <div
      className={`p-6 rounded-xl border shadow-sm ${
        plan.highlight
          ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-400"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      }`}
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.title}</h3>
      <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-4">{plan.price}</p>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-200">
            • {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={handleGetStarted}
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
      </button>
    </div>
  );
};

export default PricingCard;
