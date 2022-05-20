import React, { useState, useEffect, MouseEventHandler, HTMLAttributes } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Button, Row, Col, Card, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import "./PageLayout.scss";

import apis from "../apis";
import { RootState } from "../store";
import { BaseButtonProps } from "antd/lib/button/button";

const { Header, Content, Footer } = Layout;

type PageLayoutProps = {
  children: React.ReactNode
}

const menuItems = [
  { key: "/short_links", label: 'Shortern url' },
  { key: "/?", label: 'App 2' },
  { key: "/?3", label: 'App 3' },
  { key: "/?4", label: 'App 4' },
  { key: "/?5", label: 'App 5' },
]

export default ({ children }: PageLayoutProps) => {
  const dispatch = useDispatch();
  const api = apis(dispatch).authApi;
  // const [selectedMenu, setSelectedMenu] = useState('')
  const { selectedApp } = useSelector((state: RootState) => state.common);
  const { token } = useSelector((state: RootState) => state.auth)

  const navigation = useNavigate();

  const logout = () => {
    api.logout();
  }

  const toLogin = () => {
    navigation("/sign_in")
  }

  const navigateTo = ({ key }: { key: string }) => {
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
    <Layout style={{ width: '100vw', minHeight: '100vh' }} className="page-layout">
      <ToastContainer />
      <Header>
        <Row>
          <Col xs={24} sm={6} className="logo-col">
            <Link to="/"><img src="/logo.png" className="logo" /></Link>
            <Navbar token={token} logout={logout} toLogin={toLogin} />
          </Col>
          <Col xs={24} sm={18} className="header-right">
            {token && <Button type="link" icon={<UserOutlined style={{ fontSize: '25px' }} />} />}
            <AuthButton token={token} logout={logout} toLogin={toLogin} />
          </Col>
        </Row>
      </Header>
      <Content className="main-content">
        <Card className='apps-card'>
          <Menu
            onClick={navigateTo}
            selectedKeys={[selectedApp]}
            mode={isMobile ? "horizontal" : "vertical"}
            items={menuItems}
          />
        </Card>
        <Card className='app-content'>
          {children}
        </Card>
      </Content>
      <Footer>Copyright by Mini tools</Footer>
    </Layout>
  )
};

interface AuthButtonProps extends BaseButtonProps {
  token: string
  logout: MouseEventHandler<HTMLElement>
  toLogin: MouseEventHandler<HTMLElement>
}

export const AuthButton = ({ token, logout, toLogin, ...props }: AuthButtonProps) => {
  if (token) {
    return (
      <Button shape="round" size="large" className="auth-button logout-button" onClick={logout} {...props}>Log out</Button>
    )
  }

  return (
    <Button shape="round" size="large" className="auth-button login-button" onClick={toLogin} {...props}>Log in</Button>
  )
}
