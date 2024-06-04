import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Avatar } from "antd";
const items = [
  {
    label: "Đổi mật khẩu",
    key: "0",
  },
  {
    label: " 1st menu item",
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "Đăng xuất",
    key: "3",
  },
];
const ControlUser = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={["click"]}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <Avatar
          src={
            <img
              src="https://i.pinimg.com/originals/c5/ee/60/c5ee60e6f1766167e34d7f06e3ae20dc.gif"
              alt="avatar"
            />
          }
        />
        Hello World
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default ControlUser;
