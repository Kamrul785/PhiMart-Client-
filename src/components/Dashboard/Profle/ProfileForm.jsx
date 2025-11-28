import { FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ProfileForm = ({ register, errors, isEditing }) => {
  const inputClasses = (error) => `
    w-full px-4 py-2.5 border-2 rounded-lg transition focus:outline-none
    ${error 
      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
      : isEditing
      ? 'border-gray-300 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
      : 'border-gray-200 bg-gray-50 text-gray-600'
    }
    disabled:opacity-75 disabled:cursor-not-allowed
  `;

  const labelClasses = "block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2";

  return (
    <div className="space-y-6">
      {/* First & Last Name Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="form-group">
          <label className={labelClasses}>
            <FiUser className="w-4 h-4 text-teal-600" />
            First Name
          </label>
          <input
            type="text"
            className={inputClasses(errors.first_name)}
            disabled={!isEditing}
            {...register("first_name", {
              required: isEditing ? "First Name is required" : false,
            })}
          />
          {errors.first_name && (
            <p className="mt-2 text-sm text-red-600">• {errors.first_name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label className={labelClasses}>
            <FiUser className="w-4 h-4 text-teal-600" />
            Last Name
          </label>
          <input
            type="text"
            className={inputClasses(errors.last_name)}
            disabled={!isEditing}
            {...register("last_name", { 
              required: isEditing ? "Last Name is required" : false 
            })}
          />
          {errors.last_name && (
            <p className="mt-2 text-sm text-red-600">• {errors.last_name.message}</p>
          )}
        </div>
      </div>

      {/* Email Address */}
      <div className="form-group">
        <label className={labelClasses}>
          <FiMail className="w-4 h-4 text-teal-600" />
          Email Address
        </label>
        <input
          type="email"
          className={inputClasses(errors.email)}
          disabled
          {...register("email")}
        />
        <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
      </div>

      {/* Phone & Address Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Phone Number */}
        <div className="form-group">
          <label className={labelClasses}>
            <FiPhone className="w-4 h-4 text-teal-600" />
            Phone Number
          </label>
          <input
            type="text"
            className={inputClasses(errors.phone_number)}
            disabled={!isEditing}
            placeholder="+1 (555) 000-0000"
            {...register("phone_number")}
          />
          {errors.phone_number && (
            <p className="mt-2 text-sm text-red-600">• {errors.phone_number.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="form-group">
          <label className={labelClasses}>
            <FiMapPin className="w-4 h-4 text-teal-600" />
            Address
          </label>
          <input
            type="text"
            className={inputClasses(errors.address)}
            disabled={!isEditing}
            placeholder="City, Country"
            {...register("address")}
          />
          {errors.address && (
            <p className="mt-2 text-sm text-red-600">• {errors.address.message}</p>
          )}
        </div>
      </div>

      {/* Info Message */}
      {!isEditing && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            Click the <strong>Edit Profile</strong> button to make changes
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
