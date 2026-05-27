import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import {
    useEffect,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

// FIX MARKER ICONS
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

function VendorMap() {

    const navigate = useNavigate();

    // USER LOCATION
    const [userLocation, setUserLocation] = useState([
        13.0827,
        80.2707
    ]);

    // ONLINE STATUS
    const vendorOnlineStatus =

        localStorage.getItem(
            "vendorOnlineStatus"
        );

    // LIVE VENDORS
    const [vendors, setVendors] = useState([

        {
            id: 1,

            name: "Ramesh Vegetables",

            status:

                vendorOnlineStatus === "true"

                    ? "Moving Nearby"

                    : "Offline",

            position: [13.0827, 80.2707]
        },

        {
            id: 2,

            name: "Fresh Fruit Shop",

            status: "Busy",

            position: [13.0870, 80.2750]
        },

        {
            id: 3,

            name: "Tea Stall",

            status: "Offline",

            position: [13.0800, 80.2650]
        }
    ]);

    // GET USER LOCATION
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                setUserLocation([
                    position.coords.latitude,
                    position.coords.longitude
                ]);

                // SOUND
                const audio = new Audio(
                    "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
                );

                audio.play();

                // TOAST
                toast.success(
                    "📍 Nearby vendors detected!"
                );
            },

            (error) => {

                console.log(error);
            }
        );

    }, []);

    // DISTANCE CALCULATION
    const calculateDistance = (
        lat1,
        lon1,
        lat2,
        lon2
    ) => {

        const R = 6371;

        const dLat =
            (lat2 - lat1) * Math.PI / 180;

        const dLon =
            (lon2 - lon1) * Math.PI / 180;

        const a =

            Math.sin(dLat / 2) *
            Math.sin(dLat / 2)

            +

            Math.cos(lat1 * Math.PI / 180)

            *

            Math.cos(lat2 * Math.PI / 180)

            *

            Math.sin(dLon / 2)

            *

            Math.sin(dLon / 2);

        const c =
            2 * Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            );

        return Number((R * c).toFixed(1));
    };

    // ETA CALCULATION
    const calculateETA = (distance) => {

        const eta =
            (distance / 20) * 60;

        return Math.ceil(eta);
    };

    // LIVE VENDOR MOVEMENT
    useEffect(() => {

        const interval = setInterval(() => {

            // NEARBY NOTIFICATION
            const nearbyVendor = vendors.find(
                (vendor) => {

                    const distance =
                        calculateDistance(

                            userLocation[0],
                            userLocation[1],

                            vendor.position[0],
                            vendor.position[1]
                        );

                    return (
                        distance < 1 &&
                        vendor.status !== "Offline"
                    );
                }
            );

            if (nearbyVendor) {

                toast.info(

                    `🚚 ${nearbyVendor.name} is nearby!`
                );

                // ALERT SOUND
                const audio = new Audio(
                    "https://actions.google.com/sounds/v1/cartoon/pop.ogg"
                );

                audio.play();
            }

            // LIVE MOVEMENT
            setVendors((prevVendors) =>

                prevVendors.map((vendor) => ({

                    ...vendor,

                    position: [

                        vendor.position[0] +
                        (Math.random() - 0.5) * 0.001,

                        vendor.position[1] +
                        (Math.random() - 0.5) * 0.001
                    ]
                }))
            );

        }, 4000);

        return () => clearInterval(interval);

    }, [vendors, userLocation]);

    // SORT VENDORS
    const sortedVendors =

        [...vendors]

            .filter(
                (vendor) =>
                    vendor.status !== "Offline"
            )

            .sort((a, b) => {

                const distanceA =
                    calculateDistance(

                        userLocation[0],
                        userLocation[1],

                        a.position[0],
                        a.position[1]
                    );

                const distanceB =
                    calculateDistance(

                        userLocation[0],
                        userLocation[1],

                        b.position[0],
                        b.position[1]
                    );

                return distanceA - distanceB;
            });

    return (

        <section className="vendor-map">

            <h2>
                📍 Nearby Live Vendors
            </h2>

            <div className="map-wrapper">

                <MapContainer
                    center={userLocation}
                    zoom={13}
                    scrollWheelZoom={true}

                    style={{
                        height: "500px",
                        width: "100%",
                        borderRadius: "24px"
                    }}
                >

                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'

                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* USER LOCATION */}
                    <Marker position={userLocation}>

                        <Popup>

                            📍 You Are Here

                        </Popup>

                    </Marker>

                    {/* LIVE VENDORS */}
                    {
                        sortedVendors.map((vendor) => (

                            <Marker
                                key={vendor.id}
                                position={vendor.position}
                            >

                                <Popup>

                                    <h3>
                                        {vendor.name}
                                    </h3>

                                    <p>
                                        🚚 Live Nearby Vendor
                                    </p>

                                    <p>

                                        📏 {

                                            calculateDistance(

                                                userLocation[0],
                                                userLocation[1],

                                                vendor.position[0],
                                                vendor.position[1]
                                            )

                                        } KM Away

                                    </p>

                                    <p>

                                        🚚 Arriving in {

                                            calculateETA(

                                                calculateDistance(

                                                    userLocation[0],
                                                    userLocation[1],

                                                    vendor.position[0],
                                                    vendor.position[1]
                                                )
                                            )

                                        } mins

                                    </p>

                                </Popup>

                            </Marker>
                        ))
                    }

                </MapContainer>

            </div>

            {/* NEAREST VENDORS */}

            <div className="nearby-vendors">

                <h2>
                    🚚 Nearest Vendors
                </h2>

                <div className="nearby-vendor-grid">

                    {
                        sortedVendors.map((vendor) => (

                            <div
                                className="nearby-vendor-card"
                                key={vendor.id}
                            >

                                <h3>
                                    {vendor.name}
                                </h3>

                                <p>

                                    📏 {

                                        calculateDistance(

                                            userLocation[0],
                                            userLocation[1],

                                            vendor.position[0],
                                            vendor.position[1]
                                        )

                                    } KM Away

                                </p>

                                <p className="eta-text">

                                    🚚 Arriving in {

                                        calculateETA(

                                            calculateDistance(

                                                userLocation[0],
                                                userLocation[1],

                                                vendor.position[0],
                                                vendor.position[1]
                                            )
                                        )

                                    } mins

                                </p>

                                <span
                                    className={

                                        vendor.status === "Moving Nearby"

                                            ? "status-active"

                                            :

                                            vendor.status === "Busy"

                                                ? "status-busy"

                                                :

                                                "status-offline"
                                    }
                                >

                                    {
                                        vendor.status === "Moving Nearby"

                                            ? "🟢 Moving Nearby"

                                            :

                                            vendor.status === "Busy"

                                                ? "🟡 Busy"

                                                :

                                                "🔴 Offline"
                                    }

                                </span>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/vendor/${vendor.name}`
                                        )
                                    }
                                >

                                    Order Now

                                </button>

                            </div>
                        ))
                    }

                </div>

            </div>

        </section>
    );
}

export default VendorMap;