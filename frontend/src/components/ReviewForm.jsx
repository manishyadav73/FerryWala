import { useState } from "react";

import { toast } from "react-toastify";

function ReviewForm({ orderId }) {

    const [rating, setRating] =
        useState(5);

    const [review, setReview] =
        useState("");

    // SUBMIT REVIEW
    const submitReview = () => {

        const newReview = {

            orderId,

            rating,

            review,

            createdAt:
                new Date().toISOString()
        };

        const existingReviews =
            JSON.parse(

                localStorage.getItem(
                    "vendorReviews"
                )

            ) || [];

        localStorage.setItem(

            "vendorReviews",

            JSON.stringify([

                newReview,
                ...existingReviews
            ])
        );

        toast.success(
            "⭐ Review Submitted"
        );

        setReview("");
    };

    return (

        <div className="review-form">

            <h3>
                ⭐ Rate Your Experience
            </h3>

            <select
                value={rating}
                onChange={(e) =>
                    setRating(e.target.value)
                }
            >

                <option value={5}>
                    ⭐⭐⭐⭐⭐
                </option>

                <option value={4}>
                    ⭐⭐⭐⭐
                </option>

                <option value={3}>
                    ⭐⭐⭐
                </option>

                <option value={2}>
                    ⭐⭐
                </option>

                <option value={1}>
                    ⭐
                </option>

            </select>

            <textarea

                placeholder="Write your review..."

                value={review}

                onChange={(e) =>
                    setReview(e.target.value)
                }
            />

            <button
                onClick={submitReview}
            >

                Submit Review

            </button>

        </div>
    );
}

export default ReviewForm;