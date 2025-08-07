export interface PricingPlan {
    title: string;
    price: string;
    description: string;
    features: string[];
    highlight?: boolean;
  }
  
  export const pricingPlans: PricingPlan[] = [
    {
      title: "Starter",
      price: "$0",
      description: "Perfect for small shops just starting out.",
      features: [
        "Basic Inventory Tracking",
        "1 User Seat",
        "Email Support",
      ],
    },
    {
      title: "Growth",
      price: "$49/mo",
      description: "Advanced tools for growing retail businesses.",
      features: [
        "Smart Inventory Suggestions",
        "5 User Seats",
        "Live Chat Support",
        "Predictive Analytics",
      ],
      highlight: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large-scale operations.",
      features: [
        "All Growth Features",
        "Unlimited Seats",
        "Dedicated Account Manager",
        "24/7 Premium Support",
      ],
    },
  ];
  