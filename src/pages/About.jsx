import React from 'react';
import { Link } from 'react-router';
import { FiHome, FiChevronRight, FiUsers, FiTrendingUp, FiAward, FiGlobe } from 'react-icons/fi';

const About = () => {
  const values = [
    {
      icon: FiUsers,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction in every decision we make.'
    },
    {
      icon: FiTrendingUp,
      title: 'Innovation',
      description: 'Constantly evolving to provide the best shopping experience.'
    },
    {
      icon: FiAward,
      title: 'Quality',
      description: 'Curating only the best products for our community.'
    },
    {
      icon: FiGlobe,
      title: 'Accessibility',
      description: 'Making premium products available to everyone worldwide.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products' },
    { number: '24/7', label: 'Support' },
    { number: '99%', label: 'Satisfaction' }
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8 animate-fade-in-up">
          <Link to="/" className="flex items-center gap-1 hover:text-teal-600 transition">
            <FiHome className="w-4 h-4" />
            Home
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">About</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About PhiMart</h1>
          <p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
            We're building the future of e-commerce with innovation, quality, and customer-centric values.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition">
              <div className="text-3xl font-bold text-teal-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in-up">
            {/* Mission */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To revolutionize the online shopping experience by providing a carefully curated selection of premium products at competitive prices with exceptional customer service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that quality shopping should be accessible to everyone, regardless of location or background.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To become the world's most trusted online marketplace, known for delivering quality products, building lasting customer relationships, and creating positive social impact.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Every transaction is an opportunity to exceed expectations and build trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12 text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-gray-600 text-lg">These principles guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition group"
              >
                <div className="p-3 bg-teal-100 rounded-lg w-fit mb-4 group-hover:bg-teal-600 transition">
                  <Icon className="w-6 h-6 text-teal-600 group-hover:text-white transition" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
          <p className="text-teal-100 mb-8 text-lg">Start shopping with PhiMart today and experience the difference.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-white hover:bg-gray-50 text-teal-600 font-semibold px-8 py-3 rounded-lg transition transform hover:scale-105"
            >
              Start Shopping
            </Link>
            <a
              href="#contact"
              className="border-2 border-white hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-lg transition inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-gray-600 mb-8">Have questions? We'd love to hear from you.</p>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 inline-block">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> support@phimart.com
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Support:</span> Available 24/7
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;