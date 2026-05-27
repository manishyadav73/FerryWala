import { useEffect, useState } from "react";

import { toast } from "react-toastify";

function VendorProducts() {

    const [products, setProducts] = useState([]);

    // CURRENT LOGGED-IN VENDOR
    const currentVendor = JSON.parse(

        localStorage.getItem(
            "currentVendor"
        )

    );

    // FETCH ONLY CURRENT VENDOR PRODUCTS
    const fetchProducts = () => {

        const allProducts = JSON.parse(

            localStorage.getItem(
                "vendorProducts"
            )

        ) || [];

        // FILTER PRODUCTS
        const vendorProducts = allProducts.filter(

            (product) =>

                product.vendorId === currentVendor?.id
        );

        setProducts(vendorProducts);
    };

    useEffect(() => {

        fetchProducts();

    }, []);

    // DELETE PRODUCT
    const deleteProduct = async (productId) => {

        try {

            // GET ALL PRODUCTS
            const allProducts = JSON.parse(

                localStorage.getItem(
                    "vendorProducts"
                )

            ) || [];

            // REMOVE PRODUCT
            const updatedProducts = allProducts.filter(

                (product) =>

                    product.id !== productId
            );

            // SAVE UPDATED PRODUCTS
            localStorage.setItem(

                "vendorProducts",

                JSON.stringify(updatedProducts)
            );

            toast.success(
                "✅ Product Deleted Successfully"
            );

            fetchProducts();

        } catch (error) {

            console.log(error);

            toast.error(
                "❌ Failed To Delete Product"
            );
        }
    };

    return (

        <div className="vendor-products">

            <h2>
                My Products
            </h2>

            {/* CURRENT STORE */}

            {
                currentVendor && (

                    <div className="current-vendor-box">

                        <p>

                            🏪 Store:
                            {" "}

                            <strong>
                                {currentVendor.name}
                            </strong>

                        </p>

                        <p>

                            📦 Category:
                            {" "}

                            <strong>
                                {
                                    currentVendor.shopCategory
                                }
                            </strong>

                        </p>

                    </div>
                )
            }

            <div className="vendor-product-grid">

                {
                    products.length > 0 ? (

                        products.map((product) => (

                            <div
                                className="vendor-product-card"
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

                                <span>

                                    📦
                                    {" "}
                                    {product.quantity}
                                    {" "}
                                    In Stock

                                </span>

                                <button
                                    onClick={() =>
                                        deleteProduct(product.id)
                                    }
                                >

                                    Delete Product

                                </button>

                            </div>
                        ))

                    ) : (

                        <div className="no-products">

                            <h2>

                                😔 No Products Added

                            </h2>

                            <p>

                                Add your first product
                                to start selling.

                            </p>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default VendorProducts;