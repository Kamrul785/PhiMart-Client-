import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import authApliClient from "../../services/auth-api-client";
import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hook/useAuthContext";

const ReviewSection = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [userCanReview, setUserCanReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editReview, setEditReview] = useState({ ratings: 0, Comment: "" });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuthContext();

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get(`/products/${productId}/reviews/`);
      setReviews(res.data);
    } catch (error) {
      console.log("Error feching reviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    console.log(productId);
    try {
      await authApliClient.post(`/products/${productId}/reviews/`, data);
      fetchReviews();
    } catch (error) {
      console.log("Error submitting review", error);
    }
  };

  const checkUserPermission = async () => {
    const res = await authApliClient.get(`/orders/has-ordered/${productId}/`);
    setUserCanReview(res.data.has_ordered);
    // console.log(res.data);
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      const res = await authApliClient.put(
        `/products/${productId}/reviews/${reviewId}/`,
        editReview
      );
      setEditingId(null);
      fetchReviews();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      await authApliClient.delete(
        `/products/${productId}/reviews/${reviewId}/`
      );
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserPermission();
    fetchReviews();
  }, []);

  return (
    <div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="badge badge-lg">
          {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
        </div>
      </div>

      {userCanReview && (
        <div className="card bg-base-100 shadow-lg border border-base-200 rounded-xl overflow-hidden">
          <div className="card-body">
            <h3 className="card-title text-lg">Write a Review</h3>
            <ReviewForm onSubmit={onSubmit} />
          </div>
        </div>
      )}

      <div className="divider"></div>

      {/* <ReviewList reviews={reviews} /> */}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
          <p className="text-base-content/70">
            Be the first to review this product!
          </p>
        </div>
      ) : (
        <ReviewList
          reviews={reviews}
          user={user}
          editReview={editReview}
          setEditReview={setEditReview}
          editingId={editingId}
          setEditingId={setEditingId}
          handleUpdateReview={handleUpdateReview}
          handleReviewDelete={handleReviewDelete}
        />
      )}
    </div>
  );
};

export default ReviewSection;
