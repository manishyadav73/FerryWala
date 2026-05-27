import { useEffect, useState } from "react";

function VendorReviews() {

    const [reviews, setReviews] =
        useState([]);

    const [averageRating, setAverageRating] =
        useState(0);

    useEffect(() => {

        const storedReviews = JSON.parse(

            localStorage.getItem(
                "vendorReviews"
            )

        ) || [];

        setReviews(storedReviews);

        // AVG RATING
        if (storedReviews.length > 0) {

            const totalRating =
                storedReviews.reduce(

                    (sum, review) =>

                        sum +
                        Number(review.rating),

                    0
                );

            setAverageRating(

                (
                    totalRating /
                    storedReviews.length
                ).toFixed(1)
            );
        }

    }, []);

    return (

        <div className="vendor-reviews">

            <h2>
                ⭐ Vendor Reviews
            </h2>

            <div className="rating-summary">

                <h3>

                    Average Rating:
                    {" "}

                    ⭐ {averageRating}

                </h3>

                <p>

                    Total Reviews:
                    {" "}

                    {reviews.length}

                </p>

            </div>

            <div className="reviews-list">

                {
                    reviews.length === 0

                        ?

                        (

                            <p>
                                No reviews yet.
                            </p>
                        )

                        :

                        (

                            reviews.map((review, index) => (

                                <div
                                    key={index}
                                    className="review-card"
                                >

                                    <h4>

                                        ⭐
                                        {" "}

                                        {review.rating}/5

                                    </h4>

                                    <p>

                                        {
                                            review.review
                                        }

                                    </p>

                                    <span>

                                        {
                                            new Date(

                                                review.createdAt

                                            ).toLocaleString()
                                        }

                                    </span>

                                </div>
                            ))
                        )
                }

            </div>

        </div>
    );
}

export default VendorReviews;