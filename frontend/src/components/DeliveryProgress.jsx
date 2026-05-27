import { useEffect, useState } from "react";

function DeliveryProgress() {

    const stages = [

        "Order Accepted",

        "Preparing Order",

        "Out For Delivery",

        "Delivered"
    ];

    const [currentStage, setCurrentStage] =
        useState(0);

    // AUTO PROGRESS
    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentStage((prev) => {

                if (prev < stages.length - 1) {

                    return prev + 1;
                }

                clearInterval(interval);

                return prev;
            });

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="delivery-progress-container">

            <h2>

                📦 Live Delivery Progress

            </h2>

            <div className="progress-wrapper">

                {
                    stages.map((stage, index) => (

                        <div
                            key={index}
                            className="progress-step"
                        >

                            <div

                                className={

                                    index <= currentStage

                                        ? "progress-circle active"

                                        : "progress-circle"
                                }
                            >

                                {
                                    index + 1
                                }

                            </div>

                            <p>

                                {stage}

                            </p>

                        </div>
                    ))
                }

            </div>

            <div className="current-status">

                🚀 Current Status:
                <strong>
                    {" "}
                    {stages[currentStage]}
                </strong>

            </div>

        </div>
    );
}

export default DeliveryProgress;