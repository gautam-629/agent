import { createBrowserRouter } from "react-router-dom";
import Root from "./layouts/Root";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";
import LoginPage from "./pages/auth/login/LoginPage";
import User from "./pages/userManagement/User";
import Transaction from "./pages/transactionRecords/Transaction";
import { paths } from "./constants";

// import GameRecords from "./pages/gameRecords/GameRecords";
// import JPRecords from "./pages/jpRecords/JPRecords";
// import Reports from "./pages/reports/Reports";
// import JPSetting from "./pages/jpSetting/JPSetting";

// Use it in your router configuration
export const router = createBrowserRouter([
    {
        path: paths.ROOT,
        element: <Root />,
        children: [
            {
                path: paths.DASHBOARD,
                element: <Dashboard />,
                children: [
                    { path: paths.USER, element: <User /> },
                    { path: paths.TRANSACTION_RECORDS, element: <Transaction /> },
                    // { path: paths.GAME_RECORDS, element: <GameRecords /> },
                    // { path: paths.JP_RECORDS, element: <JPRecords /> },
                    // { path: paths.REPORTS, element: <Reports /> },
                    // { path: paths.JP_SETTING, element: < JPSetting/> }
                ],
            },
            {
                path: paths.AUTH,
                element: <NonAuth />,
                children: [{ path: paths.LOGIN, element: <LoginPage /> }],
            },
        ],
    },
]);
