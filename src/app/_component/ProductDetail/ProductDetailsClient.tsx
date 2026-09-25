"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "@/api/services/reviewApi";

import type { Review } from "../../../api/types/reviewsTypes";

import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  PackageCheck,
  Loader2,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import AddReview from "../ModelReview/AddReview";

interface ProductDetailsClientProps {
  product: any;
}

export default function ProductDetailsClient({
  product,
}: ProductDetailsClientProps) {
  // =========================
  // Product States
  // =========================

  const [selectedImage, setSelectedImage] = useState(
    product.imageCover
  );

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // =========================
  // Review States
  // =========================

  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [editingReview, setEditingReview] =
    useState<Review | null>(null);

  const [productReviews, setProductReviews] = useState<Review[]>(
    product.reviews || []
  );

  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // =========================
  // Session
  // =========================

  const {
    data: session,
    status: sessionStatus,
  } = useSession();

  // =========================
  // Cart / Wishlist
  // =========================

  const {
    addToCartAction,
    updateQuantityAction,
  } = useCart();

  const {
    isInWishlist,
    toggleWishlistAction,
  } = useWishlist();

  // =========================
  // Product ID
  // =========================

  const productId = product.id || product._id;

  // =========================
  // Product Data
  // =========================

  const {
    title,
    description,
    price,
    priceAfterDiscount,
    imageCover,
    images,
    quantity: stockQuantity,
    ratingsAverage,
    ratingsQuantity,
    sold,
    brand,
    category,
    subcategory,
  } = product;

  // =========================
  // Fetch Reviews
  // =========================

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) return;

      try {
        setIsLoadingReviews(true);

        const response = await getProductReviews(productId);

        setProductReviews(response.data || []);
      } catch (error) {
        console.error(
          "Failed to fetch reviews:",
          error
        );
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // =========================
  // Check Review Owner
  // =========================

  const isReviewOwner = (review: Review) => {
    if (sessionStatus !== "authenticated") {
      return false;
    }

    return session?.user?.id === review.user?._id;
  };

  // =========================
  // Add Review
  // =========================

  const handleAddReview = async (data: {
    review: string;
    rating: number;
  }) => {
    const token = session?.accessToken;

    if (!token) {
      toast.error("Please login first");
      throw new Error("Authentication required");
    }

    try {
      await addReview(
        productId,
        token,
        data.review,
        data.rating
      );

      toast.success("Review added successfully");

      // Refresh reviews
      const response = await getProductReviews(productId);

      setProductReviews(response.data || []);
    } catch (error) {
      console.error(
        "Add review error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add review"
      );

      throw error;
    }
  };

  // =========================
  // Update Review
  // =========================

  const handleUpdateReview = async (data: {
    review: string;
    rating: number;
  }) => {
    const token = session?.accessToken;

    if (!token) {
      toast.error("Please login first");
      throw new Error("Authentication required");
    }

    if (!editingReview) {
      toast.error("No review selected");
      throw new Error("No review selected");
    }

    try {
      await updateReview(
        editingReview._id,
        token,
        data.review,
        data.rating
      );

      toast.success("Review updated successfully");

      // Refresh reviews
      const response = await getProductReviews(productId);

      setProductReviews(response.data || []);

      // Clear editing state
      setEditingReview(null);
    } catch (error) {
      console.error(
        "Update review error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update review"
      );

      // Important:
      // AddReview catches this and keeps modal open
      throw error;
    }
  };

  // =========================
  // Delete Review
  // =========================

  const handleDeleteReview = async (
    reviewId: string
  ) => {
    const token = session?.accessToken;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteReview(
        reviewId,
        token
      );

      toast.success(
        "Review deleted successfully"
      );

      // Refresh reviews
      const response = await getProductReviews(productId);

      setProductReviews(response.data || []);
    } catch (error) {
      console.error(
        "Delete review error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete review"
      );
    }
  };

  // =========================
  // Wishlist
  // =========================

  const isFavorite = isInWishlist(productId);

  // =========================
  // Images
  // =========================

  const allImages = [
    imageCover,
    ...(images || []),
  ].filter(
    (image, index, array) =>
      array.indexOf(image) === index
  );

  // =========================
  // Discount
  // =========================

  const hasDiscount =
    priceAfterDiscount &&
    priceAfterDiscount < price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((price - priceAfterDiscount) / price) *
          100
      )
    : 0;

  // =========================
  // Stock
  // =========================

  const isOutOfStock =
    stockQuantity <= 0;

  // =========================
  // Quantity
  // =========================

  const increaseQuantity = () => {
    if (quantity < stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // =========================
  // Render
  // =========================

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* ================= BREADCRUMB ================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-sm sm:px-6 lg:px-8">

          <Link
            href="/"
            className="text-slate-400 transition hover:text-indigo-600"
          >
            Home
          </Link>

          <ChevronRight
            size={15}
            className="text-slate-300"
          />

          <Link
            href="/shop"
            className="text-slate-400 transition hover:text-indigo-600"
          >
            Shop
          </Link>

          <ChevronRight
            size={15}
            className="text-slate-300"
          />

          <span className="max-w-[200px] truncate font-medium text-slate-700">
            {title}
          </span>

        </div>
      </div>

      {/* ================= PRODUCT ================= */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">

          {/* ================= LEFT - IMAGES ================= */}

          <div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">

              {/* Discount */}

              {hasDiscount && (
                <div className="absolute left-5 top-5 z-10 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  -{discountPercentage}%
                </div>
              )}

              {/* Main Image */}

              <div className="relative aspect-square w-full">

                <Image
                  src={selectedImage}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-8 transition-all duration-500"
                />

              </div>

              {/* Wishlist */}

              <button
                type="button"
                onClick={() =>
                  toggleWishlistAction(productId)
                }
                className={`
                  absolute right-5 top-5 flex h-12 w-12
                  items-center justify-center rounded-full
                  border shadow-sm backdrop-blur
                  transition-all duration-300
                  ${
                    isFavorite
                      ? "border-red-100 bg-red-50 text-red-500"
                      : "border-slate-200 bg-white/90 text-slate-600 hover:text-red-500"
                  }
                `}
              >
                <Heart
                  size={21}
                  fill={
                    isFavorite
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

            </div>

            {/* Thumbnail Images */}

            <div className="mt-4 grid grid-cols-5 gap-3">

              {allImages.map(
                (image: string, index: number) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectedImage(image)
                    }
                    className={`
                      relative aspect-square overflow-hidden
                      rounded-xl border-2 bg-white
                      transition-all duration-300
                      ${
                        selectedImage === image
                          ? "border-indigo-600 ring-2 ring-indigo-100"
                          : "border-slate-200 hover:border-slate-300"
                      }
                    `}
                  >
                    <Image
                      src={image}
                      alt={`${title} ${index + 1}`}
                      fill
                      sizes="100px"
                      className="object-contain p-2"
                    />
                  </button>
                )
              )}

            </div>

          </div>

          {/* ================= RIGHT - DETAILS ================= */}

          <div className="flex flex-col">

            {/* Brand */}

            <div className="mb-4 flex items-center gap-3">

              {brand?.image && (
                <div className="relative h-8 w-16">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              )}

              <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                {brand?.name}
              </span>

            </div>

            {/* Title */}

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h1>

            {/* Rating */}

            <div className="mt-5 flex flex-wrap items-center gap-4">

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <Star
                      key={star}
                      size={18}
                      fill={
                        star <=
                        Math.round(
                          ratingsAverage
                        )
                          ? "currentColor"
                          : "none"
                      }
                      className={
                        star <=
                        Math.round(
                          ratingsAverage
                        )
                          ? "text-amber-400"
                          : "text-slate-300"
                      }
                    />
                  )
                )}

              </div>

              <span className="font-bold text-slate-800">
                {Number(
                  ratingsAverage || 0
                ).toFixed(1)}
              </span>

              <span className="text-sm text-slate-400">
                ({ratingsQuantity || 0} Reviews)
              </span>

              <span className="h-5 w-px bg-slate-200" />

              <span className="text-sm text-slate-500">
                {sold || 0} sold
              </span>

            </div>

            {/* Price */}

            <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">

              <div className="flex items-end gap-3">

                <span className="text-4xl font-black tracking-tight text-slate-900">
                  $
                  {hasDiscount
                    ? priceAfterDiscount
                    : price}
                </span>

                {hasDiscount && (
                  <span className="mb-1 text-lg font-medium text-slate-400 line-through">
                    ${price}
                  </span>
                )}

              </div>

              {hasDiscount && (
                <p className="mt-2 text-sm font-medium text-emerald-600">
                  You save $
                  {price - priceAfterDiscount}
                </p>
              )}

            </div>

            {/* Description */}

            <div className="mt-7">

              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
                Description
              </h2>

              <p className="whitespace-pre-line text-sm leading-7 text-slate-500">
                {description}
              </p>

            </div>

            {/* Category */}

            <div className="mt-6 flex flex-wrap gap-2">

              {category?.name && (
                <span className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
                  {category.name}
                </span>
              )}

              {subcategory?.map(
                (sub: any) => (
                  <span
                    key={sub._id}
                    className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600"
                  >
                    {sub.name}
                  </span>
                )
              )}

            </div>

            {/* Stock */}

            <div className="mt-7 flex items-center gap-3">

              <div
                className={`
                  flex h-9 w-9 items-center justify-center
                  rounded-full
                  ${
                    isOutOfStock
                      ? "bg-red-50 text-red-500"
                      : "bg-emerald-50 text-emerald-600"
                  }
                `}
              >
                {isOutOfStock ? (
                  <PackageCheck size={18} />
                ) : (
                  <Check size={18} />
                )}
              </div>

              <div>

                <p className="text-sm font-bold text-slate-800">
                  {isOutOfStock
                    ? "Out of Stock"
                    : "In Stock"}
                </p>

                {!isOutOfStock && (
                  <p className="text-xs text-slate-400">
                    {stockQuantity} items available
                  </p>
                )}

              </div>

            </div>

            {/* Quantity */}

            {!isOutOfStock && (
              <div className="mt-7">

                <p className="mb-3 text-sm font-bold text-slate-900">
                  Quantity
                </p>

                <div className="flex items-center gap-4">

                  <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white">

                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="flex h-full w-12 items-center justify-center text-slate-500 transition hover:text-indigo-600 disabled:opacity-30"
                    >
                      <Minus size={17} />
                    </button>

                    <span className="flex w-10 justify-center text-sm font-bold text-slate-900">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={
                        quantity >= stockQuantity
                      }
                      className="flex h-full w-12 items-center justify-center text-slate-500 transition hover:text-indigo-600 disabled:opacity-30"
                    >
                      <Plus size={17} />
                    </button>

                  </div>

                  <span className="text-xs text-slate-400">
                    Maximum {stockQuantity}
                  </span>

                </div>

              </div>
            )}

            {/* Add To Cart */}

            <div className="mt-7 flex gap-3">

              <button
                type="button"
                disabled={
                  isOutOfStock || isAdding
                }
                onClick={async () => {
                  setIsAdding(true);

                  const success =
                    await addToCartAction(
                      productId
                    );

                  if (
                    success &&
                    quantity > 1
                  ) {
                    await updateQuantityAction(
                      productId,
                      quantity
                    );
                  }

                  setIsAdding(false);
                }}
                className="
                  flex h-14 flex-1 items-center justify-center
                  gap-3 rounded-xl bg-indigo-600
                  px-6 text-sm font-bold text-white
                  shadow-lg shadow-indigo-200
                  transition-all duration-300
                  hover:bg-indigo-700
                  hover:shadow-xl hover:shadow-indigo-300
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:bg-slate-200
                  disabled:text-slate-400
                  disabled:shadow-none
                "
              >

                {isAdding ? (
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                ) : (
                  <ShoppingCart size={20} />
                )}

                {isOutOfStock
                  ? "Out of Stock"
                  : isAdding
                    ? "Adding to Cart..."
                    : "Add to Cart"}

              </button>

              <button
                type="button"
                onClick={() =>
                  toggleWishlistAction(
                    productId
                  )
                }
                className={`
                  flex h-14 w-14 shrink-0
                  items-center justify-center
                  rounded-xl border
                  transition-all duration-300
                  ${
                    isFavorite
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:text-red-500"
                  }
                `}
                aria-label="Toggle Wishlist"
              >
                <Heart
                  size={21}
                  fill={
                    isFavorite
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

            </div>

            {/* Features */}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <Truck
                  size={20}
                  className="mb-2 text-indigo-600"
                />

                <p className="text-xs font-bold text-slate-800">
                  Fast Delivery
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Quick shipping
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <ShieldCheck
                  size={20}
                  className="mb-2 text-indigo-600"
                />

                <p className="text-xs font-bold text-slate-800">
                  Secure Payment
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  100% secure
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <RotateCcw
                  size={20}
                  className="mb-2 text-indigo-600"
                />

                <p className="text-xs font-bold text-slate-800">
                  Easy Returns
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Hassle-free
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* ================= REVIEWS ================= */}

        <section className="mt-16 border-t border-slate-200 pt-12">

          {/* Review Header */}

          <div className="flex items-center justify-between gap-6">

            <div className="mb-8">

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Customer Feedback
              </span>

              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Customer Reviews
              </h2>

            </div>

            {/* Write Review */}

            {sessionStatus ===
              "authenticated" && (
              <button
                type="button"
                onClick={() => {
                  setEditingReview(null);
                  setIsReviewOpen(true);
                }}
                className="
                  flex h-14 shrink-0 items-center
                  justify-center gap-3 rounded-xl
                  bg-indigo-600 px-6 text-sm
                  font-bold text-white
                  shadow-lg shadow-indigo-200
                  transition-all duration-300
                  hover:bg-indigo-700
                  hover:shadow-xl hover:shadow-indigo-300
                  active:scale-[0.99]
                "
              >
                Write a Review
              </button>
            )}

          </div>

          {/* Add / Edit Review Modal */}

          <AddReview
            isOpen={isReviewOpen}
            onClose={() => {
              setIsReviewOpen(false);
              setEditingReview(null);
            }}
            mode={
              editingReview
                ? "edit"
                : "create"
            }
            initialReview={
              editingReview
                ? {
                    review:
                      editingReview.review,
                    rating:
                      editingReview.rating,
                  }
                : undefined
            }
            onSubmit={
              editingReview
                ? handleUpdateReview
                : handleAddReview
            }
          />

          {/* Reviews Grid */}

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

            {/* Rating Summary */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <div className="text-center">

                <p className="text-5xl font-black text-slate-900">
                  {Number(
                    ratingsAverage || 0
                  ).toFixed(1)}
                </p>

                <div className="mt-3 flex justify-center gap-1">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        size={18}
                        fill={
                          star <=
                          Math.round(
                            ratingsAverage
                          )
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          star <=
                          Math.round(
                            ratingsAverage
                          )
                            ? "text-amber-400"
                            : "text-slate-300"
                        }
                      />
                    )
                  )}

                </div>

                <p className="mt-3 text-sm text-slate-400">
                  Based on{" "}
                  {ratingsQuantity || 0}{" "}
                  reviews
                </p>

              </div>

            </div>

            {/* Reviews */}

            <div className="space-y-4">

              {isLoadingReviews ? (

                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

                  <Loader2
                    className="mx-auto animate-spin text-indigo-600"
                    size={28}
                  />

                  <p className="mt-3 text-sm text-slate-400">
                    Loading reviews...
                  </p>

                </div>

              ) : productReviews.length ? (

                productReviews.map(
                  (review) => (

                    <div
                      key={review._id}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >

                      {/* Review Header */}

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <p className="font-bold text-slate-900">
                            {review.user?.name ||
                              "Customer"}
                          </p>

                          <div className="mt-2 flex gap-1">

                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <Star
                                  key={star}
                                  size={14}
                                  fill={
                                    star <=
                                    review.rating
                                      ? "currentColor"
                                      : "none"
                                  }
                                  className={
                                    star <=
                                    review.rating
                                      ? "text-amber-400"
                                      : "text-slate-300"
                                  }
                                />
                              )
                            )}

                          </div>

                        </div>

                        {/* Date + Actions */}

                        <div className="flex flex-col items-end gap-2">

                          <span className="text-xs text-slate-400">
                            {new Date(
                              review.createdAt
                            ).toLocaleDateString()}
                          </span>

                          {/* Owner Actions */}

                          {isReviewOwner(
                            review
                          ) && (

                            <div className="flex items-center gap-2">

                              {/* Edit */}

                              <button
                                type="button"
                                onClick={() => {
                                  setEditingReview(
                                    review
                                  );

                                  setIsReviewOpen(
                                    true
                                  );
                                }}
                                className="
                                  rounded-lg px-3
                                  py-1.5 text-xs
                                  font-bold
                                  text-indigo-600
                                  transition
                                  hover:bg-indigo-50
                                "
                              >
                                Edit
                              </button>

                              {/* Delete */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteReview(
                                    review._id
                                  )
                                }
                                className="
                                  rounded-lg px-3
                                  py-1.5 text-xs
                                  font-bold
                                  text-red-600
                                  transition
                                  hover:bg-red-50
                                "
                              >
                                Delete
                              </button>

                            </div>

                          )}

                        </div>

                      </div>

                      {/* Review Text */}

                      <p className="mt-4 text-sm leading-6 text-slate-500">
                        {review.review}
                      </p>

                    </div>

                  )
                )

              ) : (

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

                  <p className="font-semibold text-slate-700">
                    No reviews yet
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Be the first to review
                    this product.
                  </p>

                </div>

              )}

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}