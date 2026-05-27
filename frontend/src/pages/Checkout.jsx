import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { toast } from "react-toastify";

import { useCart } from "../context/CartContext";

import { sendOrderWebSocket } from "../services/websocket";

function Checkout() {

    const navigate = useNavigate();

    const { clearCart } = useCart();

    const [paymentMethod, setPaymentMethod] =
        useState("COD");

    const cart = JSON.parse(

        localStorage.getItem("cart")

    ) || [];

    // TOTAL
    const totalAmount = cart.reduce(

        (total, item) =>

            total +
            item.price * item.quantity,

        0
    );

    // PLACE ORDER
    const handlePayment = async () => {

        if (cart.length === 0) {

            toast.error(
                "🛒 Cart is empty"
            );

            return;
        }

        try {

            // GET CUSTOMER LOCATION
            navigator.geolocation.getCurrentPosition(

                async (position) => {

                    const customerLatitude =
                        position.coords.latitude;

                    const customerLongitude =
                        position.coords.longitude;

                    // GET VENDOR ID
                    const vendorId =
                        cart[0]?.vendorId || 1;

                    // LIVE ORDER OBJECT
                    const newOrder = {

                        id: Date.now(),

                        vendorId,

                        customerName: "Customer",

                        totalAmount,

                        paymentMethod,

                        status: "Order Accepted",

                        createdAt:
                            new Date().toISOString(),

                        vendorLocation: {

                            latitude: 13.0827,

                            longitude: 80.2707
                        },

                        customerLocation: {

                            latitude:
                                customerLatitude,

                            longitude:
                                customerLongitude
                        },

                        items: cart
                    };

                    // SAVE ORDER
                    const existingOrders = JSON.parse(

                        localStorage.getItem(
                            "vendorOrders"
                        )

                    ) || [];

                    localStorage.setItem(

                        "vendorOrders",

                        JSON.stringify([

                            newOrder,
                            ...existingOrders
                        ])
                    );

                    // SAVE LIVE ORDER
                    localStorage.setItem(

                        "liveOrder",

                        JSON.stringify(newOrder)
                    );

                    // SEND REALTIME ORDER
                    sendOrderWebSocket(
                        newOrder
                    );

                    // SEND TO BACKEND
                    for (let item of cart) {

                        const orderData = {

                            userId: 1,

                            vendorId,

                            productName:
                                item.name,

                            price:
                                item.price,

                            quantity:
                                item.quantity
                        };

                        await fetch(

                            "http://localhost:8080/api/orders/place",

                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify(
                                    orderData
                                )
                            }
                        );
                    }

                    // SAVE NOTIFICATION
                    const existingNotifications =
                        JSON.parse(

                            localStorage.getItem(
                                "notifications"
                            )

                        ) || [];

                    const newNotification = {

                        message:

                            `🛒 Order placed successfully. Payment via ${paymentMethod}`,

                        createdAt:
                            new Date().toISOString()
                    };

                    localStorage.setItem(

                        "notifications",

                        JSON.stringify([

                            newNotification,
                            ...existingNotifications
                        ])
                    );

                    // CLEAR CART
                    localStorage.removeItem(
                        "cart"
                    );

                    clearCart();

                    toast.success(

                        `✅ Payment Successful via ${paymentMethod}`
                    );

                    navigate("/success");
                },

                (error) => {

                    console.log(error);

                    toast.error(
                        "❌ Location access denied"
                    );
                }
            );

        } catch (error) {

            console.log(error);

            toast.error(
                "❌ Payment Failed"
            );
        }
    };

    return (

        <>

            <Navbar />

            <div className="checkout-page">

                <h1>
                    💳 Checkout
                </h1>

                <div className="checkout-box">

                    <h2>
                        Order Summary
                    </h2>

                    {
                        cart.map((item) => (

                            <div
                                key={item.id}
                                className="checkout-item"
                            >

                                <p>
                                    {item.name}
                                </p>

                                <p>

                                    ₹
                                    {" "}

                                    {
                                        item.price
                                    }

                                    ×

                                    {
                                        item.quantity
                                    }

                                </p>

                            </div>
                        ))
                    }

                    <h2>

                        Total:
                        {" "}

                        ₹ {totalAmount}

                    </h2>

                    {/* PAYMENT OPTIONS */}

                    <div className="payment-options">

                        <h3>
                            Select Payment Method
                        </h3>

                        <label>

                            <input
                                type="radio"

                                value="COD"

                                checked={
                                    paymentMethod ===
                                    "COD"
                                }

                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            Cash On Delivery

                        </label>

                        <label>

                            <input
                                type="radio"

                                value="UPI"

                                checked={
                                    paymentMethod ===
                                    "UPI"
                                }

                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            UPI Payment

                        </label>

                    </div>

                    <button
                        className="pay-btn"
                        onClick={handlePayment}
                    >

                        Pay ₹ {totalAmount}

                    </button>

                </div>

            </div>

        </>
    );
}

export default Checkout;