import NotificationCenter from "../components/NotificationCenter";
import AIRecommendations from "../components/AIRecommendations";
import FerryAIAssistant from "../components/FerryAIAssistant";
import VendorMap from "../components/VendorMap";
import Navbar from "../components/Navbar";
import FloatingButton from "../components/FloatingButton";
import Hero from "../components/Hero";

import Offers from "../components/Offers";

import Categories from "../components/Categories";

import Vendors from "../components/Vendors";

import Products from "../components/Products";

import Footer from "../components/Footer";

function Home() {

    return (

        <>

            <Navbar />

            <Hero />

            <Offers />

            <Categories />

            <Vendors />

            <Products />
            <VendorMap />
            <FerryAIAssistant />
            <AIRecommendations />
            <NotificationCenter />
            <Footer />
<FloatingButton />
        </>
    );
}

export default Home;