import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Summer Collection",
      description: "Fresh arrivals for the season",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop",
      link: "/shop",
      color: "from-orange-400 to-red-500"
    },
    {
      id: 2,
      title: "Tech Gadgets",
      description: "Latest technology & electronics",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
      link: "/shop",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      title: "Fashion Forward",
      description: "Trendy styles for everyone",
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=300&fit=crop",
      link: "/shop",
      color: "from-pink-400 to-purple-500"
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-gray-600">
            Explore our curated collections of the hottest products
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.link}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in-up h-64"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${collection.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-0 translate-y-2 transition-transform">
                  {collection.title}
                </h3>
                <p className="text-sm text-gray-100 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {collection.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all">
                  Shop Now
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            View All Collections
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
