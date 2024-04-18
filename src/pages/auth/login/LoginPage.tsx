import { Layout, Image, Card, Form, Input, Flex,Button, Space } from "antd";
import { UserOutlined, LockFilled, LockOutlined } from '@ant-design/icons'
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../http/api";
import { ICredentials } from "../../../types";
import { showError, showSuccess, storeAuthToken} from "../../../helpers/generalHelpers";
import { useNavigate } from "react-router-dom";
import { dashboardPaths } from "../../../constants";
import { useAdminInfoStore } from "../../../store/store";
// import { useAuthToken } from "../../../hooks/useAuthToken";

const LoginPage = () => {
  const navigate = useNavigate()
  // const [setAuthToken] = useAuthToken();
  const {setAdminInfo}=useAdminInfoStore();
  const { mutate: loginMutate, isPending} = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: ICredentials) =>
      login(data).then((res) => res?.data),
    onSuccess: async (data) => {
      if(data.code!==200){
        showError(data?.msg || "Something went wrong")
      }
      else{
        showSuccess(data?.msg || "Success")
        setAdminInfo(data?.data?.userInfo)
        storeAuthToken(data?.data?.token?.token)
          navigate(dashboardPaths.USER)
      }
    
      return
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      showError(error?.response?.data.error || error?.message)
      return
    }
  });

  const logoWidth = 50;
  


  return (
    <Layout style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
      <Flex vertical align="center" >
        <Image src="/logo/logo.jpg" width={logoWidth} />
        <h2>Casino Ignite</h2>
      </Flex>

      <Card
        title={
          <Space
            style={{ width: '100%', fontSize: 16, justifyContent: 'center' }}>
            <LockFilled />
            LOGIN
          </Space>
        }
        bordered={false}
        style={{ width: 400 }}>
        <Form
          onFinish={(values) => {
            loginMutate({ username: values.username, password: values.password })
          }}

        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          {/* <Flex justify="space-between">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="" id="login-form-forgot">
              Forgot password
            </a>
          </Flex> */}
          <Form.Item>
            <Button
              loading={isPending}
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }} >
              Log in
            </Button>
          </Form.Item>
        </Form>

      </Card>
    </Layout>
  )
}

export default LoginPage