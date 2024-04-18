import {  Card, Form, Input } from "antd"

type UserFormProps = {
    children?: React.ReactNode;
};
const UserForm = ({children}:UserFormProps) => {
    return (
        <>
            <Card title="Create Account">
                <Form.Item
                    label="Account"
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: 'Use characters with letters & numbers',
                        },
                        {
                            pattern: /^[a-zA-Z0-9]+$/,
                            message: 'Account must contain only letters and numbers.',
                        },
                    ]}
                >
                    <Input placeholder="Account" />
                </Form.Item>
                <Form.Item
                    label="Nick Name"
                    name="nickName"
                    rules={[
                        {
                            required: true,
                            message: 'Will be same as the account if not fill it',
                        },
                    ]}
                >
                    <Input placeholder="Nick Name" />
                </Form.Item>
                <Form.Item
                    label="Login Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
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
                <Form.Item>
                    {children}
                </Form.Item>
            </Card>

        </>
    )
}

export default UserForm