import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Button, Row, Col, Card, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import "./PageLayout.scss";

import apis from "../apis";

const { Header, Content, Footer } = Layout;

export default ({children}) => {
  const dispatch = useDispatch();
  const api = apis(dispatch).authApi;
  // const [selectedMenu, setSelectedMenu] = useState('')
  const { selectedApp } = useSelector(state => state.common);
  const { token } = useSelector(state => state.auth)

  const navigation = useNavigate();

  const logout = () => {
    api.logout();
  }

  const toLogin = () => {
    navigation("/sign_in")
  }

  const navigateTo = ({key}) => {
    dispatch({ type: 'apps/selected', data: key })
    navigation(key);
  }

  // useEffect(() => {
  //   if(!token) navigation("/")
  // }, [token])

  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })

    setIsMobile(window.innerWidth < 576)
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])

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
            { token && <Button type="link" icon={<UserOutlined style={{fontSize: '25px'}} />} /> }
            <AuthButton token={token} logout={logout} toLogin={toLogin} />
          </Col>
        </Row>
      </Header>
      <Content className="main-content">
        <Card className='apps-card'>
          <Menu onClick={navigateTo} selectedKeys={[selectedApp]} mode={isMobile ? "horizontal" : "vertical"}>
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
      <Footer>Copyright by Mini tools</Footer>
    </Layout>
  )
};

export const AuthButton = ({token, logout, toLogin, ...props}) => {
  if(token) {
    return (
      <Button shape="round" size="large" className="auth-button logout-button" onClick={logout} {...props}>Log out</Button>
    )
  }

  return (
    <Button shape="round" size="large" className="auth-button login-button" onClick={toLogin} {...props}>Log in</Button>
  )
}
