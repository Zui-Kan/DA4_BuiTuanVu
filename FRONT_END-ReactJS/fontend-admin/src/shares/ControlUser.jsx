import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Dropdown,
  Space,
  Avatar,
  Modal,
  Form,
  Input,
  Button,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  apiChangePassword,
  apiGetProfile,
  apiLogout,
} from "../services/auth.service";
import { apiGetCTTaiKhoan } from "../services/TaiKhoan.service";
import { uploads } from "../constant/api";

const formItemLayout = {
  labelCol: { xs: { span: 5 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const ControlUser = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const token = JSON.parse(sessionStorage.getItem("token"));
  const [data, setData] = useState(null);
  const loadData = async () => {
    if (token) {
      const res = await apiGetProfile();
      if (res) {
        sessionStorage.setItem("profile", JSON.stringify(res));
        const ct = await apiGetCTTaiKhoan(res?.id);
        if (ct?.status_code === 200) {
          setData(ct?.data);
        }
      }
    }
  };

  const handleDangXuat = async () => {
    const res = await apiLogout(token);
    if (res?.status_code === 200) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("profile");
      navigate("/login");
    }
  };
  const handleModel = () => {
    setOpen(true);
  };
  const handleChangePassword = async (values) => {
    const res = await apiChangePassword({ ...values, id: data?.TaiKhoanID });
    debugger;
    if (res?.status_code === 200) {
      setOpen(false);
      api["success"]({
        message: "Thành công",
        description: "Bạn đã đổi mật khẩu thành công.",
      });
    } else {
      api["error"]({
        message: "Không thành công",
        description: res?.message,
      });
    }
  };
  const items = [
    {
      label: "Đổi mật khẩu",
      key: "0",
      onClick: handleModel,
    },

    {
      type: "divider",
    },
    {
      label: "Đăng xuất",
      onClick: handleDangXuat,
      key: "1",
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {contextHolder}

      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              src={<img src={uploads() + data?.AnhDaiDien} alt="avatar" />}
            />
            {data?.HoVaTen}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>

      <Modal
        title="Đổi mật khẩu"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={500}
        okText="Lưu"
        cancelText="Huỷ bỏ"
        footer=""
      >
        <div className="modal-center">
          <Form
            {...formItemLayout}
            style={{ width: "100%" }}
            layout="vertical"
            onFinish={handleChangePassword}
          >
            <Form.Item
              label="Mật khẩu cũ"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
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
        </div>
      </Modal>
    </>
  );
};

export default ControlUser;
