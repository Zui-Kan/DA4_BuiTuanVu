import React, { useEffect, useState } from "react";
import { Breadcrumb, message, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { apiThongKeTopXe } from "../services/ModelXe.service";
import { Bar } from "@ant-design/charts";
const HienThiThongKe = () => {
  document.title = "Thống kê";

  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);

  const loadData = async () => {
    const results = await apiThongKeTopXe();
    if (results?.status_code === 200) {
      setData(results?.data);
    } else {
      messageApi.error("Lỗi khi tải dữ liệu");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const config = {
    data: data,
    xField: "SoLuongXeDaBan",
    yField: "TenModel",
    seriesField: "TenModel",
    legend: {
      position: "top-left",
    },
    meta: {
      SoLuongXeDaBan: { alias: "Số lượng xe đã bán" },
      TenModel: { alias: "Tên Model" },
    },
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <h2>Thống kê top 10 xe bán chạy nhất</h2>
        <Bar {...config} />
      </div>
    </>
  );
};

export default HienThiThongKe;
