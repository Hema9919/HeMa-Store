"use client";

import { useState } from "react";
import { Star, X, Send, MessageSquare } from "lucide-react";

interface AddReviewProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { review: string; rating: number }) => void;
}

export default function AddReview({
  isOpen,
  onClose,
  onSubmit,
}: AddReviewProps) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const selectedRating = hoverRating || rating;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!review.trim()) return;
    if (rating === 0) return;

    setIsSubmitting(true);

    try {
      const data = {
        review: review.trim(),
        rating,
      };

      console.log(data);

      onSubmit?.(data);

      setReview("");
      setRating(0);
      setHoverRating(0);

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = () => {
    switch (selectedRating) {
      case 1:
        return "Very Bad";
      case 2:
        return "Not Good";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Select your rating";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient */}
        <div className="h-2 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600" />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <MessageSquare className="h-6 w-6" />
            </div>

            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Write a Review
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Share your experience with this product.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="mb-3 block text-sm font-bold text-slate-700">
                Your Rating
              </label>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="rounded-lg p-1 transition-transform duration-200 hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 transition-all duration-200 ${
                            star <= selectedRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <p
                    className={`mt-3 text-sm font-bold ${
                      selectedRating
                        ? "text-amber-500"
                        : "text-slate-400"
                    }`}
                  >
                    {getRatingText()}
                  </p>
                </div>
              </div>
            </div>

            {/* Review */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="review"
                  className="text-sm font-bold text-slate-700"
                >
                  Your Review
                </label>

                <span className="text-xs text-slate-400">
                  {review.length}/500
                </span>
              </div>

              <textarea
                id="review"
                value={review}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setReview(e.target.value);
                  }
                }}
                placeholder="Tell us what you think about this product..."
                rows={5}
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="h-12 flex-1 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !review.trim() ||
                  rating === 0
                }
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}