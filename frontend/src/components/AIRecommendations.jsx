import { useEffect, useState } from "react";

function AIRecommendations() {

    const [recommendations, setRecommendations] =
        useState([]);

    useEffect(() => {

        const orders = JSON.parse(

            localStorage.getItem(
                "vendorOrders"
            )

        ) || [];

        const recommended = [];

        // ANALYZE ORDER HISTORY
        orders.forEach((order) => {

            order.items?.forEach((item) => {

                // FRUITS
                if (
                    item.category === "Fruits"
                ) {

                    recommended.push(

                        "🍎 Fresh Apples"
                    );

                    recommended.push(

                        "🍌 Organic Bananas"
                    );
                }

                // VEGETABLES
                if (
                    item.category === "Vegetables"
                ) {

                    recommended.push(

                        "🥦 Fresh Broccoli"
                    );

                    recommended.push(

                        "🥕 Organic Carrots"
                    );
                }

                // SNACKS
                if (
                    item.category === "Snacks"
                ) {

                    recommended.push(

                        "🍟 Street Style Snacks"
                    );
                }
            });
        });

        // REMOVE DUPLICATES
        const uniqueRecommendations = [

            ...new Set(recommended)
        ];

        setRecommendations(
            uniqueRecommendations
        );

    }, []);

    return (

        <div className="ai-recommendations">

            <h2>
                🤖 AI Recommendations
            </h2>

            {
                recommendations.length === 0

                    ?

                    (

                        <p>

                            No recommendations yet.
                            Start ordering to unlock AI suggestions.

                        </p>
                    )

                    :

                    (

                        <div className="recommendation-grid">

                            {
                                recommendations.map(

                                    (item, index) => (

                                        <div
                                            key={index}
                                            className="recommendation-card"
                                        >

                                            {item}

                                        </div>
                                    )
                                )
                            }

                        </div>
                    )
            }

        </div>
    );
}

export default AIRecommendations;