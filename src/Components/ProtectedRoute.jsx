import PropTypes from 'prop-types';
import { Navigate, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element, ...props }) => {
    const token = Cookies.get('token');
    const isAuthenticated = !!token;

    return isAuthenticated ? <Route {...props} element={element} /> : <Navigate to="/auth/login" />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;