
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { dashboardPaths } from '../constants';
import { getAdminInfo } from '../http/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAdminInfoStore } from '../store/store';
import { useAuthToken } from '../hooks/useAuthToken';
const Root = () => {
    const location = useLocation()
    const [authToken] = useAuthToken();
    const { setAdminInfo } = useAdminInfoStore()

    const {
        data: adminInfo,
    } = useQuery({
        queryKey: ['adminInfo'],
        queryFn: () => {
            return getAdminInfo(authToken).then((res) => res?.data?.data);
        },
    });

    useEffect(() => {
        if (adminInfo) {
            setAdminInfo(adminInfo);
        }
    }, [adminInfo, setAdminInfo]);

    if (location.pathname == dashboardPaths.ROOT) {
        return <Navigate to={dashboardPaths.DASHBOARD} replace={true} />
    }

    return <Outlet />;
};

export default Root;
