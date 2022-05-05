import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Checkbox, Button } from "antd";
import apis from "../../apis";


import AppContent from "../../components/AppContent";
import ContentHeaderBar from "../../components/AppContentHeaderBar";

import './New.scss';

export default () => {
  const dispatch = useDispatch();
  const api = apis(dispatch).shortLinkApi;

  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const onSubmit = data => console.log(data);
  const onFinish = (data) => {
    api.createShortLink({data: data});
  };
  const onFinishFailed = data =>console.log(data);

  return (
    <>
      <ContentHeaderBar className="shortlink-content-header-bar new-public-shortlink-content-header-bar">
        Easy to shorten your url
      </ContentHeaderBar>
      <AppContent>
        <div className="new-public-container">
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Url"
              name="url"
              type="url"
              rules={[
                { required: true, message: 'Please input url for shorten' },
                () => ({
                  validator(_, value) {
                    const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
                    const urlRegex = new RegExp(urlExpression);
                    if (value.match(urlRegex)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Url is not valid'));
                  },
                })
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Title"
              name="title"
              // rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              // rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.TextArea rows={10} />
            </Form.Item>

            <Form.Item name="active" valuePropName="checked" wrapperCol={{ sm: { offset: 4, span: 12 }}}>
              <Checkbox>active</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ sm: { offset: 4, span: 12 }}}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </AppContent>
    </>
  )
}
