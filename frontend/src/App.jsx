import AdminDashboard from "./pages/AdminDashboard";

import VendorStore from "./pages/VendorStore";

import Checkout from "./pages/Checkout";

import VendorListPage from "./pages/VendorListPage";

import RoleSelection from "./pages/RoleSelection";

import VendorDashboard from "./pages/VendorDashboard";

import Orders from "./pages/Orders";

import OrderSuccess from "./pages/OrderSuccess";

import {

    BrowserRouter,
    Routes,
    Route

} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

import Cart from "./pages/Cart";

import Login from "./pages/Login";

import Register from "./pages/Register";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* HOME */}

                <Route

                    path="/"

                    element={

                        <ProtectedRoute>

                            <Home />

                        </ProtectedRoute>
                    }
                />

                {/* CATEGORY VENDORS */}

                <Route

                    path="/vendors/:category"

                    element={

                        <ProtectedRoute>

                            <VendorListPage />

                        </ProtectedRoute>
                    }
                />

                {/* VENDOR STORE */}

                <Route

                    path="/vendor-store/:vendorId"

                    element={

                        <ProtectedRoute>

                            <VendorStore />

                        </ProtectedRoute>
                    }
                />

                {/* CART */}

                <Route

                    path="/cart"

                    element={

                        <ProtectedRoute>

                            <Cart />

                        </ProtectedRoute>
                    }
                />

                {/* CHECKOUT */}

                <Route

                    path="/checkout"

                    element={

                        <ProtectedRoute>

                            <Checkout />

                        </ProtectedRoute>
                    }
                />

                {/* ORDERS */}

                <Route

                    path="/orders"

                    element={

                        <ProtectedRoute>

                            <Orders />

                        </ProtectedRoute>
                    }
                />

                {/* ORDER SUCCESS */}

                <Route

                    path="/success"

                    element={

                        <ProtectedRoute>

                            <OrderSuccess />

                        </ProtectedRoute>
                    }
                />

                {/* ROLE SELECTION */}

                <Route

                    path="/select-role"

                    element={

                        <ProtectedRoute>

                            <RoleSelection />

                        </ProtectedRoute>
                    }
                />

                {/* VENDOR DASHBOARD */}

                <Route

                    path="/vendor-dashboard"

                    element={

                        <ProtectedRoute role="VENDOR">

                            <VendorDashboard />

                        </ProtectedRoute>
                    }
                />

                {/* ADMIN DASHBOARD */}

                <Route

                    path="/admin"

                    element={

                        <ProtectedRoute>

                            <AdminDashboard />

                        </ProtectedRoute>
                    }
                />

                {/* LOGIN */}

                <Route

                    path="/login"

                    element={<Login />}
                />

                {/* REGISTER */}

                <Route

                    path="/register"

                    element={<Register />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;