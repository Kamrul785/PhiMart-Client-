import React from "react";
import StarRating from "./StarRating";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";

const ReviewForm = ({ onSubmit }) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const ratingValue = watch("ratings", 0);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {/* Rating Section */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          ⭐ Your Rating
        </label>
        <StarRating
          onChange={(value) => setValue("ratings", value)}
          rating={ratingValue}
        />
        {errors.ratings && (
          <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
            <span>✗</span> Rating is required
          </p>
        )}
        <input type="hidden" {...register("ratings", { required: true })} />
      </div>

      {/* Comment Section */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          📝 Your Review
        </label>
        <textarea
          {...register("comment", { 
            required: "Review comment is required",
            minLength: {
              value: 10,
              message: "Review must be at least 10 characters"
            }
          })}
          className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition resize-none min-h-32 sm:min-h-40 ${
            errors.comment 
              ? "border-red-400 focus:ring-red-500" 
              : "border-gray-200 focus:border-teal-500"
          }`}
          placeholder="Share your experience with this product... (minimum 10 characters)"
        />
        {errors.comment && (
          <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
            <span>✗</span> {errors.comment.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <FiSend className="w-4 h-4" />
            <span>Submit Review</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ReviewForm;
