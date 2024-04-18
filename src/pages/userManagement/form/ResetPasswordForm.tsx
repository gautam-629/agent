import { Card, Form, Input } from 'antd'
import React from 'react'
type RechargeFormProps = {
    children?: React.ReactNode;
};
const ResetPasswordForm = ({ children }: RechargeFormProps) => {
    return (
        <Card title="Reset Password">
            <Form.Item
                label="ID"
                name="userId"
            >
                <Input placeholder="ID" readOnly disabled/>
            </Form.Item>
            <Form.Item
                label="Account"
                name="account"

            >
                <Input placeholder="Account" readOnly disabled/>
            </Form.Item>
            <Form.Item
                label="New Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your New password!',
                    },
                    {
                        pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
                        message: 'Password must contain at least 1 letter and 1 number, and be at least 5 characters long.',
                    },
                ]}
            >
                <Input.Password placeholder="Password" />

            </Form.Item>
            <Form.Item
                label="Confirm password"
                name="confirmPass"
                rules={[
                    {
                        required: true,
                        message: 'Please re-enter the password.',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Confirm password" />

            </Form.Item>

            {children}
        </Card>
    )
}

export default ResetPasswordForm