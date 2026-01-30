import { useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiChevronDown } from "react-icons/fi";

const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputClasses = (error) => `
    w-full px-4 py-2.5 border-2 rounded-lg transition focus:outline-none pl-10
    ${error 
      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
      : isEditing
      ? 'border-gray-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
      : 'border-gray-200 bg-gray-50 text-gray-600'
    }
    disabled:opacity-75 disabled:cursor-not-allowed
  `;

  return (
    <div className="mt-6">
      {/* Collapsible Header */}
      <button
        type="button"
        onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition mb-4"
      >
        <FiLock className="w-5 h-5" />
        Change Password
        <FiChevronDown className={`w-5 h-5 transition ${isPasswordSectionOpen ? 'rotate-180' : ''}`} />
      </button>

      {isPasswordSectionOpen && (
        <div className="space-y-6 pl-6 border-l-2 border-teal-200">
          {/* Current Password */}
          <div className="form-group">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Current Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className={inputClasses(errors.current_password)}
                disabled={!isEditing}
                placeholder="Enter your current password"
                {...register("current_password", {
                  required: isEditing ? "Current Password is required" : false,
                })}
              />
            </div>
            {errors.current_password && (
              <p className="text-red-600 text-sm mt-2">• {errors.current_password.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="form-group">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              New Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className={inputClasses(errors.new_password)}
                disabled={!isEditing}
                placeholder="Enter a new password (min. 8 characters)"
                {...register("new_password", {
                  required: isEditing ? "New Password is required" : false,
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
            </div>
            {errors.new_password && (
              <p className="text-red-600 text-sm mt-2">• {errors.new_password.message}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="form-group">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className={inputClasses(errors.confirm_new_password)}
                disabled={!isEditing}
                placeholder="Re-enter your new password"
                {...register("confirm_new_password", {
                  validate: (value) =>
                    !isEditing || value === watch("new_password") || "Passwords do not match",
                })}
              />
            </div>
            {errors.confirm_new_password && (
              <p className="text-red-600 text-sm mt-2">• {errors.confirm_new_password.message}</p>
            )}
          </div>

          {/* Show Password Toggle */}
          {isEditing && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition font-medium text-sm"
              >
                {showPassword ? (
                  <>
                    <FiEyeOff className="w-4 h-4" />
                    Hide Password
                  </>
                ) : (
                  <>
                    <FiEye className="w-4 h-4" />
                    Show Password
                  </>
                )}
              </button>
            </div>
          )}

          {/* Password Requirements */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">Password Requirements:</p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>✓ At least 8 characters</li>
              <li>✓ Mix of uppercase and lowercase letters</li>
              <li>✓ At least one number</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;