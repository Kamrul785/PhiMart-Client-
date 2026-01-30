import { FiPlus, FiMinus } from "react-icons/fi";
import { useState } from "react";

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-teal-600 transition animate-fade-in-up">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition"
      >
        <h3 className="text-left font-semibold text-gray-900">{question}</h3>
        {isOpen ? (
          <FiMinus className="w-5 h-5 text-teal-600 flex-shrink-0 ml-4" />
        ) : (
          <FiPlus className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const [openItems, setOpenItems] = useState(new Set([0]));

  const faqs = [
    {
      id: 0,
      question: "How long does shipping take?",
      answer: "We offer standard shipping which typically takes 3-5 business days. Express shipping options are available for faster delivery. Orders are processed within 24 hours of placement."
    },
    {
      id: 1,
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee on all products. If you're not satisfied with your purchase, simply contact our customer service team for a hassle-free return process."
    },
    {
      id: 2,
      question: "Are my payments secure?",
      answer: "Yes! All payments are processed securely using industry-standard SSL encryption. We support all major credit cards, debit cards, and digital payment methods."
    },
    {
      id: 3,
      question: "Can I cancel or modify my order?",
      answer: "Orders can be cancelled or modified within 2 hours of placement. After that, the order enters the fulfillment process. Contact our support team immediately if you need to make changes."
    },
    {
      id: 4,
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package in real-time through our tracking page or the carrier's website."
    },
    {
      id: 5,
      question: "Do you offer international shipping?",
      answer: "Currently, we ship to select countries. Check our shipping page to see if your location is available. International orders may take longer and may incur additional customs fees."
    },
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about shopping, shipping, and more
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200">
          <p className="text-gray-700 mb-4">
            Didn't find your answer? Our support team is here to help!
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
