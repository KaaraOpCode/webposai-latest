'use client';

export default function Stats() {
  const stats = [
    {
      value: "10K+",
      label: "Active Businesses",
      icon: "🏢"
    },
    {
      value: "1M+",
      label: "Transactions Processed",
      icon: "💳"
    },
    {
      value: "99.9%",
      label: "Uptime",
      icon: "⚡"
    },
    {
      value: "24/7",
      label: "Support",
      icon: "🛟"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Join thousands of businesses already using WebPOSAI
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-indigo-100 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
