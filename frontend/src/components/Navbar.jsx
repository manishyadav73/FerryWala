import { useEffect, useState } from "react";

import {

    Link,
    useNavigate

} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [darkMode, setDarkMode] =
        useState(false);

    const [scrolled, setScrolled] =
        useState(false);

    // LOAD SAVED MODE
    useEffect(() => {

        const savedMode =

            localStorage.getItem(
                "darkMode"
            );

        if (savedMode === "true") {

            setDarkMode(true);

            document.body.classList.add(
                "dark"
            );
        }

    }, []);

    // SCROLL EFFECT
    useEffect(() => {

        const handleScroll = () => {

            if (window.scrollY > 40) {

                setScrolled(true);

            } else {

                setScrolled(false);
            }
        };

        window.addEventListener(

            "scroll",
            handleScroll
        );

        return () =>

            window.removeEventListener(

                "scroll",
                handleScroll
            );

    }, []);

    // TOGGLE DARK MODE
    const toggleDarkMode = () => {

        const newMode = !darkMode;

        setDarkMode(newMode);

        localStorage.setItem(
            "darkMode",
            newMode
        );

        if (newMode) {

            document.body.classList.add(
                "dark"
            );

        } else {

            document.body.classList.remove(
                "dark"
            );
        }
    };

    // LOGOUT
    const handleLogout = () => {

        // REMOVE USER SESSION

        localStorage.removeItem(
            "user"
        );

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "selectedRole"
        );

        localStorage.removeItem(
            "currentVendor"
        );

        // REDIRECT TO LOGIN

        navigate("/login");
    };

    const cart = JSON.parse(

        localStorage.getItem("cart")

    ) || [];

    return (

        <nav

            className={

                scrolled

                ?

                "navbar navbar-scrolled"

                :

                "navbar"
            }
        >

            {/* LOGO */}

            <div className="logo-section">

                <h1 className="logo">

                    FerryWala

                </h1>

                <p className="location">

                    📍 Live Vendors Near You

                </p>

            </div>

            {/* SEARCH */}

            <div className="search-box">

                <input

                    type="text"

                    placeholder="Search nearby vendors, vegetables, chai..."
                />

            </div>

            {/* NAV LINKS */}

            <ul className="nav-links">

                <li>

                    <button

                        className="dark-toggle"

                        onClick={toggleDarkMode}
                    >

                        {

                            darkMode

                            ?

                            "🌙 Dark"

                            :

                            "☀️ Light"
                        }

                    </button>

                </li>

                <li>

                    <Link to="/">
                        Home
                    </Link>

                </li>

                <li>

                    <Link to="/orders">
                        Orders
                    </Link>

                </li>

                <li>

                    <Link to="/cart">

                        Cart ({cart.length})

                    </Link>

                </li>

                <li>

                    <button

                        className="logout-btn"

                        onClick={handleLogout}
                    >

                        Logout

                    </button>

                </li>

            </ul>

        </nav>
    );
}

export default Navbar;