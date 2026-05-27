function NotificationCenter() {

    const notifications = [

        {
            id: 1,
            icon: "📦",
            title: "New Order Received",
            message:
                "Order #1203 placed successfully.",
            time: "2 mins ago"
        },

        {
            id: 2,
            icon: "🚚",
            title: "Delivery Started",
            message:
                "Vendor is out for delivery.",
            time: "5 mins ago"
        },

        {
            id: 3,
            icon: "⭐",
            title: "New Review Added",
            message:
                "Customer rated 5 stars.",
            time: "12 mins ago"
        },

        {
            id: 4,
            icon: "💰",
            title: "Revenue Increased",
            message:
                "Today's revenue crossed ₹12,000.",
            time: "20 mins ago"
        }
    ];

    return (

        <div className="notification-center">

            <h2>
                🔔 Live Notifications
            </h2>

            <div className="notification-grid">

                {
                    notifications.map((item) => (

                        <div
                            className="notification-card"
                            key={item.id}
                        >

                            <div className="notification-top">

                                <h3>

                                    {item.icon}
                                    {" "}
                                    {item.title}

                                </h3>

                                <span>
                                    {item.time}
                                </span>

                            </div>

                            <p>
                                {item.message}
                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default NotificationCenter;