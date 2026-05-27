import { useEffect, useState } from "react";

function AIPredictions() {

    const [predictions, setPredictions] =
        useState([]);

    useEffect(() => {

        const orders = JSON.parse(

            localStorage.getItem(
                "vendorOrders"
            )

        ) || [];

        // CATEGORY COUNT
        const categoryMap = {};

        orders.forEach((order) => {

            order.items?.forEach((item) => {

                const category =
                    item.category;

                if (!categoryMap[category]) {

                    categoryMap[category] = 0;
                }

                categoryMap[category] += 1;
            });
        });

        // GENERATE AI INSIGHTS
        const insights = Object.keys(
            categoryMap
        ).map((category) => ({

            category,

            count:
                categoryMap[category],

            message:

                categoryMap[category] > 5

                    ? `🔥 High demand predicted for ${category}`

                    : `📈 Moderate demand for ${category}`
        }));

        setPredictions(insights);

    }, []);

    return (

        <div className="ai-predictions">

            <h2>
                🤖 AI Demand Predictions
            </h2>

            {
                predictions.length > 0 ? (

                    predictions.map((prediction, index) => (

                        <div
                            key={index}
                            className="prediction-card"
                        >

                            <h3>
                                {prediction.category}
                            </h3>

                            <p>
                                {prediction.message}
                            </p>

                            <span>

                                Orders:
                                {" "}
                                {prediction.count}

                            </span>

                        </div>
                    ))

                ) : (

                    <p>

                        No AI insights available yet.

                    </p>
                )
            }

        </div>
    );
}

export default AIPredictions;