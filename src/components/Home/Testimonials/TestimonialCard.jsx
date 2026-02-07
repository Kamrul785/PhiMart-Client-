import { FiStar } from "react-icons/fi";

const TestimonialCard = ({ name, role, content, rating, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
          alt={name}
          className="w-14 h-14 rounded-full object-cover border-2 border-teal-300"
        />
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-gray-700 text-sm leading-relaxed italic">
        "{content}"
      </p>
    </div>
  );
};

export default TestimonialCard;
