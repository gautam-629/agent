import { Breadcrumb, Button, Card, Flex, Layout, Space, Table } from "antd"
import { RightOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Filters from "../../components/common/Filters/Filters";
import { jpRecordsData } from "../../data";
import { dashboardPaths } from "../../constants";
import { useState } from "react";

const jpRecordsColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Account',
        dataIndex: 'account',
        key: 'account',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
    },
    {
        title: 'Manaer',
        dataIndex: 'manager',
        key: 'manager',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
];

const JPRecords = () => {
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
                        items={[{ title: <Link to={dashboardPaths.DASHBOARD}>Dashboard</Link> }, { title: 'JP Records' }]}
                    />
                </Flex>
                <Layout>
                    {/* Transaction Records  Filters*/}
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
                    {/* Transaction Summary Table */}
                    <Layout.Content>
                        <Card>
                            <Table columns={jpRecordsColumns} dataSource={jpRecordsData} />
                        </Card>
                    </Layout.Content>

                </Layout>
            </Space>
        </>
    )
}

export default JPRecords