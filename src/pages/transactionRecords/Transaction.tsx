import { Breadcrumb, Button, Card, Flex,  Form,  Layout, Space, Table} from "antd"
import { RightOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Filters from "../../components/common/Filters/Filters";
import { LIMIT, dashboardPaths } from "../../constants";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAuthToken } from "../../helpers/generalHelpers";
import { getTransactionDetail, getTransactionSummary } from "../../http/api";
import { convertDateForSearch } from "../../helpers/dataConverter";
import { ITranSactionDetail } from "../../types";

const transactionSummaryColumns = [
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
        title: 'Total Redeemed',
        dataIndex: 'redeem',
        key: 'redeem',
    },
    {
        title: 'Total Recharged',
        dataIndex: 'recharge',
        key: 'recharge',
    },
    {
        title: 'Gross Net',
        dataIndex: 'gross_net',
        key: 'gross_net',
    },
];
const transactionDetailColumns = [
    {
        title: 'Ticket',
        dataIndex: 'Tticket',
        key: 'Tticket',
    },
    {
        title: 'ID',
        dataIndex: 'uid',
        key: 'uid',
        render: (_text: string, record: ITranSactionDetail) => {
            return (
                <div>
                    {record?.guidUserLog?.user?.uid}
                </div>
            );
        },
    },
    {
        title: 'Account',
        dataIndex: 'nickname',
        key: 'nickname',
        render: (_text: string, record: ITranSactionDetail) => {
            return (
                <div>
                    {record?.guidUserLog?.user?.nickname}
                </div>
            );
        },
    },
    {
        title: 'NickName',
        dataIndex: 'nickname',
        key: 'nickname',
        render: (_text: string, record: ITranSactionDetail) => {
            return (
                <div>
                    {record?.guidUserLog?.user?.nickname}
                </div>
            );
        },
    },
    {
        title: 'Before',
        dataIndex: 'before',
        key: 'before',
        render: (_text: string, record: ITranSactionDetail) => {
            return (
                <div>
                    {record?.guidUserLog?.before}
                </div>
            );
        },
    },
    {
        title: 'Recharged',
        dataIndex: 'balance',
        key: 'balance',
        render: (_text: string, record: ITranSactionDetail) => {
            if (+record?.balance < 0) {
                return (
                    <div>{Math.abs(+record?.balance)}</div>
                );
            } else {
             return <div>{0}</div>; // Render nothing if the balance is positive
            }
        },
    },
    {
        title: 'Redeemed',
        dataIndex: 'balance',
        key: 'balance',
        render: (_text: string, record: ITranSactionDetail) => {
            if (+record?.balance >= 0) {
                return (
                    <div>{Math.abs(+record?.balance)}</div>
                );
            } else {
                return <div>{0}</div>; // Render nothing if the balance is negative
            }
        },
    },
    {
        title: 'After',
        dataIndex: 'after',
        key: 'after',
        render: (_text: string, record: ITranSactionDetail) => {
            return (
                <div>
                    {record?.guidUserLog?.after}
                </div>
            );
        },
    },
    {
        title: 'IP Add',
        dataIndex: 'ip',
        key: 'ip',
    },
    {
        title: 'Cashier',
        dataIndex: 'account',
        key: 'account',
        render: (_text: string, record: ITranSactionDetail) => {
            return (
                <div>
                    {record?.admin?.account}
                </div>
            );
        },
    },
    {
        title: 'Remark',
        dataIndex: 'memo',
        key: 'memo',
        render: (_text: string, record: ITranSactionDetail) => {
            return (
                <div>
                    {record?.guidUserLog?.memo}
                </div>
            );
        },
    },
    {
        title: 'Date',
        dataIndex: 'created_at',
        key: 'created_at',
    }
];

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const Transaction = () => {
    
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [customer,setCustomer]=useState<string>("")
    // const [authToken,setAuthToken]=useState<string | null>(null)
    const [queryParams, setQueryParams] = useState({
        limit: LIMIT,
        page: 1,
    });
    
    // useEffect(()=>{
    //     setAuthToken(getAuthToken())
    // },[])

    const {
        data: transactionSummary, isPending:transactionIspending
    } = useQuery({
        queryKey: ['transactionSummary',queryParams],
        queryFn: () => {
            const queryString = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
            return getTransactionSummary(queryString,getAuthToken()).then((res) => res?.data?.data);
        },
        placeholderData: keepPreviousData
    });

    const {
        data: transactionDetail, isPending:transactionDetailPending
    } = useQuery({
        queryKey: ['transactionDetail',queryParams],
        queryFn: () => {
            const queryString = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
            return getTransactionDetail(queryString,getAuthToken()).then((res) => res?.data?.data);
        },
        placeholderData: keepPreviousData
    });

    // handleFilters
    const handleFilter = () => {
        const startTime =convertDateForSearch(startDate)
        const endTime =convertDateForSearch(endDate)
        setQueryParams((prev) => ({ ...prev, searchKey: customer, startTime:startTime,endTime:endTime, page: 1 }));
    }

    return (
        <>
            <Space direction="vertical" size="small" style={{ width: '100%', marginTop: "10px" }}>

                {/* Breadcrumb */}
                <Flex justify="space-between">
                    <Breadcrumb
                        separator={<RightOutlined />}
                        items={[{ title: <Link to={dashboardPaths.DASHBOARD}>Dashboard</Link> }, { title: 'Transaction Records' }]}
                    />
                </Flex>
                <Layout>
                    <Space direction="vertical" size="small" style={{ width: '100%', marginTop: "10px" }}>
                        {/* Transaction Records  Filters*/}
                        <Layout.Content>
                            <Card title={"Transaction Records"}>
                               <Form {...layout}>
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
                               </Form>
                            </Card>
                        </Layout.Content>
                        {/* Transaction Summary Table */}
                        <Layout.Content>
                            <Card title={"Transaction Summary"}>
                                <Table
                                rowKey={'uid'}
                              loading={transactionIspending} tableLayout="auto" 
                                columns={transactionSummaryColumns}
                                pagination={{
                                    total: transactionSummary?.total,
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
                                 dataSource={transactionSummary?.data} />
                            </Card>
                        </Layout.Content>

                        {/* Transaction Detail Table */}
                        <Layout.Content>
                            <Card title={"Transaction Detail"}>
                                <Table 
                                rowKey={"ip"}
                                loading={transactionDetailPending} 
                                tableLayout="auto"
                                columns={transactionDetailColumns}
                                pagination={{
                                    total: transactionSummary?.total,
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
                                 dataSource={transactionDetail?.data} />
                            </Card>
                        </Layout.Content>
                    </Space>
                </Layout>
            </Space>
        </>
    )
}

export default Transaction