import { useNavigate } from "react-router-dom";

function RoleSelection() {

    const navigate = useNavigate();

    // SELECT ROLE
    const selectRole = (role) => {

        localStorage.setItem(
            "role",
            role
        );
        localStorage.setItem(
    "selectedRole",
    role
);

        if (role === "CUSTOMER") {

            navigate("/");
        }

        else {

            navigate("/vendor-dashboard");
        }
    };

    return (

        <div className="role-page">

            <h1>
                🚀 Welcome To FerryWala
            </h1>

            <p>
                Choose how you want to continue
            </p>

            <div className="role-grid">

                {/* CUSTOMER */}

                <div className="role-card">

                    <h2>
                        🛒 Customer
                    </h2>

                    <p>
                        Order from nearby
                        moving vendors
                    </p>

                    <button
                        onClick={() =>
                            selectRole(
                                "CUSTOMER"
                            )
                        }
                    >

                        Continue As Customer

                    </button>

                </div>

                {/* VENDOR */}

                <div className="role-card">

                    <h2>
                        🚚 Vendor
                    </h2>

                    <p>
                        Sell products live
                        near customers
                    </p>

                    <button
                        onClick={() =>
                            selectRole(
                                "VENDOR"
                            )
                        }
                    >

                        Continue As Vendor

                    </button>

                </div>

            </div>

        </div>
    );
}

export default RoleSelection;