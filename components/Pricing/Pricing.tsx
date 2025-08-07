'use client';

import PricingCard from "./PricingCard";
import { pricingPlans } from "./pricingData";

const Pricing = () => (
  <section className="py-20 bg-gray-50 dark:bg-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Flexible Pricing for Every Stage
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choose a plan that fits your store’s growth and scale effortlessly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
