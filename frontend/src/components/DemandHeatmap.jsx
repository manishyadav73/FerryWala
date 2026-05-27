import {

    MapContainer,
    TileLayer

} from "react-leaflet";

import HeatmapLayer from
    "react-leaflet-heatmap-layer";

import "leaflet/dist/leaflet.css";

function DemandHeatmap() {

    // REAL AI ORDER DATA
    const orders = JSON.parse(

        localStorage.getItem(
            "vendorOrders"
        )

    ) || [];

    // GENERATE HEATMAP POINTS
    const heatmapData = orders.map(

        (order) => [

            // LATITUDE
            order.customerLocation?.latitude ||

            13.0827,

            // LONGITUDE
            order.customerLocation?.longitude ||

            80.2707,

            // INTENSITY
            order.totalAmount > 500

                ? 1.0

                : 0.6
        ]
    );

    return (

        <div
            style={{
                height: "500px",
                width: "100%",
                marginTop: "20px",
                borderRadius: "18px",
                overflow: "hidden"
            }}
        >

            <MapContainer

                center={[13.0827, 80.2707]}

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

                <HeatmapLayer

                    fitBoundsOnLoad

                    fitBoundsOnUpdate

                    points={heatmapData}

                    longitudeExtractor={(m) =>
                        m[1]
                    }

                    latitudeExtractor={(m) =>
                        m[0]
                    }

                    intensityExtractor={(m) =>
                        m[2]
                    }
                />

            </MapContainer>

        </div>
    );
}

export default DemandHeatmap;