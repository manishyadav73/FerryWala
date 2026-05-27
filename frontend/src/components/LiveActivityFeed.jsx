function LiveActivityFeed() {

    const activities = [

        "🛒 New order placed in Chennai",

        "🚚 Vendor started delivery",

        "⭐ Customer rated 5 stars",

        "💰 Revenue increased by ₹1200",

        "📦 14 new products added",

        "🔥 FerryWala trending in local area"
    ];

    return (

        <div className="live-feed">

            <h2>
                ⚡ Live Platform Activity
            </h2>

            <div className="feed-container">

                {
                    activities.map(

                        (item, index) => (

                            <div
                                key={index}

                                className="feed-item"
                            >

                                {item}

                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}

export default LiveActivityFeed;