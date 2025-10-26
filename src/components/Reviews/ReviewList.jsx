import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({
  reviews,
  user,
  editReview,
  setEditReview,
  editingId,
  setEditingId,
  handleUpdateReview,
  handleReviewDelete
}) => {
  return reviews.map((review) => (
    <ReviewCard
      key={review.id}
      review={review}
      user={user}
      editReview={editReview}
      setEditReview={setEditReview}
      isEditing={editingId === review.id}
      onEditClick={() => {
        setEditingId(review.id);
        setEditReview({
          ratings: review.ratings,
          comment: review.comment,
        });
      }}
      onCancelEdit={() => setEditingId(null)}
      onSaveEdit={handleUpdateReview}
      onDelete={handleReviewDelete}
    />
  ));
};

export default ReviewList;
