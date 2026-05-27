import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function VendorListPage() {

    const { category } = useParams();

    const navigate = useNavigate();

    // GET REGISTERED VENDORS
    const allVendors = JSON.parse(

        localStorage.getItem(
            "registeredVendors"
        )

    ) || [];

    // FILTER CATEGORY
    const filteredVendors = allVendors.filter(

        (vendor) =>

            vendor.shopCategory === category
    );

    return (

        <div className="vendor-list-page">

            <h1>

                Nearby {category} Vendors

            </h1>

            <div className="vendor-list-grid">

                {
                    filteredVendors.length > 0 ? (

                        filteredVendors.map((vendor) => (

                            <div
                                key={vendor.id}
                                className="vendor-card"
                            >

                                <h2>

                                    {vendor.name}

                                </h2>

                                <p>

                                    ⭐ {vendor.rating}

                                </p>

                                <p>

                                    📍 {vendor.distance}

                                </p>

                                <p>

                                    {

                                        vendor.online

                                            ? "🟢 Online"

                                            : "🔴 Offline"
                                    }

                                </p>

                                <button

                                    onClick={() =>

                                        navigate(

                                            `/vendor-store/${vendor.id}`
                                        )
                                    }
                                >

                                    View Store

                                </button>

                            </div>
                        ))

                    ) : (

                        <div className="no-vendors">

                            <h2>

                                😔 No Vendors Available

                            </h2>

                            <p>

                                No nearby vendors registered
                                in this category yet.

                            </p>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default VendorListPage;