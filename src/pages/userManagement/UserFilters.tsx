import { Col, Form, Input, Row } from "antd"

type UsersFilterProps = {
    children?: React.ReactNode;
};
const UserFilters = ({children}:UsersFilterProps) => {
    return (
        <Row justify="space-between">
            <Col span={16}>
                <Row gutter={20}>
                    <Col span={8}>
                        <Form.Item
                         className="w-48"
                         name="searchKey">
                            <Input.Search allowClear={true} placeholder="Search" />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={8} style={{ display: 'flex', justifyContent: 'end' }}>
                {children}
            </Col>
        </Row>
    )
}

export default UserFilters