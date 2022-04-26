import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Button, Row, Col, Card, Menu } from "antd";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import "./PageLayout.scss";

import apis from "../apis";
import { useSelector } from "react-redux";

const { Header, Content, Footer } = Layout;

export default ({children}) => {
  const dispatch = useDispatch();
  const api = apis(dispatch).authApi;
  const [selectedMenu, setSelectedMenu] = useState('/short_links')
  const { token } = useSelector(state => state.auth)

  const navigation = useNavigate();

  const logout = () => {
    api.logout();
  }

  const toLogin = () => {
    navigation("/sign_in")
  }

  const navigateTo = ({key}) => {
    navigation(key);
    setSelectedMenu(key);
  }

  useEffect(() => {
    if(!token) navigation("/")
  }, [token])

  return (
    <Layout style={{width: '100vw', minHeight: '100vh'}} className="page-layout">
      <ToastContainer />
      <Header>
        <Row>
          <Col xs={24} sm={6} className="logo-col">
            <Link to="/"><img src="/logo.png" className="logo"/></Link>
            <Navbar token={token} logout={logout} toLogin={toLogin} />
          </Col>
          <Col xs={24} sm={18} className="header-right">
            <AuthButton token={token} logout={logout} toLogin={toLogin} />
          </Col>
        </Row>
      </Header>
      <Content className="main-content">
        <Card className='apps-card'>
          <Menu onClick={navigateTo} selectedKeys={[selectedMenu]} mode="horizontal">
            <Menu.Item key='/short_links'>Shortern url</Menu.Item>
            <Menu.Item key='/'>App 2</Menu.Item>
            <Menu.Item key='/?3'>App 3</Menu.Item>
            <Menu.Item key='/?4'>App 4</Menu.Item>
            <Menu.Item key='/?5'>App 5</Menu.Item>
          </Menu>
        </Card>
        <Card className='app-content'>
          {children}
        </Card>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
};

export const AuthButton = ({token, logout, toLogin, ...props}) => {
  if(token) {
    return (
      <Button shape="round" size="large" ghost className="auth-button logout-button" onClick={logout} {...props}>Log out</Button>
    )
  }

  return (
    <Button shape="round" size="large" ghost className="auth-button login-button" onClick={toLogin} {...props}>Log in</Button>
  )
}
