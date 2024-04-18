import { Input ,Form, Space} from 'antd';
const JPSettingForm = () => {
    return (
        <Space direction='vertical' size="small">
            
            <Space align='center' >
            <Form.Item
            style={{marginBottom:"2px"}}
                label="Account"
                name="account"
            >
                <Input placeholder="Account" />
            </Form.Item>
            <span>Tips：Once the parameters are edited, the accumulated amount on the Jackpot will be recalculated.</span>

            </Space>
           
              <Space>
              <Form.Item
                label="Nick Name"
                name="nickName"
    
            >
                <Input placeholder="Nick Name" />
            </Form.Item>
            </Space>    
            

            <Form.Item
                label="Login Password"
                name="loginPassword"
                
            >
                <Input.Password placeholder="Password" />

            </Form.Item>
            <Form.Item
                label="Confirm password"
                name="confirm password"
                
            >
                <Input.Password placeholder="Confirm password" />

            </Form.Item>
            <Form.Item>
                
            </Form.Item>
        </Space>
    )
}

export default JPSettingForm