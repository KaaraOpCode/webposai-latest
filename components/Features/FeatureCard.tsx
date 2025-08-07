import React from "react";
import { Feature } from "./featuresData";

const FeatureCard = ({ feature }: { feature: Feature }) => (
  <div
    className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border ${feature.borderColor} hover:-translate-y-2 group`}
  >
    <div
      className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
    >
      {feature.icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
      {feature.title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
      {feature.description}
    </p>
  </div>
);

export default FeatureCard;
