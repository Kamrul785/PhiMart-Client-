import { FiAlertCircle } from "react-icons/fi";

const ErrorAlert = ({ error }) => {
  return (
    <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded-lg flex items-start gap-3">
      <FiAlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold text-red-900">Error</h3>
        <p className="text-red-700 text-sm mt-1">{error}</p>
      </div>
    </div>
  );
};

export default ErrorAlert;
