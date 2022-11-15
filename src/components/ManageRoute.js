import {Navigate, useLocation} from "react-router-dom";
import NotFound from "../pages/error/404";
import {useAuth} from "../hooks/useAuth";

const ManageRoute = () => {
    const auth = useAuth();
    const location = useLocation();
    return ( auth ? location.pathname === "/" ? <Navigate to={`/dashboard`} /> : <NotFound />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default ManageRoute;