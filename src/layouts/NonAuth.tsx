import { Navigate, Outlet } from 'react-router-dom';
import { dashboardPaths } from '../constants';
import { getAuthToken } from '../helpers/generalHelpers';
// import { useAuthToken } from '../hooks/useAuthToken';

const NonAuth = () => {
    // const [authToken] = useAuthToken();
    if (getAuthToken() !== null) {
        return <Navigate to={dashboardPaths.USER} replace={true} />
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default NonAuth;
