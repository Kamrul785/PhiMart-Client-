const StatCard = ({ icon: Icon, title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition transform hover:-translate-y-1 group">
      {/* Icon Background */}
      <div className="p-3 bg-gradient-to-br from-teal-100 to-teal-50 rounded-lg w-fit mb-4 group-hover:from-teal-600 group-hover:to-teal-700 transition">
        {Icon && <Icon className="w-6 h-6 text-teal-600 group-hover:text-white transition" />}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-600 mb-2">{title}</h3>

      {/* Value */}
      <p className="text-4xl font-bold text-gray-900">{value}</p>

      {/* Optional trend indicator */}
      <p className="text-xs text-green-600 mt-3 font-medium">↑ 12% from last month</p>
    </div>
  );
};

export default StatCard;
