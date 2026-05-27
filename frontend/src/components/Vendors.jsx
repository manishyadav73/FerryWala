import { useEffect, useState } from "react";

function Vendors() {

    const [vendors, setVendors] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/api/vendors/all")

            .then((response) => response.json())

            .then((data) => {

                setVendors(data);

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);

    // INDIAN VENDOR IMAGES
    const vendorImages = [

        "https://images.unsplash.com/photo-1590845947670-c009801ffa74",

        "https://images.unsplash.com/photo-1601050690597-df0568f70950",

        "https://images.unsplash.com/photo-1573246123716-6b1782bfc499",

        "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",

        "https://images.unsplash.com/photo-1542838132-92c53300491e",

        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
    ];

    return (

        <section className="vendors">

            <h2>
                Nearby Live Vendors
            </h2>

            <div className="vendor-grid">

                {
                    vendors.map((vendor, index) => (

                        <div
                            className="vendor-card"
                            key={vendor.id}
                        >

                            <div className="vendor-image-box">

                                <img
                                    src={`${vendorImages[index % vendorImages.length]}?auto=format&fit=crop&w=1000&q=80`}
                                    alt="vendor"
                                />

                                <span className="live-badge">
                                    LIVE
                                </span>

                            </div>

                            <div className="vendor-content">

                                <h3>
                                    {vendor.shopName}
                                </h3>

                                <p className="vendor-category">
                                    {vendor.category}
                                </p>

                                <span className="vendor-address">
                                    📍 {vendor.address}
                                </span>

                                <div className="vendor-footer">

                                    <span>
                                        🚚 Nearby Vendor
                                    </span>

                                    <span>
                                        ⭐ 4.8
                                    </span>

                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>

        </section>
    );
}

export default Vendors;