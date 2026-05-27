import heroImage from "../assets/hero.png";

function Hero() {

    return (

        <section className="hero">

            {/* LEFT CONTENT */}

            <div className="hero-left">

                <div className="hero-badge">

                    🚀 India’s Smartest Hyperlocal Vendor Platform

                </div>

                <h1>

                    Discover
                    <span>
                        {" "}Live Street Vendors
                    </span>

                    <br />

                    Near You Instantly

                </h1>

                <p>

                    FerryWala connects customers
                    with nearby sabjiwalas,
                    chaiwalas, fruit sellers,
                    snack vendors and local
                    mobile businesses in real time.

                    <br />
                    <br />

                    Order fresh products,
                    track vendors live,
                    and support local communities
                    with AI-powered hyperlocal commerce.

                </p>

                {/* CTA BUTTONS */}

                <div className="hero-buttons">

                    <button className="primary-btn">

                        🚀 Explore Vendors

                    </button>

                    <button className="secondary-btn">

                        ▶ Watch Demo

                    </button>

                </div>

                {/* LIVE STATS */}

                <div className="live-stats">

                    <div className="stat-card">

                        <h3>
                            🟢 120+
                        </h3>

                        <p>
                            Vendors Live
                        </p>

                    </div>

                    <div className="stat-card">

                        <h3>
                            🚚 1.2K+
                        </h3>

                        <p>
                            Orders Delivered
                        </p>

                    </div>

                    <div className="stat-card">

                        <h3>
                            ⭐ 4.9/5
                        </h3>

                        <p>
                            Customer Rating
                        </p>

                    </div>

                </div>

            </div>

            {/* RIGHT IMAGE */}

            <div className="hero-right">

                {/* GLOW */}

                <div className="hero-glow"></div>

                {/* FLOATING CARDS */}

                <div className="floating-card top-card">

                    📍 Live Vendor Nearby

                </div>

                <div className="floating-card bottom-card">

                    🚚 Delivery In 10 mins

                </div>

                {/* HERO IMAGE */}

                <img
                    src={heroImage}
                    alt="FerryWala Hero"
                />

            </div>

        </section>
    );
}

export default Hero;