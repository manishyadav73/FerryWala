import { useMemo } from "react";

import {

    MapContainer,
    TileLayer,
    Marker,
    Popup

} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

// VENDOR ICON
const vendorIcon = new L.Icon({

    iconUrl:
        "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",

    iconSize: [45, 45]
});

function LiveTrackingMap() {

    // INITIAL POSITION
    const [vendorPosition, setVendorPosition] = useState({

        lat: 13.0827,
        lng: 80.2707
    });

    // CUSTOMER POSITION
    const customerPosition = {

        lat: 13.0927,
        lng: 80.2807
    };

    // CALCULATE DISTANCE
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

        return R * c;
    };

    // LIVE MOVEMENT
    useEffect(() => {

        const interval = setInterval(() => {

            setVendorPosition((prev) => ({

                lat:
                    prev.lat + 0.0003,

                lng:
                    prev.lng + 0.0003
            }));

        }, 2000);

        return () => clearInterval(interval);

    }, []);

    // LIVE DISTANCE
    const liveDistance = useMemo(() => {

        return calculateDistance(

            vendorPosition.lat,
            vendorPosition.lng,

            customerPosition.lat,
            customerPosition.lng
        );

    }, [vendorPosition]);

    // ETA
    const etaMinutes = Math.max(

        Math.ceil(liveDistance * 2),

        1
    );

    return (

        <div
            style={{
                marginTop: "30px"
            }}
        >

            {/* ETA BOX */}

            <div className="eta-box">

                <h2>

                    🚚 Live Delivery Tracking

                </h2>

                <p>

                    📍 Vendor Distance:

                    <strong>
                        {" "}
                        {liveDistance.toFixed(2)} KM
                    </strong>

                </p>

                <p>

                    ⏳ Estimated Arrival:

                    <strong>
                        {" "}
                        {etaMinutes} mins
                    </strong>

                </p>

            </div>

            {/* MAP */}

            <div
                style={{
                    height: "500px",
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

                    {/* VENDOR */}

                    <Marker
                        position={[
                            vendorPosition.lat,
                            vendorPosition.lng
                        ]}
                        icon={vendorIcon}
                    >

                        <Popup>

                            🚚 Vendor Moving

                        </Popup>

                    </Marker>

                    {/* CUSTOMER */}

                    <Marker
                        position={[
                            customerPosition.lat,
                            customerPosition.lng
                        ]}
                    >

                        <Popup>

                            📍 Customer Location

                        </Popup>

                    </Marker>

                </MapContainer>

            </div>

        </div>
    );
}

export default LiveTrackingMap;