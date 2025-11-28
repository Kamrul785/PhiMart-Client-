import React from "react";
import { FiStar, FiEdit2, FiTrash2 } from "react-icons/fi";
import EditReviewForm from "./EditReviewForm";

const ReviewCard = ({
  review,
  user,
  editReview,
  setEditReview,
  onEditClick,
  isEditing,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-800 text-base truncate">{review.user.name}</p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < review?.ratings
                      ? "fill-yellow-400 stroke-yellow-400"
                      : "stroke-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-2">({review.ratings} stars)</span>
            </div>
          </div>

          {/* Action Buttons */}
          {user && user.id == review.user.id && !isEditing && (
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={onEditClick}
                className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap"
              >
                <FiEdit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete(review.id)}
                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap"
              >
                <FiTrash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Review Content or Edit Form */}
        {isEditing ? (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <EditReviewForm
              editReview={editReview}
              setEditReview={setEditReview}
              onCancelEdit={onCancelEdit}
              onSave={() => onSaveEdit(review.id)}
            />
          </div>
        ) : (
          <div className="mt-3">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base break-words">
              {review.comment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
