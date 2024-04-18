
import { NavLink, Navigate, Outlet ,useNavigate,useLocation} from 'react-router-dom';
import { Badge, Flex, Layout, Menu, theme, Image } from 'antd';
import { useState } from 'react';
import {UserAddOutlined, LogoutOutlined, TransactionOutlined} from '@ant-design/icons';
import { dashboardPaths } from '../constants';
import { useAdminInfoStore } from '../store/store';
import { getAuthToken, storeAuthToken } from '../helpers/generalHelpers';
// import { useAuthToken } from '../hooks/useAuthToken';

const { Sider, Header, Content } = Layout;

const Dashboard = () => {
    // const [authToken,setAuthToken] = useAuthToken();
    const location=useLocation()
    const navigate=useNavigate()
    const {adminInfo}=useAdminInfoStore()
    const [collapsed, setCollapsed] = useState(false);
    const handleLogout = () => {
        storeAuthToken(null)
       navigate(dashboardPaths.LOGIN)
    }
    const items = [
        {
            key: '/dashboard/user',
            icon: <UserAddOutlined />,
            label: <NavLink to={dashboardPaths.USER}>User Management</NavLink>,
        },
        {
            key: '/dashboard/transaction-records',
            icon: <TransactionOutlined />,
            label: <NavLink to={dashboardPaths.TRANSACTION_RECORDS}>Transaction Records</NavLink>,
        },

        // {
        //     key: '/gameRecords',
        //     icon: <BookOutlined />,
        //     label: <NavLink to={dashboardPaths.GAME_RECORDS}>Game Records</NavLink>,
        // },
        // {
        //     key: '/jbRecords',
        //     icon: <GiftOutlined />,
        //     label: <NavLink to={dashboardPaths.JP_RECORDS}>JP Records</NavLink>,
        // },
        // {
        //     key: '/reports',
        //     icon: <DollarOutlined />,
        //     label: <NavLink to={dashboardPaths.REPORTS}>Reports</NavLink>,
        // },
        // {
        //     key: '/jpSetting',
        //     icon: <DollarOutlined />,
        //     label: <NavLink to={dashboardPaths.JP_SETTING}>JP Setting</NavLink>,
        // },
        // {
        //     key: '/setting',
        //     icon: <SettingOutlined />,
        //     label: <NavLink to="#">Setting</NavLink>,
        // },   

        {
            key: '/logout',
            icon: <LogoutOutlined />,
            label: (
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' ,fontWeight: "bolder" }}>
                    Logout
                </button>
            ),
        },


    ];
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    if (getAuthToken()== null) {
        return <Navigate to={dashboardPaths.LOGIN} replace={true} />
    }
    const logoWidth = 35;
    return (
        <div>
            <Layout style={{ minHeight: '100vh', background: colorBgContainer }}>
                <Sider 
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsible
                    theme="light"
                    collapsed={collapsed}
                    onCollapse={(collapsed) => setCollapsed(collapsed)}>
                    <Flex className='mt-2 px-5' align="center" gap={15} >
                        <Image src="/logo/logo.jpg" width={logoWidth} />
                        <h2 className='font-medium'>Casino Ignite</h2>
                    </Flex>
                    <Flex className='ml-8 mt-2' align='center' style={{ paddingLeft: "10px", cursor: "pointer" }} gap={20} >
                        <p style={{fontWeight:"bold", color:"blueviolet"}}>{`Balance : ${adminInfo?.balance || ""}`}</p>
                        {/* <div style={{fontWeight:"bold", color:"blueviolet"}} >
                            <RetweetOutlined size={20} />
                            <span style={{ padding: "5px" }}>Refresh</span>
                        </div> */}
                    </Flex>
                    <Menu style={{ fontWeight: "bold" }} theme="light" defaultSelectedKeys={[location.pathname]} items={items} />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            background: colorBgContainer,
                        }}>
                        <Flex gap="middle" align="center" justify="space-between">
                            <Badge text={
                                `Welcome ${adminInfo?.account || ""} (Store)`
                            } status="success" />
                            {/* <Badge dot={true} size='default'>
                                <BellFilled />
                            </Badge> */}
                        </Flex>
                    </Header>
                    <Content className='mt-9 px-8'>
                        <Outlet />
                    </Content>

                </Layout>
            </Layout>
        </div>
    );
};

export default Dashboard;