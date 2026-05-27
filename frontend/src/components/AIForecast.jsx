import { useEffect, useState } from "react";

function AIForecast() {

    const [forecast, setForecast] =
        useState({

            topCategory: "N/A",

            peakHour: "N/A",

            expectedOrders: 0
        });

    useEffect(() => {

        const orders = JSON.parse(

            localStorage.getItem(
                "vendorOrders"
            )

        ) || [];

        const categoryMap = {};

        const hourMap = {};

        // ANALYZE ORDERS
        orders.forEach((order) => {

            // CATEGORY ANALYSIS
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

            // HOUR ANALYSIS
            const hour = new Date(

                order.createdAt

            ).getHours();

            if (!hourMap[hour]) {

                hourMap[hour] = 0;
            }

            hourMap[hour] += 1;
        });

        // TOP CATEGORY
        const topCategory =

            Object.keys(categoryMap)
                .length > 0

                ?

                Object.keys(categoryMap)

                    .reduce((a, b) =>

                        categoryMap[a] >
                        categoryMap[b]

                            ? a

                            : b
                    )

                :

                "N/A";

        // PEAK HOUR
        const peakHour =

            Object.keys(hourMap)
                .length > 0

                ?

                Object.keys(hourMap)

                    .reduce((a, b) =>

                        hourMap[a] >
                        hourMap[b]

                            ? a

                            : b
                    )

                :

                "N/A";

        // EXPECTED ORDERS
        const expectedOrders =

            orders.length + 5;

        setForecast({

            topCategory,

            peakHour:
                peakHour !== "N/A"

                    ?

                    `${peakHour}:00`

                    :

                    "N/A",

            expectedOrders
        });

    }, []);

    return (

        <div className="ai-forecast">

            <h2>
                📈 AI Demand Forecast
            </h2>

            <div className="forecast-grid">

                <div className="forecast-card">

                    <h3>
                        🔥 Trending Category
                    </h3>

                    <p>
                        {forecast.topCategory}
                    </p>

                </div>

                <div className="forecast-card">

                    <h3>
                        ⏰ Peak Ordering Hour
                    </h3>

                    <p>
                        {forecast.peakHour}
                    </p>

                </div>

                <div className="forecast-card">

                    <h3>
                        📦 Expected Orders Tomorrow
                    </h3>

                    <p>
                        {forecast.expectedOrders}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default AIForecast;