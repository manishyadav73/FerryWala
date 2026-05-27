import {

    MapContainer,
    TileLayer,
    Marker,
    Popup

} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import {

    useEffect,
    useState

} from "react";

// VENDOR ICON
const vendorIcon = new L.Icon({

    iconUrl:
        "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",

    iconSize: [45, 45]
});

// CUSTOMER ICON
const customerIcon = new L.Icon({

    iconUrl:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",

    iconSize: [40, 40]
});

function CustomerTrackingMap() {

    // VENDOR POSITION
    const [vendorPosition, setVendorPosition] =
        useState({

            lat: 13.0827,
            lng: 80.2707
        });

    // CUSTOMER POSITION
    const customerPosition = {

        lat: 13.0927,
        lng: 80.2807
    };

    // LIVE MOVEMENT
    useEffect(() => {

        const interval = setInterval(() => {

            setVendorPosition((prev) => ({

                lat:
                    prev.lat + 0.0002,

                lng:
                    prev.lng + 0.0002
            }));

        }, 2000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div
            style={{
                height: "400px",
                width: "100%",
                marginTop: "20px",
                borderRadius: "18px",
                overflow: "hidden"
            }}
        >

            <MapContainer

                center={[
                    vendorPosition.lat,
                    vendorPosition.lng
                ]}

                zoom={13}

                style={{
                    height: "100%",
                    width: "100%"
                }}
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* MOVING VENDOR */}

                <Marker
                    position={[
                        vendorPosition.lat,
                        vendorPosition.lng
                    ]}

                    icon={vendorIcon}
                >

                    <Popup>

                        🚚 Vendor On The Way

                    </Popup>

                </Marker>

                {/* CUSTOMER */}

                <Marker
                    position={[
                        customerPosition.lat,
                        customerPosition.lng
                    ]}

                    icon={customerIcon}
                >

                    <Popup>

                        📍 Your Location

                    </Popup>

                </Marker>

            </MapContainer>

        </div>
    );
}

export default CustomerTrackingMap;