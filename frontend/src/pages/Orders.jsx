import { useEffect, useState } from "react";

import OrderTimeline from "../components/OrderTimeline";

import CustomerTrackingMap from "../components/CustomerTrackingMap";

import ReviewForm from "../components/ReviewForm";

import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

function Orders() {

    const [orders, setOrders] = useState([]);

    // PREVIOUS STATUS TRACKER
    const [previousStatuses, setPreviousStatuses] =
        useState({});

    // LIVE ORDER STATUS SYNC
    useEffect(() => {

        const fetchOrders = () => {

            const storedOrders = JSON.parse(

                localStorage.getItem(
                    "vendorOrders"
                )

            ) || [];

            setOrders(storedOrders);

            // DETECT STATUS CHANGES
            storedOrders.forEach((order) => {

                const oldStatus =
                    previousStatuses[order.id];

                // NEW STATUS UPDATE
                if (

                    oldStatus &&

                    oldStatus !== order.status

                ) {

                    toast.info(

                        `🔔 Order #${order.id} is now ${order.status}`
                    );
                }
            });

            // SAVE CURRENT STATUSES
            const updatedStatuses = {};

            storedOrders.forEach((order) => {

                updatedStatuses[order.id] =
                    order.status;
            });

            setPreviousStatuses(
                updatedStatuses
            );
        };

        // INITIAL FETCH
        fetchOrders();

        // AUTO REFRESH
        const interval = setInterval(() => {

            fetchOrders();

        }, 2000);

        return () => clearInterval(interval);

    }, [previousStatuses]);

    // STATUS COLOR
    const getStatusColor = (status) => {

        switch (status) {

            case "Order Accepted":
                return "#2563eb";

            case "Preparing":
                return "#f59e0b";

            case "Out For Delivery":
                return "#22c55e";

            case "Delivered":
                return "#16a34a";

            default:
                return "#6b7280";
        }
    };

    return (

        <>

            <Navbar />

            <div className="orders-page page-transition">

                <h1>
                    📦 My Orders
                </h1>

                {
                    orders.length === 0 ? (

                        <div className="empty-state">

                            <h2>
                                📦
                            </h2>

                            <h3>
                                No Orders Yet
                            </h3>

                            <p>

                                Your orders will appear
                                here once you place your
                                first order.

                            </p>

                            <button
                                onClick={() =>
                                    window.location.href = "/"
                                }
                            >

                                Explore Vendors

                            </button>

                        </div>

                    ) : (

                        orders.map((order) => (

                            <div
                                className="order-card"
                                key={order.id}
                            >

                                {/* HEADER */}

                                <div className="order-header">

                                    <h2>

                                        🛒 Order #{order.id}

                                    </h2>

                                    <span

                                        className="order-status"

                                        style={{
                                            background:
                                                getStatusColor(
                                                    order.status
                                                )
                                        }}
                                    >

                                        {order.status}

                                    </span>

                                </div>

                                {/* LIVE STATUS */}

                                <div className="live-badge">

                                    <div className="live-dot"></div>

                                    LIVE TRACKING ACTIVE

                                </div>

                                {/* ORDER INFO */}

                                <div className="order-info-grid">

                                    <div className="info-card">

                                        <h4>
                                            💰 Total
                                        </h4>

                                        <p>
                                            ₹ {order.totalAmount}
                                        </p>

                                    </div>

                                    <div className="info-card">

                                        <h4>
                                            📦 Items
                                        </h4>

                                        <p>

                                            {
                                                order.items?.length || 0
                                            }

                                        </p>

                                    </div>

                                    <div className="info-card">

                                        <h4>
                                            🚚 Delivery
                                        </h4>

                                        <p>
                                            10-15 mins
                                        </p>

                                    </div>

                                </div>

                                {/* DELIVERY TIMELINE */}

                                <OrderTimeline
                                    status={order.status}
                                />

                                {/* PRODUCTS */}

                                <div className="ordered-products">

                                    <h3>
                                        Ordered Products
                                    </h3>

                                    {
                                        order.items?.map((item) => (

                                            <div
                                                key={item.id}
                                                className="ordered-product-item"
                                            >

                                                <img
                                                    src={`${item.imageUrl}?auto=format&fit=crop&w=1000&q=80`}
                                                    alt={item.name}
                                                />

                                                <div>

                                                    <h4>
                                                        {item.name}
                                                    </h4>

                                                    <p>
                                                        ₹ {item.price}
                                                    </p>

                                                    <div className="stock-chip">

                                                        Qty:
                                                        {" "}

                                                        {item.quantity}

                                                    </div>

                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>

                                {/* LIVE TRACKING */}

                                <div className="tracking-box">

                                    <h3>
                                        📍 Live Delivery Tracking
                                    </h3>

                                    <p>

                                        Your vendor is currently
                                        moving toward your location.

                                    </p>

                                    <div className="tracking-stats">

                                        <div>

                                            ⏳ ETA:
                                            {" "}

                                            <strong>
                                                10 mins
                                            </strong>

                                        </div>

                                        <div>

                                            🚚 Status:
                                            {" "}

                                            <strong>
                                                {order.status}
                                            </strong>

                                        </div>

                                    </div>

                                </div>

                                {/* LIVE MAP */}

                                {
                                    order.status ===
                                    "Out For Delivery"

                                    &&

                                    <CustomerTrackingMap />
                                }

                                {/* REVIEW */}

                                {
                                    order.status ===
                                    "Delivered"

                                    &&

                                    <ReviewForm
                                        orderId={order.id}
                                    />
                                }

                            </div>
                        ))
                    )
                }

            </div>

        </>
    );
}

export default Orders;