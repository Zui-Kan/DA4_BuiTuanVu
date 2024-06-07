import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Typography, Form, Input, notification } from "antd";
import signinbg from "../assets/image/pngegg.png";
import { apiLogin } from "../services/auth.service";

const { Title } = Typography;

const Login = () => {
  document.title = "Trang đăng nhập";
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const res = await apiLogin(values);
    if (res?.status_code === 200) {
      sessionStorage.setItem("token", JSON.stringify(res?.access_token));
      navigate("/");
    } else {
      api["error"]({
        message: "Lỗi !!!",
        description: "Tên tài khoản hoặc mật khẩu không đúng.",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Row gutter={[24, 0]} justify="space-around">
        <Col
          xs={{ span: 24, offset: 0 }}
          lg={{ span: 6, offset: 2 }}
          md={{ span: 12 }}
          style={{ marginTop: "150px" }}
        >
          <Title className="mb-15">Đăng nhập</Title>
          <Title className="font-regular text-muted" level={5}>
            Nhập tên tài khoản và mật khẩu của bạn để đăng nhập
          </Title>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <div className="username-title">Tài khoản</div>

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên tài khoản!",
                },
              ]}
            >
              <Input
                placeholder="Tên tài khoản"
                size="large"
                className="username"
              />
            </Form.Item>
            <div className="username-title">Mật khẩu</div>

            <Form.Item
              className="username"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                size="large"
                className="username"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  height: "40px",
                  background: "#1890ff",
                }}
              >
                ĐĂNG NHẬP
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col
          className="sign-img"
          style={{ padding: 12, height: "750px" }}
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          md={{ span: 12 }}
        >
          <img src={signinbg} alt="" style={{ height: "70%", width: "100%" }} />
        </Col>
      </Row>
    </>
  );
};
export default Login;
