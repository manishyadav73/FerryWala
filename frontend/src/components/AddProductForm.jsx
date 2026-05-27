import { useState } from "react";

import { toast } from "react-toastify";

function AddProductForm() {

    const [name, setName] = useState("");

    const [price, setPrice] = useState("");

    const [quantity, setQuantity] = useState("");

    const [category, setCategory] = useState("");

    const [imageUrl, setImageUrl] = useState("");

    // GET CURRENT VENDOR
    const currentVendor = JSON.parse(

        localStorage.getItem("currentVendor")

    );

    const handleAddProduct = async (e) => {

        e.preventDefault();

        // REAL VENDOR OWNERSHIP
        const productData = {

            id: Date.now(),

            name,

            price,

            quantity,

            category,

            imageUrl,

            vendorId:
                currentVendor?.id || 1,

            vendorName:
                currentVendor?.name || "Vendor"
        };

        try {

            // SAVE IN LOCAL STORAGE
            const existingProducts = JSON.parse(

                localStorage.getItem("vendorProducts")

            ) || [];

            localStorage.setItem(

                "vendorProducts",

                JSON.stringify([

                    productData,

                    ...existingProducts
                ])
            );

            // BACKEND API
            const response = await fetch(

                "http://localhost:8080/api/products/add",

                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(productData)
                }
            );

            if (response.ok) {

                toast.success(
                    "✅ Product Added Successfully"
                );

                // RESET FORM
                setName("");

                setPrice("");

                setQuantity("");

                setCategory("");

                setImageUrl("");

            } else {

                toast.error(
                    "❌ Failed To Add Product"
                );
            }

        } catch (error) {

            console.log(error);

            toast.error(
                "Something went wrong"
            );
        }
    };

    return (

        <div className="add-product-form">

            <h2>
                Add New Product
            </h2>

            {/* CURRENT VENDOR */}

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

            <form onSubmit={handleAddProduct}>

                <input
                    type="text"
                    placeholder="Product Name"

                    value={name}

                    onChange={(e) =>
                        setName(e.target.value)
                    }

                    required
                />

                <input
                    type="number"
                    placeholder="Price"

                    value={price}

                    onChange={(e) =>
                        setPrice(e.target.value)
                    }

                    required
                />

                <input
                    type="number"
                    placeholder="Quantity"

                    value={quantity}

                    onChange={(e) =>
                        setQuantity(e.target.value)
                    }

                    required
                />

                <select
                    value={category}

                    onChange={(e) =>
                        setCategory(e.target.value)
                    }

                    required
                >

                    <option value="">
                        Select Category
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

                    <option value="Tea">
                        Tea
                    </option>

                    <option value="Juice">
                        Juice
                    </option>

                    <option value="Grocery">
                        Grocery
                    </option>

                </select>

                <input
                    type="text"
                    placeholder="Product Image URL"

                    value={imageUrl}

                    onChange={(e) =>
                        setImageUrl(e.target.value)
                    }

                    required
                />

                <button type="submit">

                    Add Product

                </button>

            </form>

        </div>
    );
}

export default AddProductForm;