import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logovinfast from "./logovinfast.jpg";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Flex, Image, Layout, Menu, Button } from "antd";
import ControlUser from "./ControlUser";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to={"/"}>Trang chủ</Link>, "1", <DesktopOutlined />),

  getItem("Tài khoản", "2", <PieChartOutlined />),

  getItem("Tài khoản", "sub1", <UserOutlined />, [
    getItem("Đổi mật khẩu", "3"),
  ]),
  getItem("Quản lý", "sub2", <TeamOutlined />, [
    getItem(<Link to={"/hangxe"}>Hãng xe</Link>, "6"),
    getItem(<Link to={"/phienban"}>Phiên bản</Link>, "7"),
    getItem(<Link to={"/loaixe"}>Loại xe</Link>, "8"),
    getItem(<Link to={"/modelxe"}>Model Xe</Link>, "9"),
  ]),
  getItem("Files", "10", <FileOutlined />),
];

const AppLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  let defaultSelectedKeys;
  switch (location.pathname) {
    case "/hangxe":
      defaultSelectedKeys = ["6"];
      break;
    case "/phienban":
      defaultSelectedKeys = ["7"];
      break;
    case "/loaixe":
      defaultSelectedKeys = ["8"];
      break;
    case "/modelxe":
      defaultSelectedKeys = ["9"];
      break;
    default:
      defaultSelectedKeys = ["1"];
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: "#fff" }}
      >
        <div className="demo-logo-vertical" style={{ textAlign: "center" }}>
          <Link to={"/"}>
            <Image
              style={{
                width: collapsed ? "50px" : "100px",
                height: collapsed ? "50px" : "100px",
                borderRadius: "10%",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              src={logovinfast}
              preview={false}
            ></Image>
          </Link>
        </div>

        <Menu
          theme="light"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          items={items}
          style={{ color: "#fff" }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: " space-between",
            padding: 0,
            paddingRight: "50px",
            background: "#fff",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <ControlUser></ControlUser>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Shop Car ©{new Date().getFullYear()} Created by Khang
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
