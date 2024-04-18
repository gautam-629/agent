import { Breadcrumb, Flex, Form, Layout, Space } from 'antd'

import { dashboardPaths } from '../../constants'
import { Link } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import JPSettingForm from './form/JPSettingForm'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const JPSetting = () => {
  return (
    <>
            <Space direction="vertical" size="large" style={{ width: '100%', marginTop: "10px" }}>

                {/* Breadcrumb */}
                <Flex justify="space-between">
                    <Breadcrumb
                        separator={<RightOutlined />}
                        items={[{ title: <Link to={dashboardPaths.DASHBOARD}>Dashboard</Link> }, { title: 'JP Setting' }]}
                    />
                </Flex>
                <Layout>
                    {/* Transaction Records  Filters*/}
                    <Layout.Content>
                         <Form {...layout}>
                           <JPSettingForm/>
                           </Form>
                    </Layout.Content>
                </Layout>
            </Space>
        </>
  )
}

export default JPSetting