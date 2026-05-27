import { Link } from "react-router-dom";

function OrderSuccess() {

    return (

        <div className="success-page">

            <div className="success-card">

                <h1>
                    🎉 Order Placed Successfully
                </h1>

                <p>
                    Your order has been sent to
                    nearby vendors.
                </p>

                <p>
                    Delivery partner will reach
                    you soon 🚚
                </p>

                <Link to="/">

                    <button>
                        Continue Shopping
                    </button>

                </Link>

            </div>

        </div>
    );
}

export default OrderSuccess;