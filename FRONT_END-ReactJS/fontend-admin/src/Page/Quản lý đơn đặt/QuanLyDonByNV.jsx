import React, { useEffect, useState } from "react";

import { Breadcrumb, Tabs, message } from "antd";

import { Link } from "react-router-dom";
import NVXuLyHoSo from "./Xử lý hồ sơ/NVXuLyHoSo";
import NVGiaoXe from "./Giao xe/NVGiaoXe";
import DonHangThanhCong from "./Thành công/DonHangThanhCong";

const QuanLyDonByNV = () => {
  document.title = "Quản lý khách hàng";
  const messageApi = message;
  const item = [
    {
      label: `Xét hồ sơ`,
      key: "1",
      children: <NVXuLyHoSo />,
    },
    {
      label: `Giao xe`,
      key: "2",
      children: <NVGiaoXe />,
    },
    {
      label: `Thành công`,
      key: "3",
      children: <DonHangThanhCong />,
    },
  ];

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to={"/"}>Trang chủ</Link> },
          { title: "Quản lý đơn đặt xe" },
        ]}
      />
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <Tabs defaultActiveKey="1" centered items={item} />
      </div>
    </>
  );
};

export default QuanLyDonByNV;
