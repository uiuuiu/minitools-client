import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

import apis from "../../apis";
import AuthLayout from "../../components/AuthLayout";
import './Signin.scss';
import config from "../../config";
import { RootState } from "../../store";
import { UserData } from '../../types/data/UserData';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

export default () => {
  const dispatch = useDispatch();
  const api = apis(dispatch).authApi

  const token = localStorage.getItem('token');
  const { loginSuccess } = useSelector((state: RootState) => state.auth)

  if (token || loginSuccess) return <Navigate to='/' replace={true} />

  const onFinish = (values: UserData) => {
    api.login(values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    let result, data;
    if ("profileObj" in response) {
      result = response;
      data = {
        provider: "google_oauth2",
        uid: result.getId(),
        id_token: response.tokenId,
        info: {
          email: result.profileObj.email
        }
      }
    }
    if ("tokenId" in response) {
      result = response;
      data = {
        provider: "google_oauth2",
        uid: result.getId(),
        id_token: response.tokenId,
        info: {
          email: result.profileObj.email
        }
      }
    }
    if (!data) return
    api.googleLogin(data);
  }

  return (
    <AuthLayout>
      <div className="auth-form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
        <Row>
          <GoogleLogin
            clientId={config.google.CLIENT_ID || ''}
            scope="email profile"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </Row>
      </div>
    </AuthLayout>
  );
}

function GoogleUserData(data: { provider: string; uid: string; id_token: string; info: { email: string; }; }, GoogleUserData: any) {
  throw new Error('Function not implemented.');
}
