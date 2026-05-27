import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Register() {

    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [shopCategory, setShopCategory] =
        useState("");

    // ROLE STATE
    const [role, setRole] =
        useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(

                "http://localhost:8080/api/users/register",

                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        name,

                        email,

                        password,

                        shopCategory,

                        role
                    })
                }
            );

            // FAILED REGISTRATION
            if (!response.ok) {

                toast.error(
                    "❌ Registration Failed"
                );

                return;
            }

            const data =
                await response.json();

            console.log(data);

            // SAVE VENDOR DATA
            const existingVendors = JSON.parse(

                localStorage.getItem(
                    "registeredVendors"
                )

            ) || [];

            const newVendor = {

                id: Date.now(),

                name,

                email,

                shopCategory,

                role,

                online: true,

                rating: (
                    4 + Math.random()
                ).toFixed(1),

                distance:

                    (
                        Math.random() * 5
                    ).toFixed(1)

                    + " KM"
            };

            localStorage.setItem(

                "registeredVendors",

                JSON.stringify([

                    newVendor,

                    ...existingVendors
                ])
            );

            // SAVE ROLE
            localStorage.setItem(

                "selectedRole",
                role
            );

            toast.success(
                "✅ Registration Successful"
            );

            // GO TO LOGIN
            navigate("/login");

        } catch (error) {

            console.log(error);

            toast.error(
                "❌ Something went wrong"
            );
        }
    };

    return (

        <div className="auth-page">

            <form

                className="auth-form"

                onSubmit={handleRegister}
            >

                <h1>
                    Register
                </h1>

                <input

                    type="text"

                    placeholder="Enter Name"

                    value={name}

                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }

                    required
                />

                <input

                    type="email"

                    placeholder="Enter Email"

                    value={email}

                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }

                    required
                />

                <input

                    type="password"

                    placeholder="Enter Password"

                    value={password}

                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }

                    required
                />

                {/* ROLE SELECTION */}

                <select

                    value={role}

                    onChange={(e) =>
                        setRole(
                            e.target.value
                        )
                    }

                    required
                >

                    <option value="">
                        Select Role
                    </option>

                    <option value="CUSTOMER">
                        👤 Customer
                    </option>

                    <option value="VENDOR">
                        🛒 Vendor
                    </option>

                </select>

                {/* SHOP CATEGORY */}

                <select

                    value={shopCategory}

                    onChange={(e) =>

                        setShopCategory(
                            e.target.value
                        )
                    }

                    required
                >

                    <option value="">
                        Select Shop Category
                    </option>

                    <option value="sabji">
                        🥬 Sabji Wala
                    </option>

                    <option value="fruits">
                        🍎 Fruit Wala
                    </option>

                    <option value="chai">
                        ☕ Chai Wala
                    </option>

                    <option value="snacks">
                        🍔 Snacks
                    </option>

                    <option value="grocery">
                        🛒 Grocery
                    </option>

                    <option value="clothes">
                        👕 Clothes
                    </option>

                    <option value="juice">
                        🧃 Juice Corner
                    </option>

                    <option value="dairy">
                        🥛 Dairy Shop
                    </option>

                </select>

                <button type="submit">

                    Register

                </button>

                {/* LOGIN OPTION */}

                <p className="auth-switch">

                    Already have account?

                    <span

                        onClick={() =>
                            navigate("/login")
                        }
                    >

                        Login

                    </span>

                </p>

            </form>

        </div>
    );
}

export default Register;