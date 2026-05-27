import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(

                "http://localhost:8080/api/users/login",

                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        email,
                        password
                    })
                }
            );

            // INVALID LOGIN
            if (!response.ok) {

                toast.error(
                    "❌ Invalid Email or Password"
                );

                return;
            }

            const token =
                await response.text();

            // EXTRA TOKEN VALIDATION

            if (

                !token ||

                token.includes(
                    "Bad credentials"
                ) ||

                token.includes(
                    "Unauthorized"
                )

            ) {

                toast.error(
                    "❌ Invalid Email or Password"
                );

                return;
            }

            // SAVE TOKEN
            localStorage.setItem(

                "token",
                token
            );

            // GET ROLE
            const role =

                localStorage.getItem(
                    "selectedRole"
                ) || "CUSTOMER";

            // SAVE USER SESSION
            localStorage.setItem(

                "user",

                JSON.stringify({

                    email,
                    role
                })
            );

            // GET REGISTERED VENDORS
            const registeredVendors = JSON.parse(

                localStorage.getItem(
                    "registeredVendors"
                )

            ) || [];

            // FIND CURRENT VENDOR
            const matchedVendor =

                registeredVendors.find(

                    (vendor) =>

                        vendor.email === email
                );

            // SAVE CURRENT VENDOR SESSION
            if (matchedVendor) {

                localStorage.setItem(

                    "currentVendor",

                    JSON.stringify(
                        matchedVendor
                    )
                );
            }

            toast.success(
                "✅ Login Successful"
            );

            console.log(token);

            // ROLE BASED REDIRECT

            if (role === "VENDOR") {

                navigate(
                    "/vendor-dashboard"
                );

            } else {

                navigate("/");
            }

        } catch (error) {

            console.log(error);

            toast.error(
                "❌ Login Failed"
            );
        }
    };

    return (

        <div className="auth-page">

            <form

                className="auth-form"

                onSubmit={handleLogin}
            >

                <h1>
                    Login
                </h1>

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

                <button type="submit">

                    Login

                </button>

                {/* REGISTER OPTION */}

                <p className="auth-switch">

                    New user?

                    <span

                        onClick={() =>
                            navigate("/register")
                        }
                    >

                        Create Account

                    </span>

                </p>

            </form>

        </div>
    );
}

export default Login;