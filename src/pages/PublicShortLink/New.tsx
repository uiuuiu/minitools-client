import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import apis from "../../apis";


import AppContent from "../../components/AppContent";
import ContentHeaderBar from "../../components/AppContentHeaderBar";

import './New.scss';
import { ShortLinkData, ShortLinkFormData } from "../../types/data/ShortLinkData";

export default () => {
  const dispatch = useDispatch();
  const api = apis(dispatch).shortLinkApi;
  const [createdUrl, setCreatedUrl] = useState<ShortLinkData | undefined>();
  const [showShortedField, setShowShortedField] = useState(false);

  const onFinish = (data: ShortLinkFormData) => {
    api.createPublicShortLink({
      data: data,
      cb: (cbData: ShortLinkData) => setCreatedUrl(cbData)
    });
  };
  const onFinishFailed = (data: any) => console.log(data);

  useEffect(() => {
    if (createdUrl) setShowShortedField(true);
  }, [createdUrl])

  const getRedirectUrl = (record: ShortLinkData | undefined) => {
    if (!record) return
    return window.location.protocol + "//" + window.location.host + `/r/${record.url_string}`;
  }

  return (
    <>
      <ContentHeaderBar className="shortlink-content-header-bar new-public-shortlink-content-header-bar">
        <span>Easy to shorten your url</span>
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
            {
              showShortedField &&
              <Form.Item
                label={<span style={{ fontWeight: 'bold', color: 'green' }}>Shorterned url</span>}
              >
                <Input.Group compact>
                  <Input style={{ width: 'calc(100% - 100px)' }} disabled value={getRedirectUrl(createdUrl)} />
                  <Button onClick={() => navigator.clipboard.writeText(getRedirectUrl(createdUrl) || "")} icon={<CopyOutlined />} />
                </Input.Group>
              </Form.Item>
            }
            <Form.Item
              label="Url"
              name="url"
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

            <Form.Item wrapperCol={{ sm: { offset: 4, span: 12 } }}>
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
