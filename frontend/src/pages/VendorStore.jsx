import Loader from "../components/Loader";

import {

    useEffect,
    useState

} from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import { useCart } from "../context/CartContext";

function VendorStore() {

    const { vendorName } = useParams();

    const { addToCart } = useCart();

    const [products, setProducts] =
        useState([]);

    // LOADING STATE
    const [loading, setLoading] =
        useState(true);

    // SEARCH + FILTER STATES
    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("All");

    // FETCH LIVE PRODUCTS
    useEffect(() => {

        fetch(
            "http://localhost:8080/api/products/vendor/1"
        )

            .then((response) =>
                response.json()
            )

            .then((data) => {

                setProducts(data);

                // STOP LOADING
                setLoading(false);
            })

            .catch((error) => {

                console.log(error);

                setLoading(false);
            });

    }, []);

    // FILTER PRODUCTS
    const filteredProducts = products.filter(

        (product) => {

            const matchesSearch =

                product.name
                    .toLowerCase()

                    .includes(

                        searchTerm.toLowerCase()
                    );

            const matchesCategory =

                selectedCategory === "All"

                ||

                product.category ===
                selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );
        }
    );

    // SHOW LOADER
    if (loading) {

        return <Loader />;
    }

    return (

        <>

            <Navbar />

            <div className="vendor-store page-transition">

                <h1>
                    🛒 {vendorName}
                </h1>

                <p>
                    Live Mobile Vendor Inventory
                </p>

                {/* SEARCH + FILTER */}

                <div className="store-filters">

                    <input
                        type="text"

                        placeholder="🔍 Search products..."

                        value={searchTerm}

                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />

                    <select

                        value={selectedCategory}

                        onChange={(e) =>
                            setSelectedCategory(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Categories
                        </option>

                        <option value="Vegetables">
                            Vegetables
                        </option>

                        <option value="Fruits">
                            Fruits
                        </option>

                        <option value="Snacks">
                            Snacks
                        </option>

                    </select>

                </div>

                {/* EMPTY STATE */}

                {
                    filteredProducts.length === 0 && (

                        <div className="empty-state">

                            <h2>
                                🛒
                            </h2>

                            <h3>
                                No Products Found
                            </h3>

                            <p>

                                Try changing the search
                                or filter options to
                                discover more products.

                            </p>

                        </div>
                    )
                }

                {/* PRODUCT GRID */}

                <div className="vendor-store-grid">

                    {
                        filteredProducts.map((product) => (

                            <div
                                className="vendor-store-card"
                                key={product.id}
                            >

                                <img
                                    src={`${product.imageUrl}?auto=format&fit=crop&w=1000&q=80`}
                                    alt={product.name}
                                />

                                <h3>
                                    {product.name}
                                </h3>

                                <p>
                                    ₹ {product.price}
                                </p>

                                {/* STOCK */}

                                <div className="stock-chip">

                                    📦
                                    {" "}

                                    {
                                        product.quantity
                                    }

                                    {" "}
                                    In Stock

                                </div>

                                {/* CATEGORY */}

                                <div className="category-chip">

                                    🏷️
                                    {" "}

                                    {
                                        product.category
                                    }

                                </div>

                                {/* LIVE STATUS */}

                                <div className="live-badge">

                                    <div className="live-dot"></div>

                                    LIVE NOW

                                </div>

                                {/* BUTTON */}

                                <button
                                    onClick={() =>
                                        addToCart(product)
                                    }
                                >

                                    Add To Cart

                                </button>

                            </div>
                        ))
                    }

                </div>

            </div>

        </>
    );
}

export default VendorStore;