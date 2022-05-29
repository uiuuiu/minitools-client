import React, { MouseEventHandler, useState } from "react";
// import LeftMenu from "./left";
// import RightMenu from "./right";
import { Drawer, Button } from "antd";
import { MenuOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";

import NavbarItem from "./NavbarItem";
import { AuthButton } from "../PageLayout";
import './Navbar.scss';

type NavbarProps = {
  token: string
  logout: MouseEventHandler<HTMLElement>
  toLogin: MouseEventHandler<HTMLElement>
}

export default ({ token, logout, toLogin }: NavbarProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="menuBar">
      <div className="menuCon">
        <div className="leftMenu">
          {/* <LeftMenu /> */}
        </div>
        <div className="rightMenu">
          {/* <RightMenu /> */}
        </div>
        <Button className="header-menu-expand" onClick={() => setVisible(true)}>
          <MenuOutlined />
        </Button>
        <Drawer
          className="menuBar-drawer"
          title="Basic Drawer"
          placement="right"
          closable={true}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <NavbarItem>Profile</NavbarItem>
          <NavbarItem>Settings</NavbarItem>
          <NavbarItem>
            <AuthButton style={{ padding: 0 }} token={token} logout={logout} toLogin={toLogin} type="text" icon={<LogoutOutlined />} />
            {/* <LogoutOutlined /> */}
          </NavbarItem>
        </Drawer>
      </div>
    </nav>
  );
}
