import { useEffect, useState } from "react";

function AIDemandInsights() {

    const [aiInsights, setAiInsights] = useState([]);

    useEffect(() => {

        // GET REAL ORDERS
        const storedOrders = JSON.parse(
            localStorage.getItem("vendorOrders")
        ) || [];

        // NO DATA
        if (storedOrders.length === 0) {

            setAiInsights([

                {
                    area: "No Orders Yet",

                    demand: "Waiting for realtime demand",

                    earnings: "₹0",

                    growth: "0%",

                    recommendation:
                        "AI will analyze customer demand automatically."
                }
            ]);

            return;
        }

        // TOTAL EARNINGS
        const totalRevenue = storedOrders.reduce(

            (sum, order) =>

                sum + (order.totalAmount || 0),

            0
        );

        // TOTAL ORDERS
        const totalOrders = storedOrders.length;

        // SIMPLE AI LOGIC
        let recommendation = "";

        if (totalRevenue > 5000) {

            recommendation =
                "🔥 High earning zone detected. Stay active in this area.";
        }

        else if (totalRevenue > 2000) {

            recommendation =
                "📈 Demand increasing steadily in nearby zones.";
        }

        else {

            recommendation =
                "⚡ Moderate demand. Explore nearby busy areas.";
        }

        // AI RESULT
        setAiInsights([

            {
                area: "Current Active Zone",

                demand:
                    `${totalOrders} realtime orders detected`,

                earnings:
                    `₹${totalRevenue}`,

                growth:
                    `+${Math.min(
                        totalOrders * 8,
                        95
                    )}%`,

                recommendation
            }
        ]);

    }, []);

    return (

        <div className="ai-insights-container">

            <h2 className="ai-title">

                🤖 FerryWala AI Demand Insights

            </h2>

            <div className="ai-card-grid">

                {
                    aiInsights.map((item, index) => (

                        <div
                            key={index}
                            className="ai-card"
                        >

                            <h3>

                                📍 {item.area}

                            </h3>

                            <p>

                                🔥 Demand:
                                <strong>
                                    {" "}
                                    {item.demand}
                                </strong>

                            </p>

                            <p>

                                💰 Expected Earnings:
                                <strong>
                                    {" "}
                                    {item.earnings}
                                </strong>

                            </p>

                            <p>

                                📈 Demand Growth:
                                <strong>
                                    {" "}
                                    {item.growth}
                                </strong>

                            </p>

                            <div className="ai-recommendation">

                                🚀 {item.recommendation}

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default AIDemandInsights;