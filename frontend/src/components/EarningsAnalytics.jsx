import { useEffect, useState } from "react";

function EarningsAnalytics() {

    const [analytics, setAnalytics] =
        useState({

            totalRevenue: 0,

            totalOrders: 0,

            averageOrder: 0,

            topCategory: "N/A"
        });

    useEffect(() => {

        const currentVendor = JSON.parse(

            localStorage.getItem(
                "currentVendor"
            )
        );

        const allOrders = JSON.parse(

            localStorage.getItem(
                "vendorOrders"
            )

        ) || [];

        // FILTER VENDOR ORDERS
        const vendorOrders = allOrders.filter(

            (order) =>

                order.vendorId ===
                currentVendor?.id
        );

        let revenue = 0;

        const categoryMap = {};

        vendorOrders.forEach((order) => {

            revenue +=
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

        setAnalytics({

            totalRevenue: revenue,

            totalOrders:
                vendorOrders.length,

            averageOrder:

                vendorOrders.length > 0

                    ?

                    (
                        revenue /
                        vendorOrders.length
                    ).toFixed(0)

                    :

                    0,

            topCategory
        });

    }, []);

    return (

        <div className="earnings-analytics">

            <h2>
                💰 Earnings Analytics
            </h2>

            <div className="analytics-grid">

                <div className="analytics-card">

                    <h3>
                        Total Revenue
                    </h3>

                    <p>
                        ₹ {analytics.totalRevenue}
                    </p>

                </div>

                <div className="analytics-card">

                    <h3>
                        Total Orders
                    </h3>

                    <p>
                        {analytics.totalOrders}
                    </p>

                </div>

                <div className="analytics-card">

                    <h3>
                        Avg Order Value
                    </h3>

                    <p>
                        ₹ {analytics.averageOrder}
                    </p>

                </div>

                <div className="analytics-card">

                    <h3>
                        Top Category
                    </h3>

                    <p>
                        {analytics.topCategory}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default EarningsAnalytics;