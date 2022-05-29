import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import AuthLayout from "../../components/AuthLayout";
import { UserData } from "../../types/data/UserData";
import apis from "../../apis";

import "./Signup.scss";

const SignUp = () => {
  const dispatch = useDispatch();
  const api = apis(dispatch).authApi;

  const onFinish = (values: UserData & { passwordConfirmation: string }) => {
    api.signUp(values)
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthLayout>
      <div className="auth-form">
        <div className="form-header">Regist your new account</div>
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

          <Form.Item
            label="Password confirmation"
            name="passwordConfirmation"
            rules={[{ required: true, message: 'Please input your confirmation password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
