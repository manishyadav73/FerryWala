function AIInsightsPanel() {

    const insights = [

        {
            title:
                "High Demand Area",

            description:
                "Vegetable orders are rapidly increasing in Chennai South.",

            icon: "📈"
        },

        {
            title:
                "Fastest Vendor",

            description:
                "Ravi Vegetables has fastest average delivery time today.",

            icon: "🚚"
        },

        {
            title:
                "Trending Product",

            description:
                "Tomatoes and Bananas are currently trending.",

            icon: "🔥"
        },

        {
            title:
                "Customer Growth",

            description:
                "Platform customer activity increased by 28% this week.",

            icon: "👥"
        }
    ];

    return (

        <div className="ai-panel">

            <h2>
                🤖 Smart AI Insights
            </h2>

            <div className="ai-panel-grid">

                {
                    insights.map(

                        (item, index) => (

                            <div
                                key={index}

                                className="ai-panel-card"
                            >

                                <h3>

                                    {item.icon}
                                    {" "}
                                    {item.title}

                                </h3>

                                <p>
                                    {item.description}
                                </p>

                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}

export default AIInsightsPanel;