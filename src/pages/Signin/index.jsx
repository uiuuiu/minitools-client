import React from "react";
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Row } from 'antd';
import { GoogleAPI, GoogleLogin } from "react-google-oauth";

import apis from "../../apis";
import AuthLayout from "../../components/AuthLayout";
import './Signin.scss';
import config from "../../config";

export default () => {
  const dispatch = useDispatch();
  const api = apis(dispatch).authApi

  const token = localStorage.getItem('token');
  const { loginSuccess } = useSelector(state => state.auth)

  if (token || loginSuccess) return <Navigate to='/' replace={true} />

  const onFinish = (values) => {
    api.login(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const responseGoogle = (response) => {
    var token = response;
    var data = {
      provider: "google_oauth2",
      uid: token.Ba,
      id_token: response.xc.id_token,
      info: {
        email: token.Lu.Bv
      }
    }
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
          <GoogleAPI className="GoogleLogin" clientId={config.google.CLIENT_ID}>
            <GoogleLogin
              height="10"
              access="offline"
              scope="email profile"
              onLoginSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </GoogleAPI>
        </Row>
      </div>
    </AuthLayout>
  );
}