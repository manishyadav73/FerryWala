function OrderTimeline({ status }) {

    const timelineSteps = [

        "Order Accepted",

        "Preparing",

        "Out For Delivery",

        "Delivered"
    ];

    const currentStep =
        timelineSteps.indexOf(status);

    return (

        <div className="timeline-container">

            <h3>
                🚚 Delivery Timeline
            </h3>

            <div className="timeline">

                {
                    timelineSteps.map(

                        (step, index) => (

                            <div
                                key={index}
                                className="timeline-step"
                            >

                                <div

                                    className={

                                        index <= currentStep

                                            ?

                                            "timeline-circle active"

                                            :

                                            "timeline-circle"
                                    }
                                >

                                    {
                                        index <= currentStep

                                            ? "✅"

                                            : "⚪"
                                    }

                                </div>

                                <p>
                                    {step}
                                </p>

                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}

export default OrderTimeline;