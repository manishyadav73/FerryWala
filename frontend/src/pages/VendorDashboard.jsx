import SmartRouteAI from "../components/SmartRouteAI";
import VendorReviews from "../components/VendorReviews";
import AIPredictions from "../components/AIPredictions";
import AIForecast from "../components/AIForecast";
import DeliveryProgress from "../components/DeliveryProgress";

import LiveTrackingMap from "../components/LiveTrackingMap";

import { useState, useEffect } from "react";

import VendorAnalytics from "../components/VendorAnalytics";

import AIDemandInsights from "../components/AIDemandInsights";

import {
    connectWebSocket,
    disconnectWebSocket
} from "../services/websocket";

import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import VendorOrders from "../components/VendorOrders";

import AddProductForm from "../components/AddProductForm";

import VendorProducts from "../components/VendorProducts";

import EarningsAnalytics from "../components/EarningsAnalytics";

function VendorDashboard() {

    // CURRENT LOGGED-IN VENDOR
    const currentVendor = JSON.parse(

        localStorage.getItem(
            "currentVendor"
        )
    );

    // ONLINE STATUS
    const [isOnline, setIsOnline] = useState(

        localStorage.getItem(
            "vendorOnlineStatus"
        ) === "true"
    );

    // LIVE ORDER
    const [liveOrder, setLiveOrder] =
        useState(null);

    // ALL ORDERS
    const [orders, setOrders] = useState([]);

    // REALTIME WEBSOCKET
    useEffect(() => {

        connectWebSocket((data) => {

            console.log(
                "📦 New Live Order:",
                data
            );

            // ONLY RECEIVE OWN ORDERS
            if (

                data.vendorId ===
                currentVendor?.id

            ) {

                // ADD ORDER
                setOrders((prevOrders) => [

                    data,
                    ...prevOrders
                ]);

                // SAVE ORDERS
                const existingOrders =
                    JSON.parse(

                        localStorage.getItem(
                            "vendorOrders"
                        )

                    ) || [];

                localStorage.setItem(

                    "vendorOrders",

                    JSON.stringify([

                        data,
                        ...existingOrders
                    ])
                );

                // LIVE ORDER
                setLiveOrder(data);

                // TOAST
                toast.info(
                    "🛒 New Order Request Received!"
                );

                // SOUND
                const audio = new Audio(
                    "https://actions.google.com/sounds/v1/cartoon/pop.ogg"
                );

                audio.play().catch(() => {

                    console.log(
                        "Sound blocked by browser"
                    );
                });
            }

        });

        return () => {

            disconnectWebSocket();
        };

    }, []);

    // TOGGLE STATUS
    const toggleVendorStatus = () => {

        const newStatus = !isOnline;

        setIsOnline(newStatus);

        localStorage.setItem(
            "vendorOnlineStatus",
            newStatus
        );
    };

    // ACCEPT ORDER
    const acceptOrder = () => {

        toast.success(
            "✅ Order Accepted"
        );

        localStorage.removeItem(
            "liveOrder"
        );

        setLiveOrder(null);
    };

    // REJECT ORDER
    const rejectOrder = () => {

        toast.error(
            "❌ Order Rejected"
        );

        localStorage.removeItem(
            "liveOrder"
        );

        setLiveOrder(null);
    };

    // DISTANCE CALCULATION
    const calculateDistance = (
        lat1,
        lon1,
        lat2,
        lon2
    ) => {

        const R = 6371;

        const dLat =
            (lat2 - lat1) *
            Math.PI / 180;

        const dLon =
            (lon2 - lon1) *
            Math.PI / 180;

        const a =

            Math.sin(dLat / 2) *
            Math.sin(dLat / 2)

            +

            Math.cos(
                lat1 * Math.PI / 180
            )

            *

            Math.cos(
                lat2 * Math.PI / 180
            )

            *

            Math.sin(dLon / 2)

            *

            Math.sin(dLon / 2);

        const c =
            2 * Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            );

        return (R * c).toFixed(1);
    };

    // CUSTOMER DISTANCE
    const customerDistance =

        liveOrder?.vendorLocation &&
        liveOrder?.customerLocation

            ? calculateDistance(

                liveOrder.vendorLocation?.latitude,
                liveOrder.vendorLocation?.longitude,

                liveOrder.customerLocation?.latitude,
                liveOrder.customerLocation?.longitude
            )

            : null;

    return (

        <>

            <Navbar />

            <div className="vendor-dashboard">

                <h1>
                    Vendor Dashboard
                </h1>

                {/* DASHBOARD CARDS */}

                <div className="dashboard-cards">

                    <div className="dashboard-card">

                        <h2>
                            🛒 Total Products
                        </h2>

                        <p>
                            24
                        </p>

                    </div>

                    <div className="dashboard-card">

                        <h2>
                            📦 Orders Today
                        </h2>

                        <p>
                            {orders.length}
                        </p>

                    </div>

                    <div className="dashboard-card">

                        <h2>
                            💰 Earnings
                        </h2>

                        <p>
                            ₹ 4,250
                        </p>

                    </div>

                </div>

                {/* ONLINE / OFFLINE STATUS */}

                <div className="vendor-status-box">

                    <h2>

                        {
                            isOnline

                                ? "🟢 You Are Online"

                                : "🔴 You Are Offline"
                        }

                    </h2>

                    <p>

                        {
                            isOnline

                                ? "Customers can now discover you nearby"

                                : "You are hidden from nearby customers"
                        }

                    </p>

                    <button

                        className={

                            isOnline

                                ? "offline-btn"

                                : "online-btn"
                        }

                        onClick={
                            toggleVendorStatus
                        }
                    >

                        {
                            isOnline

                                ? "Go Offline"

                                : "Go Online"
                        }

                    </button>

                </div>

                {/* LIVE ORDER REQUEST */}

                {
                    liveOrder && (

                        <div className="live-order-box">

                            <h2>
                                🛒 New Live Order
                            </h2>

                            <p>

                                💰 Order Value:
                                ₹ {liveOrder?.totalAmount}

                            </p>

                            <p>

                                📦 Total Items:
                                {" "}

                                {
                                    liveOrder?.items
                                        ?.length || 0
                                }

                            </p>

                            <p>

                                📍 Customer Distance:
                                {" "}
                                {customerDistance} KM

                            </p>

                            <p>

                                {

                                    liveOrder?.totalAmount >= 200

                                    &&

                                    customerDistance <= 5

                                        ? "🔥 Worth Travelling"

                                        : "⚠️ Too Far / Low Profit Order"
                                }

                            </p>

                            <div className="order-action-buttons">

                                <button
                                    className="accept-btn"
                                    onClick={
                                        acceptOrder
                                    }
                                >

                                    Accept Order

                                </button>

                                <button
                                    className="reject-btn"
                                    onClick={
                                        rejectOrder
                                    }
                                >

                                    Reject Order

                                </button>

                            </div>

                        </div>
                    )
                }

                {/* ADD PRODUCT */}

                <AddProductForm />

                {/* PRODUCTS */}

                <VendorProducts />

                {/* AI INSIGHTS */}

                <AIDemandInsights />

                {/* ANALYTICS */}

                <VendorAnalytics />

                <AIPredictions />

                <SmartRouteAI />

                <EarningsAnalytics />
                <VendorReviews />
                <AIForecast />
                {/* LIVE TRACKING */}

                <LiveTrackingMap />

                {/* DELIVERY PROGRESS */}

                <DeliveryProgress />

                {/* ORDERS */}

                <VendorOrders orders={orders} />

            </div>

        </>
    );
}

export default VendorDashboard;