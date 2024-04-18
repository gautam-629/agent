import { Card, Form, Input } from 'antd';
type RechargeFormProps = {
    children?: React.ReactNode;
};
const RedeemForm = ({ children }: RechargeFormProps) => {
    return (
        <Card title="Redeem">
            <Form.Item
                label="ID"
                name="userId"
            >
                <Input placeholder="ID" readOnly disabled />
            </Form.Item>
            <Form.Item
                label="Account"
                name="account"

            >
                <Input placeholder="Account" readOnly disabled/>
            </Form.Item> 
            <Form.Item
                label="Customer Balance"
                name="customerBalance"

            >
                <Input placeholder="Customer Balance" readOnly disabled/>
            </Form.Item>
            <Form.Item
                label="Available Balance"
                name="availableBalance"

            >
                <Input placeholder="Available Balance"  readOnly disabled/>
            </Form.Item>
            <Form.Item
                label="Redeem Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Amount!',
                    },
                ]}
            >
                <Input placeholder="Redeem Amount" />
            </Form.Item>
            <Form.Item
                label="Note"
                name="note"

            >
                <Input.TextArea placeholder="Note" />
            </Form.Item>
                {children}
        </Card>
    )
}

export default RedeemForm