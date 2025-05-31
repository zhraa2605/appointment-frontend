import { useUser } from '@/hooks/useUser';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ requiredRole }) => {
    const { isLoggedIn, user } = useUser();  // Assuming user has a 'role' property

    if (!isLoggedIn) {
        console.log("User is not logged in, redirecting to login page.");
        // If user is not logged in, redirect to login page
        return <Navigate to="/login" />;
    }

    if (requiredRole && !requiredRole.includes(user.role)) {
        console.log(`User role ${user.role} is not allowed, redirecting to forbidden page.`);
        // If the user's role is not in the allowed roles, redirect to forbidden page
        return <Navigate to="/forbidden" />;
    }

    // Otherwise, allow access
    return <Outlet />;
};

export default PrivateRoute;
