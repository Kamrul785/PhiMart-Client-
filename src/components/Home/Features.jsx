import { FiShoppingCart, FiCheck, FiTag, FiShield } from "react-icons/fi";

const Features = () => {
  const features = [
    {
      icon: FiShoppingCart,
      title: "Free Delivery",
      description: "Get your orders delivered at no extra cost, fast and hassle-free.",
      color: "text-orange-500",
    },
    {
      icon: FiCheck,
      title: "Quality Guarantee",
      description: "We ensure top-notch quality for every product you purchase.",
      color: "text-green-500",
    },
    {
      icon: FiTag,
      title: "Daily Offers",
      description: "Exclusive discounts and special deals available every day.",
      color: "text-blue-500",
    },
    {
      icon: FiShield,
      title: "100% Secure Payment",
      description: "Your payment information is encrypted and completely secure.",
      color: "text-red-500",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Why Choose PhiMart?
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Experience shopping with confidence and reliability
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full bg-gradient-to-br from-teal-50 to-teal-100 ${feature.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;