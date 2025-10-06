import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuthContext from "../../hook/useAuthContext";
import ErrorAlert from "../ErrorAlert";

const RequestPasswordReset = () => {
  const { resetPassword, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const response = await resetPassword(data.email);
      if (response.success) {
        setSuccessMsg(response.message);
        reset(); 
      }
    } catch (error) {
      console.error("Password reset request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Reset Password</h2>
          <p className="text-base-content/70">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>

          {errorMsg && <ErrorAlert error={errorMsg} />}

          {successMsg && (
            <div className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="form-control">
              <label className="label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full `}
              disabled={loading}
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestPasswordReset;
