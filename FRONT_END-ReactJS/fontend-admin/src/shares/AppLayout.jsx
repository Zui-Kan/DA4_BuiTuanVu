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
  ApartmentOutlined,
  PullRequestOutlined,
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

const AppLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile") || "{}");

  let items = [
    getItem(<Link to={"/"}>Trang chủ</Link>, "1", <DesktopOutlined />),
    getItem("Quản lý", "sub1", <ApartmentOutlined />, [
      getItem(<Link to={"/hangxe"}>Hãng xe</Link>, "6"),
      getItem(<Link to={"/loaixe"}>Loại xe</Link>, "8"),
      getItem(<Link to={"/modelxe"}>Model Xe</Link>, "9"),
      getItem(<Link to={"/khachhang"}>Khách hàng</Link>, "4"),
    ]),
    getItem("Đơn đặt hàng", "sub2", <PullRequestOutlined />, [
      getItem(<Link to={"/nvnhandonhang"}>Nhận đơn hàng</Link>, "5"),
      getItem(<Link to={"/quanlydon"}>Quản lý đơn đặt</Link>, "10"),
      getItem(<Link to={"/dondahuy"}>Đơn đã huỷ</Link>, "11"),
    ]),
  ];

  if (profile?.role === 0) {
    items.splice(
      1,
      0,
      getItem(<Link to={"/taikhoan"}>Tài khoản</Link>, "2", <UserOutlined />),
      getItem(<Link to={"/nhanvien"}>Nhân viên</Link>, "3", <TeamOutlined />)
    );
  }

  let defaultSelectedKeys;
  switch (location.pathname) {
    case "/taikhoan":
      defaultSelectedKeys = ["2"];
      break;
    case "/nhanvien":
      defaultSelectedKeys = ["3"];
      break;
    case "/khachhang":
      defaultSelectedKeys = ["4"];
      break;
    case "/nvnhandonhang":
      defaultSelectedKeys = ["5"];
      break;
    case "/hangxe":
      defaultSelectedKeys = ["6"];
      break;
    case "/loaixe":
      defaultSelectedKeys = ["8"];
      break;
    case "/modelxe":
      defaultSelectedKeys = ["9"];
      break;
    case "/quanlydon":
      defaultSelectedKeys = ["10"];
      break;
    case "/dondahuy":
      defaultSelectedKeys = ["11"];
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
