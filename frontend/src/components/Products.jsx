import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useCart } from "../context/CartContext";

function Products() {

    const { addToCart } = useCart();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {

        fetch("http://localhost:8080/api/products/vendor/1")

            .then((response) => response.json())

            .then((data) => {

                setProducts(data);

                setLoading(false);

            })

            .catch((error) => {

                console.log(error);

                setLoading(false);

            });

    }, []);

    // FILTER PRODUCTS
    const filteredProducts = products.filter((product) => {

        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesCategory =

            selectedCategory === "All"

                ? true

                : product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // LOADER
    if (loading) {

        return (

            <div className="loader-container">

                <div className="loader"></div>

                <h2>
                    Loading Fresh Products...
                </h2>

            </div>
        );
    }

    return (

        <section className="products">

            <h2>
                Fresh Products Near You
            </h2>

            <input
                type="text"
                placeholder="Search fresh products..."
                className="product-search"

                value={searchTerm}

                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
            />

            <div className="filter-buttons">

                <button
                    onClick={() =>
                        setSelectedCategory("All")
                    }
                >
                    All
                </button>

                <button
                    onClick={() =>
                        setSelectedCategory("Vegetables")
                    }
                >
                    Vegetables
                </button>

                <button
                    onClick={() =>
                        setSelectedCategory("Fruits")
                    }
                >
                    Fruits
                </button>

                <button
                    onClick={() =>
                        setSelectedCategory("Snacks")
                    }
                >
                    Snacks
                </button>

            </div>

            <div className="product-grid">

                {
                    filteredProducts.length === 0 ? (

                        <div className="empty-products">

                            <h2>
                                😔 No Products Found
                            </h2>

                            <p>
                                Try searching another product
                            </p>

                        </div>

                    ) : (

                        filteredProducts.map((product) => (

                            <div
                                className="product-card"
                                key={product.id}
                            >

                                <div className="product-image-box">

                                    <img
                                        src={`${product.imageUrl}?auto=format&fit=crop&w=1000&q=80`}
                                        alt={product.name}
                                    />

                                    <span className="fresh-badge">
                                        FRESH
                                    </span>

                                </div>

                                <div className="product-content">

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <p className="price">
                                        ₹ {product.price}
                                    </p>

                                    <span className="stock">
                                        🛒 {product.quantity} Items Available
                                    </span>

                                    <div className="product-footer">

                                        <span className="rating">
                                            ⭐ 4.8
                                        </span>

                                        <span className="delivery">
                                            🚚 Fast Delivery
                                        </span>

                                    </div>

                                    <button
                                        onClick={() => {

                                            addToCart(product);

                                            toast.success(
                                                `${product.name} added to cart`
                                            );
                                        }}
                                    >
                                        Add To Cart
                                    </button>

                                </div>

                            </div>
                        ))
                    )
                }

            </div>

        </section>
    );
}

export default Products;