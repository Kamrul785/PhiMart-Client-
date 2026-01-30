import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hook/useAuthContext.js";
import ErrorAlert from "../components/ErrorAlert.jsx";
import { useState } from "react";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { errorMsg, loginUser } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      console.log(response)
      if(response.success) navigate("/dashboard");
    } catch (error) {
      <ErrorAlert error={error} />;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Gradient */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-8 sm:px-8 sm:py-10">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-teal-100">Sign in to your PhiMart account</p>
          </div>

          {/* Form Container */}
          <div className="px-6 py-8 sm:px-8">
            {/* Error Alert */}
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <ErrorAlert error={errorMsg} />
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
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

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
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
                    {...register("password", { required: "Password is required" })}
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>•</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  to="/reset-password" 
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium transition"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-2.5 rounded-lg transition transform hover:scale-105 active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </>
                )}
              </button>
            </form>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-teal-600 font-bold text-lg">100%</div>
                  <div className="text-xs text-gray-600">Secure</div>
                </div>
                <div className="text-center">
                  <div className="text-teal-600 font-bold text-lg">24/7</div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link 
                  to="/register" 
                  className="text-teal-600 hover:text-teal-700 font-semibold transition"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>By signing in, you agree to our <Link to="#" className="text-teal-600 hover:underline">Terms of Service</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
