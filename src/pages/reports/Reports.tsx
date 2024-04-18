import { Breadcrumb, Button, Card, Flex, Layout, Space, Table } from "antd"
import { RightOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Filters from "../../components/common/Filters/Filters";
import { reportsData } from "../../data";
import { dashboardPaths } from "../../constants";
import { useState } from "react";

const reportsColumns = [
    {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
    },
    {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: 'Account',
        dataIndex: 'account',
        key: 'account',
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
    },
    {
        title: 'Total Recharged',
        dataIndex: 'totalRecharged',
        key: 'totalRecharged',
    },
    {
        title: 'Total Redeemed',
        dataIndex: 'totalRedeemed',
        key: 'totalRedeemed',
    },
    {
        title: 'Total Income',
        dataIndex: 'totalIncome',
        key: 'totalIncome',
    },
    {
        title: 'Holding',
        dataIndex: 'holding',
        key: 'holding',
    },
];

const Reports = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [customer, setCustomer] = useState<string>("")

    // handleFilters
    const handleFilter = () => {

        console.log("Customer:", customer, "startDate:", startDate, "endDate:", endDate)
    }
    return (
        <>
            <Space direction="vertical" size="small" style={{ width: '100%', marginTop: "10px" }}>

                {/* Breadcrumb */}
                <Flex justify="space-between">
                    <Breadcrumb
                        separator={<RightOutlined />}
                        items={[{ title: <Link to={dashboardPaths.DASHBOARD}>Dashboard</Link> }, { title: 'Reports' }]}
                    />
                </Flex>
                <Layout>
                    {/* Transaction Records  Filters*/}
                    <Layout.Content>
                        <Card title={"Reports"}>
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
                    {/* Transaction Summary Table */}
                    <Layout.Content>
                        <Card title="Detail Reports"> 
                            <Table columns={reportsColumns} dataSource={reportsData} />
                        </Card>
                    </Layout.Content>

                </Layout>
            </Space>
        </>
    )
}

export default Reports