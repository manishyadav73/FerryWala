import SockJS from "sockjs-client";

import { Client } from "@stomp/stompjs";

let stompClient = null;

// CONNECT WEBSOCKET
export const connectWebSocket = (

    onMessageReceived

) => {

    // PREVENT MULTIPLE CONNECTIONS
    if (
        stompClient &&
        stompClient.connected
    ) {

        return;
    }

    const socket = new SockJS(
        "http://localhost:8080/ws"
    );

    stompClient = new Client({

        webSocketFactory: () => socket,

        reconnectDelay: 5000,

        debug: (str) => {

            console.log(
                "🛰️ STOMP:",
                str
            );
        },

        onConnect: () => {

            console.log(
                "✅ WebSocket Connected"
            );

            // SUBSCRIBE ORDERS
            stompClient.subscribe(

                "/topic/orders",

                (message) => {

                    const data = JSON.parse(
                        message.body
                    );

                    console.log(
                        "📦 Realtime Order:",
                        data
                    );

                    // SEND DATA TO COMPONENT
                    onMessageReceived(data);
                }
            );
        },

        // STOMP ERROR
        onStompError: (frame) => {

            console.log(
                "❌ STOMP Error:",
                frame
            );
        },

        // SOCKET CLOSE
        onWebSocketClose: () => {

            console.log(
                "🔌 WebSocket Closed"
            );
        },

        // SOCKET ERROR
        onWebSocketError: (error) => {

            console.log(
                "❌ WebSocket Error:",
                error
            );
        }
    });

    stompClient.activate();
};

// SEND ORDER
export const sendOrderWebSocket = (
    orderData
) => {

    if (
        stompClient &&
        stompClient.connected
    ) {

        stompClient.publish({

            destination: "/app/order",

            body: JSON.stringify(
                orderData
            )
        });

        console.log(
            "📤 Order Sent:",
            orderData
        );
    }

    else {

        console.log(
            "⚠️ WebSocket Not Connected"
        );
    }
};

// DISCONNECT
export const disconnectWebSocket = () => {

    if (stompClient) {

        stompClient.deactivate();

        console.log(
            "🔌 WebSocket Disconnected"
        );
    }
};