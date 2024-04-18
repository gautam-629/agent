import { Breadcrumb, Card, Flex, Layout, Space, Table, Button } from "antd"
import { RightOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { gameRecordsData } from "../../data";
import GameFilters from "./GameFilters";
import { dashboardPaths } from "../../constants";
import { useState } from "react";


const gameRecordsColumns = [
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
        title: 'Game title',
        dataIndex: 'gameTitile',
        key: 'gameTitle',
    },
    {
        title: 'Before',
        dataIndex: 'before',
        key: 'before',
    },
    {
        title: 'Change',
        dataIndex: 'change',
        key: 'change',
    },
    {
        title: 'After',
        dataIndex: 'after',
        key: 'after',
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


const GameRecords = () => {
    const [customer, setCustomer] = useState<string>("")
    const handleCustomer=()=>{
        console.log(customer)
    }
    
    return (
        <>
            <Space direction="vertical" size="small" style={{ width: '100%', marginTop: "10px" }}>

                {/* Breadcrumb */}
                <Flex justify="space-between">
                    <Breadcrumb
                        separator={<RightOutlined />}
                        items={[{ title: <Link to={dashboardPaths.DASHBOARD}>Dashboard</Link> }, { title: 'Game Records' }]}
                    />
                </Flex>
                <Layout>
                    {/* Transaction Records  Filters*/}
                    <Layout.Content>
                        <Card title={"Game Records"}>
                            <GameFilters
                             customer={customer}
                             setCustomer={setCustomer}
                             >
                                <Button
                                    onClick={handleCustomer}
                                    type="primary"
                                    htmlType="submit"
                                     >
                                    Search
                                </Button>
                            </GameFilters>
                        </Card>
                    </Layout.Content>
                    <Layout.Content>
                        <Card>
                            <Table key={"id"} tableLayout="auto" columns={gameRecordsColumns} dataSource={gameRecordsData} />
                        </Card>
                    </Layout.Content>


                </Layout>
            </Space>
        </>
    )
}

export default GameRecords