import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuthContext from "../hook/useAuthContext";
import ErrorAlert from "../components/ErrorAlert.jsx";
import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";

const Register = () => {
  const { registerUser, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    delete data.confirm_Password;
    try {
      const response = await registerUser(data);
      if (response.success) {
        setSuccessMsg(response.message);
      }
    } catch (error) {
      console.log("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl animate-fade-in-up">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Gradient */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-8 sm:px-8 sm:py-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-teal-100">
              Join PhiMart and start shopping today
            </p>
          </div>

          {/* Form Container */}
          <div className="px-6 py-8 sm:px-8">
            {/* Success Alert */}
            {successMsg && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900">Success!</h3>
                  <p className="text-sm text-green-700">{successMsg}</p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <ErrorAlert error={errorMsg} />
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="form-group">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      id="first_name"
                      type="text"
                      placeholder="John"
                      className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg transition focus:outline-none ${
                        errors.first_name
                          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      }`}
                      {...register("first_name", {
                        required: "First name is required",
                      })}
                    />
                  </div>
                  {errors.first_name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>•</span> {errors.first_name.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="form-group">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      id="last_name"
                      type="text"
                      placeholder="Doe"
                      className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg transition focus:outline-none ${
                        errors.last_name
                          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      }`}
                      {...register("last_name", {
                        required: "Last name is required",
                      })}
                    />
                  </div>
                  {errors.last_name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>•</span> {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg transition focus:outline-none ${
                      errors.email
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    }`}
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>•</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Contact Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="form-group">
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      id="phone_number"
                      type="text"
                      placeholder="01234567890"
                      className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 bg-gray-50 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition focus:outline-none"
                      {...register("phone_number")}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="form-group">
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      id="address"
                      type="text"
                      placeholder="City, Country"
                      className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 bg-gray-50 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition focus:outline-none"
                      {...register("address")}
                    />
                  </div>
                </div>
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div className="form-group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg transition focus:outline-none ${
                        errors.password
                          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      }`}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>•</span> {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg transition focus:outline-none ${
                        errors.confirm_Password
                          ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      }`}
                      {...register("confirm_Password", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                    />
                  </div>
                  {errors.confirm_Password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>•</span> {errors.confirm_Password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-2.5 rounded-lg transition transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2 group mt-6"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>

              {/* Terms */}
              <p className="text-center text-xs text-gray-600">
                By creating an account, you agree to our{" "}
                <Link to="#" className="text-teal-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-teal-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </form>

            {/* Divider */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              {/* Sign In Link */}
              <div className="text-center mb-3">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-teal-600 hover:text-teal-700 font-semibold transition"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Resend Activation Link */}
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Haven't received activation email?{" "}
                  <Link
                    to="/resend-activation"
                    className="text-teal-600 hover:text-teal-700 font-semibold transition"
                  >
                    Resend it
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
