import { useCart } from "../context/CartContext";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Cart() {

    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalPrice
    } = useCart();

    const navigate = useNavigate();

    // DELIVERY
    const deliveryFee = 40;

    const finalTotal =
        totalPrice + deliveryFee;

    // PROCEED TO CHECKOUT
    const proceedToCheckout = () => {

        if (cartItems.length === 0) {

            toast.error(
                "🛒 Cart is empty"
            );

            return;
        }

        // SAVE CART
        localStorage.setItem(

            "cart",

            JSON.stringify(cartItems)
        );

        navigate("/checkout");
    };

    return (

        <div className="cart-page page-transition">

            <h1>
                🛒 My Cart
            </h1>

            {
                cartItems.length === 0 ? (

                    <div className="empty-state">

                        <h2>
                            🛒
                        </h2>

                        <h3>
                            Your Cart is Empty
                        </h3>

                        <p>

                            Add fresh products from
                            nearby vendors and start
                            shopping instantly.

                        </p>

                        <button
                            onClick={() =>
                                window.location.href = "/"
                            }
                        >

                            Continue Shopping

                        </button>

                    </div>

                ) : (

                    <div className="cart-container">

                        {/* LEFT SIDE */}

                        <div className="cart-items">

                            {
                                cartItems.map((item) => (

                                    <div
                                        className="cart-item"
                                        key={item.id}
                                    >

                                        {/* IMAGE */}

                                        <img
                                            src={`${item.imageUrl}?auto=format&fit=crop&w=1000&q=80`}
                                            alt={item.name}
                                        />

                                        {/* DETAILS */}

                                        <div className="cart-item-details">

                                            <h3>
                                                {item.name}
                                            </h3>

                                            <p>

                                                Fresh product from
                                                nearby live vendor.

                                            </p>

                                            {/* LIVE */}

                                            <div className="live-badge">

                                                <div className="live-dot"></div>

                                                LIVE DELIVERY

                                            </div>

                                            {/* PRICE */}

                                            <div className="cart-price">

                                                ₹ {item.price}

                                            </div>

                                            {/* QUANTITY */}

                                            <div className="quantity-box">

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(item.id)
                                                    }
                                                >

                                                    −

                                                </button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(item.id)
                                                    }
                                                >

                                                    +

                                                </button>

                                            </div>

                                            {/* REMOVE */}

                                            <button
                                                className="remove-btn"

                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                            >

                                                Remove Item

                                            </button>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                        {/* RIGHT SIDE */}

                        <div className="cart-summary">

                            <h2>
                                Order Summary
                            </h2>

                            <div className="summary-row">

                                <span>
                                    Items Total
                                </span>

                                <span>
                                    ₹ {totalPrice}
                                </span>

                            </div>

                            <div className="summary-row">

                                <span>
                                    Delivery Fee
                                </span>

                                <span>
                                    ₹ {deliveryFee}
                                </span>

                            </div>

                            <div className="summary-row">

                                <span>
                                    Platform Fee
                                </span>

                                <span>
                                    ₹ 10
                                </span>

                            </div>

                            {/* TOTAL */}

                            <div className="summary-total">

                                <span>
                                    Total
                                </span>

                                <span>

                                    ₹
                                    {" "}

                                    {finalTotal + 10}

                                </span>

                            </div>

                            {/* BUTTON */}

                            <button
                                className="checkout-btn"

                                onClick={
                                    proceedToCheckout
                                }
                            >

                                Proceed To Checkout

                            </button>

                        </div>

                    </div>
                )
            }

        </div>
    );
}

export default Cart;