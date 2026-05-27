import { useEffect, useState } from "react";

function SmartRouteAI() {

    const [recommendation, setRecommendation] =
        useState(null);

    useEffect(() => {

        const orders = JSON.parse(

            localStorage.getItem(
                "vendorOrders"
            )

        ) || [];

        // NO DATA
        if (orders.length === 0) {

            setRecommendation({

                area: "No Data",

                category: "Unknown",

                profit: 0,

                message:
                    "No demand insights available yet."
            });

            return;
        }

        // CATEGORY COUNTS
        const categoryMap = {};

        let totalRevenue = 0;

        orders.forEach((order) => {

            totalRevenue +=
                order.totalAmount || 0;

            order.items?.forEach((item) => {

                if (
                    !categoryMap[item.category]
                ) {

                    categoryMap[
                        item.category
                    ] = 0;
                }

                categoryMap[
                    item.category
                ] += 1;
            });
        });

        // TOP CATEGORY
        const topCategory =
            Object.keys(categoryMap)

                .reduce((a, b) =>

                    categoryMap[a] >
                    categoryMap[b]

                        ? a

                        : b
                );

        // AI AREA SIMULATION
        const smartAreas = [

            "Anna Nagar",

            "T Nagar",

            "Velachery",

            "Tambaram",

            "Guindy"
        ];

        const randomArea =

            smartAreas[
                Math.floor(
                    Math.random()
                    *
                    smartAreas.length
                )
            ];

        setRecommendation({

            area: randomArea,

            category: topCategory,

            profit: totalRevenue,

            message:

                `🚀 Move toward ${randomArea}. High demand detected for ${topCategory}.`
        });

    }, []);

    return (

        <div className="smart-route-ai">

            <h2>
                🤖 Smart Route AI
            </h2>

            {
                recommendation && (

                    <div className="smart-route-card">

                        <h3>

                            📍 Suggested Area:
                            {" "}

                            {
                                recommendation.area
                            }

                        </h3>

                        <p>

                            🔥 High Demand:
                            {" "}

                            {
                                recommendation.category
                            }

                        </p>

                        <p>

                            💰 Expected Revenue:
                            {" "}

                            ₹
                            {" "}

                            {
                                recommendation.profit
                            }

                        </p>

                        <p>

                            {
                                recommendation.message
                            }

                        </p>

                    </div>
                )
            }

        </div>
    );
}

export default SmartRouteAI;