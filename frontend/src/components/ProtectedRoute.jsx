import { Navigate } from "react-router-dom";

function ProtectedRoute({

    children,
    role

}) {

    const user = JSON.parse(

        localStorage.getItem("user")
    );

    // NOT LOGGED IN
    if (!user) {

        return <Navigate to="/login" />;
    }

    // ROLE CHECK
    if (

        role &&

        user.role !== role
    ) {

        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;