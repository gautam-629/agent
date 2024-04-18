import { Breadcrumb, Button, Card, Flex, Layout, Modal, Space, Table, Form } from "antd"
import { Link } from "react-router-dom";
import { RightOutlined, PlusOutlined, DollarOutlined, RetweetOutlined, GiftOutlined } from '@ant-design/icons';
import { useMemo, useState } from "react";
import UserFilters from "./UserFilters";
import UserForm from "./form/UserForm";
import RechargeForm from "./form/RechargeForm";
import RedeemForm from "./form/RedeemForm";
import ResetPasswordForm from "./form/ResetPasswordForm";
import { LIMIT, dashboardPaths } from "../../constants";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecharge, createReedem, createUser,getAdminInfo,getUsers, resetUserPassword } from "../../http/api";
import { FieldData, ICreateUser, IRechargeUser, IRedeemUser, IResetUser, IUser } from "../../types";
import { convertTimestampToDateTime } from "../../helpers/dataConverter";
import { getAuthToken, showError, showSuccess } from "../../helpers/generalHelpers";
import { useAdminInfoStore } from "../../store/store";
import { debounce } from "lodash";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const userscolumns = [
    {
        title: 'Account',
        dataIndex: 'nickname',
        key: 'nickname',
    },
    {
        title: 'ID',
        dataIndex: 'uid',
        key: 'uid',
    },
    {
        title: 'NickName',
        dataIndex: 'nickname',
        key: 'nickname',
    },
    {
        title: 'Balance',
        dataIndex: 'gold',
        key: 'gold',
    },
    {
        title: 'Register date',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (_text: string, record: IUser) => {
            return (
                <div>
                    {convertTimestampToDateTime(record?.createTime)}
                </div>
            );
        },
    },
    {
        title: 'Last Login',
        dataIndex: 'lastLoginTime',
        key: 'lastLoginTime',
        render: (_text: string, record: IUser) => {
            return (
                <div>
                    {convertTimestampToDateTime(record?.lastLoginTime)}
                </div>
            );
        },
    },
    {
        title: 'Manager',
        dataIndex: 'manager',
        key: 'manager',
        render: (_text: string, record: IUser) => {
            return (
                <div>
                    {record?.manager?.account}
                </div>
            );
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: () => {
            return (
                <div>
                    {"Active"}
                </div>
            );
        },
    },

];

const currentEditingUserColumn = [
    {
        title: 'ID',
        dataIndex: 'uid',
        key: 'uid',
    },
    {
        title: 'Account',
        dataIndex: 'nickname',
        key: 'nickname',
    },
    {
        title: 'NickName',
        dataIndex: 'nickname',
        key: 'nickname',
    },
    {
        title: 'Balance',
        dataIndex: 'gold',
        key: 'gold',
    },

    {
        title: 'Manager',
        dataIndex: 'manager',
        key: 'manager',
        render: (_text: string, record: IUser) => {
            return (
                <div>
                    {record?.manager?.account}
                </div>
            );
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: () => {
            return (
                <div>
                    {"Active"}
                </div>
            );
        },
    },

]

// const transactionSummaryColumns = [
//     {
//         title: 'ID',
//         dataIndex: 'Sid',
//         key: 'Sid',
//     },
//     {
//         title: 'Account',
//         dataIndex: 'Saccount',
//         key: 'Saccount',
//     },
//     {
//         title: 'NickName',
//         dataIndex: 'SnickName',
//         key: 'SnickName',
//     },
//     {
//         title: 'Total Recharged',
//         dataIndex: 'STotalRecharged',
//         key: 'STotalRecharged',
//     },
//     {
//         title: 'Total Redeemed',
//         dataIndex: 'STotalRedeemed',
//         key: 'STotalRedeemed',
//     },

//     {
//         title: 'Total Income',
//         dataIndex: 'SgrossNet',
//         key: 'stoalIncome',
//     },
// ];
// const transactionDetailColumns = [
//     {
//         title: 'Ticket',
//         dataIndex: 'Tticket',
//         key: 'Tticket',
//     },
//     {
//         title: 'ID',
//         dataIndex: 'Tid',
//         key: 'Tid',
//     },
//     {
//         title: 'Account',
//         dataIndex: 'Taccount',
//         key: 'Taccount',
//     },
//     {
//         title: 'NickName',
//         dataIndex: 'TnickName',
//         key: 'TnickName',
//     },
//     {
//         title: 'Before',
//         dataIndex: 'Tbefore',
//         key: 'Tbefore',
//     },
//     {
//         title: 'Recharged',
//         dataIndex: 'Trechanged',
//         key: 'Trecharged',
//     },

//     {
//         title: 'Redemmed',
//         dataIndex: 'Tredemmed',
//         key: 'Tredemmed',
//     }
// ];

// const gameRecordsColumns = [
//     {
//         title: 'ID',
//         dataIndex: 'id',
//         key: 'id',
//     },
//     {
//         title: 'Account',
//         dataIndex: 'account',
//         key: 'account',
//     },
//     {
//         title: 'Game title',
//         dataIndex: 'gameTitile',
//         key: 'gameTitle',
//     },

//     {
//         title: 'Change',
//         dataIndex: 'change',
//         key: 'change',
//     },

// ];
// const jpRecordsColumns = [
//     {
//         title: 'ID',
//         dataIndex: 'id',
//         key: 'id',
//     },
//     {
//         title: 'Account',
//         dataIndex: 'account',
//         key: 'account',
//     },
//     {
//         title: 'Type',
//         dataIndex: 'type',
//         key: 'type',
//     },
//     {
//         title: 'Score',
//         dataIndex: 'score',
//         key: 'score',
//     },
//     {
//         title: 'Manaer',
//         dataIndex: 'manager',
//         key: 'manager',
//     },
//     {
//         title: 'Date',
//         dataIndex: 'date',
//         key: 'date',
//     },
// ];

const User = () => {
    // const [startDate, setStartDate] = useState<Date | null>(null);
    // const [endDate, setEndDate] = useState<Date | null>(null);
    // const [customer, setCustomer] = useState<string>("")
    const [filterForm] = Form.useForm();
    const [createUserForm] = Form.useForm();
    const [rechargeForm] = Form.useForm();
    const [redeemForm] = Form.useForm();
    const [resetPasswordForm] = Form.useForm();
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
    // const [isGameModalOpen, setIsGameModalOpen] = useState(false);
    // const [isJPModalOpen, setIsJPModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
    // const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
    const [currentEditingUser, setCurrentEditingUser] = useState<IUser[]>([]);
    // const [authToken,setAuthToken]=useState<string | null>(null)
    const [queryParams, setQueryParams] = useState({
        limit: LIMIT,
        page: 1,
    });
    const queryClient = useQueryClient();
    
    const { adminInfo,setAdminInfo } = useAdminInfoStore()
    // const [authToken] = useAuthToken();
    
   
    const handleUpdateUser = (user: IUser | null) => {
        if (user !== null) {
            // If user is not null, update the currentEditingUser with a single user
            setCurrentEditingUser([user]);
        } else {
            // If user is null, reset the currentEditingUser to null
            setCurrentEditingUser([]);
        }
    };
    // useEffect(()=>{
    //     const token=localStorage.getItem('authToken');
    //     setAuthToken(token)
    // },[])
    // users data fetching 
   const {
        data: users, isPending:userIsPending
    } = useQuery({ 
        queryKey: ['users', queryParams],
        queryFn: () => {
            const queryString = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
            return getUsers(queryString,getAuthToken()).then((res) => res?.data?.data);
        },
        placeholderData: keepPreviousData
    });

    const {
        refetch
    } = useQuery({
        queryKey: ['adminInfo'],
        queryFn: () => {
            return getAdminInfo(getAuthToken()).then((res) => res?.data?.data);
        },
        enabled:false
    });

    // const { refetch: transactionSummary, data: transactionSummaryData } = useQuery({
    //     queryKey: ['transactionSummary'],
    //     queryFn: getTransactionSummary,
    //     enabled: false,
    // });
    // const { refetch: transactionDetail, data: transactionDetailData } = useQuery({
    //     queryKey: ['transactionDetail'],
    //     queryFn: getTransactionDetail,
    //     enabled: false,
    // });

    // console.log(transactionDetailData, "TransactionDetail")
    // console.log(transactionDetailData, "TransactionSummary")
    //create User Mutation
    const { mutate: createUserMutation, isPending: createUserPending } = useMutation({
        mutationKey: ['createUser'],
        mutationFn: async (data: ICreateUser) =>
            createUser(data,getAuthToken()).then((res) => res?.data),
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            if (data.code !== 200) {
                showError(data?.msg || "Something went wrong")
            }
            else {
                showSuccess(data?.msg || "Success")
                createUserForm.resetFields();
                setIsUserModalOpen(false)
            }
            return
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            showError(error?.response?.data.error || error?.message)
            return
        }
    });

    // Reset Password Mutation
    const { mutate: ResetPasswordMutation, isPending: resetPasswordPending } = useMutation({
        mutationKey: ['createUser'],
        mutationFn: async (data: IResetUser) =>
            resetUserPassword(data,getAuthToken()).then((res) => res?.data),
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            if (data.code !== 200) {
                showError(data?.msg || "Something went wrong")
            }
            else {
                showSuccess(data?.msg || "Success")
                resetPasswordForm.resetFields()
                setIsResetPasswordModalOpen(false);
                setCurrentEditingUser([])
            }
            return
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            showError(error?.response?.data.error || error?.message)
            return
        }
    });

    // Reedem Mutation
    const { mutate: createRedeemMutation, isPending: createRedeemPending } = useMutation({
        mutationKey: ['ReedemUser'],
        mutationFn: async (data: IRedeemUser) =>
            createReedem(data,getAuthToken()).then((res) => res?.data),
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            if (data.code !== 200) {
                showError(data?.msg || "Something went wrong")
            }
            else {
                showSuccess(data?.msg || "Success")
                setIsRedeemModalOpen(false)
                redeemForm.resetFields();
                setCurrentEditingUser([])
                const adminData = await refetch();
                setAdminInfo(adminData?.data)
            }
            return
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            showError(error?.response?.data.error || error?.message)
            return
        }
    });
 
    //Recharge Mutation
    const { mutate: createRechargeMutation, isPending: createRechargePending } = useMutation({
        mutationKey: ['ReedemUser'],
        mutationFn: async (data: IRechargeUser) =>
            createRecharge(data,getAuthToken()).then((res) => res?.data),
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            if (data.code !== 200) {
                showError(data?.msg || "Something went wrong")
            }
            else {
                showSuccess(data?.msg || "Success")
                rechargeForm.resetFields();
                setIsRechargeModalOpen(false)
                console.log(data?.data?.balance,"Balance")
                setCurrentEditingUser([]);
                const adminData = await refetch();
                setAdminInfo(adminData?.data)
            }
            return
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            showError(error?.response?.data.error || error?.message)
            return
        }
    });

    const handleCreateUser = async () => {
       await createUserForm.validateFields();
        await createUserMutation(createUserForm.getFieldsValue());

    }
    const handleRecharge = async () => {
       await rechargeForm.validateFields();
        await createRechargeMutation(rechargeForm.getFieldsValue())
    }
    const handleRedeem = async () => {
       await redeemForm.validateFields();
        await createRedeemMutation(redeemForm.getFieldsValue())
    }
    const handleResetPassword = async () => {
       await resetPasswordForm.validateFields()
        await ResetPasswordMutation(resetPasswordForm.getFieldsValue())

    }
    // handleFilters
    // handleFilters
    // const handleFilter = () => {
    //     console.log("Customer:", customer, "startDate:", startDate, "endDate:", endDate)
    // }

    const handleRechargeModelOpen = (): void => {
        if (currentEditingUser.length > 0) {
            // Open the modal
            setIsRechargeModalOpen(true);
            rechargeForm.setFieldValue('userId', currentEditingUser[0].uid)
            rechargeForm.setFieldValue('account', currentEditingUser[0].nickname)
            rechargeForm.setFieldValue('customerBalance', currentEditingUser[0].gold)
            rechargeForm.setFieldValue('availableBalance', adminInfo?.balance)
        } else {
            setIsNotifyModalOpen(true);
        }
    }
    const handleRedeemModelOpen = (): void => {
        if (currentEditingUser.length > 0) {
            setIsRedeemModalOpen(true);
            redeemForm.setFieldsValue(currentEditingUser[0])
            redeemForm.setFieldValue('userId', currentEditingUser[0].uid)
            redeemForm.setFieldValue('account', currentEditingUser[0].nickname)
            redeemForm.setFieldValue('customerBalance', currentEditingUser[0].gold)
            redeemForm.setFieldValue('availableBalance', adminInfo?.balance)
        }
        else {
            setIsNotifyModalOpen(true)
        }
    }
    const handleResetPasswordModelOpen = () => {
        if (currentEditingUser.length > 0) {
            setIsResetPasswordModalOpen(true);
            resetPasswordForm.setFieldsValue(currentEditingUser[0])
            resetPasswordForm.setFieldValue('account', currentEditingUser[0].nickname)
            resetPasswordForm.setFieldValue('userId', currentEditingUser[0].uid)
        }
        else {
            setIsNotifyModalOpen(true)

        }
    }

    // const handleTransactionModelOpen = async () => {
    //     if (currentEditingUser.length > 0) {
    //         // Open the modal
    //         setIsTransactionModalOpen(true);
    //         await transactionSummary()
    //         await transactionDetail()

    //     } else {
    //         // Display a message indicating to select a user
    //         setIsNotifyModalOpen(true);
    //     }
    // }

    // const handleGameModelOpen = (): void => {
    //     if (!currentEditingUser) {
    //         setIsNotifyModalOpen(true)
    //     }
    //     else {
    //         setIsGameModalOpen(true)
    //     }
    // }

    // const handleJPModelOpen = (): void => {
    //     if (!currentEditingUser) {
    //         setIsNotifyModalOpen(true)
    //     }
    //     else {
    //         setIsJPModalOpen(true)
    //     }
    // }

    const debouncedQUpdate = useMemo(() => {
        return debounce((value: string | undefined) => {
            setQueryParams((prev) => ({ ...prev, searchKey: value, page: 1 }));
        }, 800);
    }, []);

    const onFilterChange = (changedFields: FieldData[]) => {
        const changedFilterFields = changedFields
            .map((item) => ({
                [item.name[0]]: item.value,
            }))
            .reduce((acc, item) => ({ ...acc, ...item }), {});
        if ('searchKey' in changedFilterFields) {
            debouncedQUpdate(changedFilterFields.searchKey);
        } else {
            setQueryParams((prev) => ({ ...prev, ...changedFilterFields, page: 1 }));
        }
    };

    return (
        <>
            <Space direction="vertical" size="small" style={{ width: '100%', marginTop: "10px" }}>
                <Flex justify="space-between">
                    <Breadcrumb
                        separator={<RightOutlined />}
                        items={[{ title: <Link to={dashboardPaths.DASHBOARD}>Dashboard</Link> }, { title: 'User Management' }]}
                    />
                </Flex>
                <Layout>
                    <Space direction="vertical" size={"large"}>

                        {/* editing user table */}
                        <Layout.Content>
                            <Card title={"User Management"}>
                                <Form form={filterForm} onFieldsChange={onFilterChange}>
                                    <UserFilters>
                                        <Button
                                            onClick={() => setIsUserModalOpen(true)}
                                            
                                            type="primary"
                                            icon={<PlusOutlined />}
                                        >
                                            Create User
                                        </Button>
                                    </UserFilters>
                                </Form>
                                <Table
                                rowKey={'nickname'}
                                 style={{height:"20px"}} size="small" tableLayout="auto" pagination={false}
                                    columns={currentEditingUserColumn}
                                    dataSource={currentEditingUser} />
                            </Card>

                        </Layout.Content>

                        {/* editing buttons */}
                        <Layout.Content  >
                            <Card>
                                <Flex wrap="wrap" gap={30}>
                                    {/* <Button
                                        type="primary"
                                        onClick={() => handleTransactionModelOpen()}
                                        icon={<TransactionOutlined />}
                                    >
                                        Transaction Records
                                    </Button> */}
                                    {/* <Button
                                        type="primary"
                                        onClick={() => handleGameModelOpen()}
                                        icon={<BookOutlined />}
                                    >
                                        Game Records
                                    </Button> */}
                                    {/* <Button
                                        onClick={() => handleJPModelOpen()}
                                        type="primary"
                                        icon={<GiftOutlined />}
                                    >
                                        Jb Records
                                    </Button> */}
                                    <Button
                                        onClick={() => handleRechargeModelOpen()}
                                        type="primary"
                                        icon={<DollarOutlined />}
                                    >
                                        Recharge
                                    </Button>
                                    <Button
                                        type="primary"
                                        icon={<GiftOutlined />}
                                        onClick={() => handleRedeemModelOpen()}
                                    >
                                        Redeem
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => handleResetPasswordModelOpen()}
                                        icon={<RetweetOutlined />}
                                    >
                                        Reset Password
                                    </Button>
                                </Flex>
                            </Card>

                        </Layout.Content>

                        {/* All avilable user */}
                        <Layout.Content>
                            <Table 
                              loading={userIsPending}
                                rowKey={"uid"}
                                tableLayout="auto" columns={[{
                                    title: "Action",
                                    render: (_: string, record) => {
                                        return (
                                            <Space>
                                                <Button
                                                    type="link"
                                                    onClick={() => {

                                                        handleUpdateUser(record);
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                            </Space>
                                        );
                                    },
                                }, ...userscolumns]}
                                pagination={{
                                    total: users?.total,
                                    pageSize: queryParams?.limit,
                                    current: queryParams?.page,
                                    onChange: (page) => {
                                        setQueryParams((prev) => {
                                            return {
                                                ...prev,
                                                page: page,
                                            };
                                        });
                                    },
                                    showTotal: (total: number, range: number[]) => {

                                        return `Showing ${range[0]}-${range[1]} of ${total} items`;
                                    },
                                }}
                                dataSource={users?.data} />;
                        </Layout.Content>
                    </Space>
                </Layout>
                {/*create user Model */}
                <Modal
                    open={isUserModalOpen}
                    onOk={() => setIsUserModalOpen(true)}
                    onCancel={() => {setIsUserModalOpen(false); createUserForm.resetFields()} }
                    footer={null}
                >
                    <Form form={createUserForm} layout="vertical">
                        <UserForm >
                            <Button
                                loading={createUserPending}
                                type="primary"
                                htmlType="submit"
                                onClick={() => handleCreateUser()}
                                style={{ width: '100%' }} >
                                Submit
                            </Button>
                        </UserForm>
                    </Form>

                </Modal>

                {/* Transaction Records Modal */}

                {/* <Modal
                    width={"70%"}
                    open={isTransactionModalOpen}
                    onOk={() => setIsTransactionModalOpen(true)}
                    onCancel={() => setIsTransactionModalOpen(false)}
                    footer={null}
                >

                    <Layout>
                        <Space direction="vertical" size="middle" >
                           
                            <Layout.Content>
                                <Card title="Transaction Records">
                                    <Filters
                                        startDate={startDate}
                                        setStartDate={setStartDate}
                                        endDate={endDate}
                                        setEndDate={setEndDate}
                                        customer={customer}
                                        setCustomer={setCustomer}
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            onClick={() => handleFilter()}
                                        >
                                            Search
                                        </Button>
                                    </Filters>
                                </Card>
                            </Layout.Content>
                          
                            <Layout.Content>
                                <Card title="Transaction Summary">
                                    <Table tableLayout="auto" columns={transactionSummaryColumns} dataSource={transactionSummaryData?.data?.data?.data} />
                                </Card>
                            </Layout.Content>

                           
                            <Layout.Content>
                                <Card title="Transaction Detail">
                                    <Table columns={transactionDetailColumns} dataSource={transactionDetailData?.data?.data?.data} />
                                </Card>
                            </Layout.Content>

                        </Space>
                    </Layout>

                </Modal> */}

                {/* Game Records Modal */}
                {/* <Modal
                    width={"70%"}
                    open={isGameModalOpen}
                    onOk={() => setIsGameModalOpen(true)}
                    onCancel={() => setIsGameModalOpen(false)}
                    footer={null}
                >
                    <Layout>
                        <Space direction="vertical" size="small">
                            <Layout.Content>
                                <Card title={"Game Records"}>
                                    <Table columns={gameRecordsColumns} dataSource={gameRecordsData} />
                                </Card>
                            </Layout.Content>
                        </Space>
                    </Layout>

                </Modal> */}
                {/* JP Records Modal */}

                {/* <Modal
                    width={"70%"}
                    open={isJPModalOpen}
                    onOk={() => setIsJPModalOpen(true)}
                    onCancel={() => setIsJPModalOpen(false)}
                    footer={null}
                >

                    <Layout>
                        <Space direction="vertical" size="small">
                            
                            <Layout.Content>
                                <Card title={"Game Records"}>
                                    <Filters
                                        startDate={startDate}
                                        setStartDate={setStartDate}
                                        endDate={endDate}
                                        setEndDate={setEndDate}
                                        customer={customer}
                                        setCustomer={setCustomer}
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            onClick={() => handleFilter()}
                                        >
                                            Search
                                        </Button>
                                    </Filters>
                                </Card>
                            </Layout.Content>
                           
                            <Layout.Content>
                                <Card>
                                    <Table columns={jpRecordsColumns} dataSource={jpRecordsData} />
                                </Card>
                            </Layout.Content>
                        </Space>
                    </Layout>

                </Modal> */}

                {/* Recharge Model*/}
                <Modal
                    open={isRechargeModalOpen}
                    onOk={() => setIsRechargeModalOpen(true)}
                    onCancel={() => { rechargeForm.resetFields(); setIsRechargeModalOpen(false)}}
                    footer={null}
                >
                    <Form form={rechargeForm} {...layout}>
                        <RechargeForm>
                            <Button
                                loading={createRechargePending}
                                type="primary"
                                htmlType="submit"
                                onClick={() => handleRecharge()}
                                style={{ width: '100%' }} >
                                Recharge
                            </Button>
                        </RechargeForm>
                    </Form>

                </Modal>
                {/* Redeem Model*/}
                <Modal
                    open={isRedeemModalOpen}
                    onOk={() => setIsRedeemModalOpen(true)}
                    onCancel={() => { redeemForm.resetFields();setIsRedeemModalOpen(false);}}
                    footer={null}
                >
                    <Form form={redeemForm} {...layout}>
                        <RedeemForm>
                            <Button
                                loading={createRedeemPending}
                                type="primary"
                                htmlType="submit"
                                onClick={() => handleRedeem()}
                                style={{ width: '100%' }} >
                                Redeem
                            </Button>
                        </RedeemForm>
                    </Form>

                </Modal>
                {/* Reset Password Model*/}
                <Modal
                    open={isResetPasswordModalOpen}
                    onOk={() => setIsResetPasswordModalOpen(true)}
                    onCancel={() => { resetPasswordForm.resetFields(),setIsResetPasswordModalOpen(false)}}
                    footer={null}
                >
                    <Form form={resetPasswordForm} {...layout}>
                        <ResetPasswordForm>
                            <Button
                                loading={resetPasswordPending}
                                type="primary"
                                htmlType="submit"
                                onClick={() => handleResetPassword()}
                                style={{ width: '100%' }} >
                                Reset
                            </Button>
                        </ResetPasswordForm>
                    </Form>

                </Modal>
                {/* Message/notify Model */}
                <Modal
                    cancelText={""}
                    footer={[
                        <Button key="ok" type="primary" onClick={() => setIsNotifyModalOpen(false)} >
                            OK
                        </Button>
                    ]}
                    open={isNotifyModalOpen}
                    onOk={() => setIsNotifyModalOpen(false)}
                    onCancel={() => setIsNotifyModalOpen(false)}>
                    <h2>Please Select First!</h2>
                </Modal>
            </Space>
        </>
    )
}

export default User