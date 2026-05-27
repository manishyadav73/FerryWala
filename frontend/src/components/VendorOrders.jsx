import { useEffect, useState } from "react";

import { toast } from "react-toastify";

function VendorOrders() {

    const [orders, setOrders] = useState([]);

    // CURRENT VENDOR
    const currentVendor = JSON.parse(

        localStorage.getItem(
            "currentVendor"
        )
    );

    // FETCH ONLY CURRENT VENDOR ORDERS
    useEffect(() => {

        const allOrders = JSON.parse(

            localStorage.getItem(
                "vendorOrders"
            )

        ) || [];

        // FILTER ORDERS
        const vendorOrders = allOrders.filter(

            (order) =>

                order.vendorId ===
                currentVendor?.id
        );

        setOrders(vendorOrders);

    }, []);

    // UPDATE STATUS
    const updateOrderStatus = (

        orderId,
        newStatus

    ) => {

        // GET ALL ORDERS
        const allOrders = JSON.parse(

            localStorage.getItem(
                "vendorOrders"
            )

        ) || [];

        // UPDATE STATUS
        const updatedOrders = allOrders.map(

            (order) => {

                if (order.id === orderId) {

                    return {

                        ...order,

                        status: newStatus
                    };
                }

                return order;
            }
        );

        // SAVE UPDATED ORDERS
        localStorage.setItem(

            "vendorOrders",

            JSON.stringify(updatedOrders)
        );

        // UPDATE LOCAL STATE
        const vendorOrders = updatedOrders.filter(

            (order) =>

                order.vendorId ===
                currentVendor?.id
        );

        setOrders(vendorOrders);

        toast.success(
            `✅ Order marked as ${newStatus}`
        );
    };

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

        <div className="vendor-orders">

            <h2>
                📦 Customer Orders
            </h2>

            <div className="vendor-orders-grid">

                {
                    orders.length > 0 ? (

                        orders.map((order) => (

                            <div
                                className="vendor-order-card"
                                key={order.id}
                            >

                                {/* ORDER HEADER */}

                                <div className="vendor-order-header">

                                    <h3>

                                        🛒 Order #{order.id}

                                    </h3>

                                    <span

                                        className="order-status-badge"

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

                                {/* ORDER INFO */}

                                <p>

                                    💰 Total:
                                    {" "}

                                    ₹ {order.totalAmount}

                                </p>

                                <p>

                                    📦 Items:
                                    {" "}

                                    {
                                        order.items?.length || 0
                                    }

                                </p>

                                <p>

                                    👤 Customer:
                                    {" "}

                                    {
                                        order.customerName
                                    }

                                </p>

                                {/* PRODUCTS */}

                                <div className="vendor-order-products">

                                    {
                                        order.items?.map((item) => (

                                            <div
                                                key={item.id}
                                                className="vendor-order-product"
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

                                                    <p>
                                                        Qty:
                                                        {" "}
                                                        {item.quantity}
                                                    </p>

                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>

                                {/* STATUS BUTTONS */}

                                <div className="status-buttons">

                                    <button

                                        onClick={() =>

                                            updateOrderStatus(

                                                order.id,

                                                "Preparing"
                                            )
                                        }
                                    >

                                        Preparing

                                    </button>

                                    <button

                                        onClick={() =>

                                            updateOrderStatus(

                                                order.id,

                                                "Out For Delivery"
                                            )
                                        }
                                    >

                                        Out For Delivery

                                    </button>

                                    <button

                                        onClick={() =>

                                            updateOrderStatus(

                                                order.id,

                                                "Delivered"
                                            )
                                        }
                                    >

                                        Delivered

                                    </button>

                                </div>

                            </div>
                        ))

                    ) : (

                        <div className="no-orders">

                            <h2>

                                😔 No Orders Yet

                            </h2>

                            <p>

                                Customer orders will appear here.

                            </p>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default VendorOrders;