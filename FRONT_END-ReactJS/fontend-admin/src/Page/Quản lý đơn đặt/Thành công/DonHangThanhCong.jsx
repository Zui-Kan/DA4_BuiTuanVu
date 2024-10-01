import React, { useEffect, useState } from "react";

import { Breadcrumb, Button, Flex, Table, Input, Modal, message } from "antd";
import moment from "moment";
import {
  ExclamationCircleFilled,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

import { apiHienThiTrangThai_4 } from "../../../services/DatHang.service";
import { formatPrice } from "../../../shares/format";
import { apiGetNhanVienbyTK } from "../../../services/NhanVien.service";
import ChiTietDonThanhCong from "./ChiTietDonThanhCong";

const DonHangThanhCong = () => {
  const messageApi = message;
  const { confirm } = Modal;
  const { Search } = Input;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [maDatHang, setMaDatHang] = useState("");
  const [maTrangThai, setMaTrangThai] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [valueSearch, setValueSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    page: 1,
    pageSize: 5,
    total: 1,
  });
  const [data, setData] = useState([]);
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  const loadData = async () => {
    setLoading(true);
    const getNV = await apiGetNhanVienbyTK(profile.id);
    if (getNV && getNV.status_code === 200) {
      const results = await apiHienThiTrangThai_4({
        ...tableParams,
        search: valueSearch,
        MaNhanVien: getNV?.data?.MaNhanVien,
      });
      if (Array.isArray(results?.data?.data)) {
        setTableParams({
          ...tableParams,
          total: results?.data?.total,
        });
        setData(results?.data?.data);

        setLoading(false);
      } else {
        console.error("Lỗi rồi:", results?.message);
      }
    }
  };

  const columns = [
    {
      title: "Mã đặt hàng",
      dataIndex: "MaDatHang",
    },
    {
      title: "Mã KH",
      dataIndex: "MaKhachHang",
    },
    {
      title: "Tổng tiền",
      dataIndex: "TongTien",
      width: "100px",
      render: (_, record) => <span>{formatPrice(record.TongTien)}</span>,
    },
    {
      title: "Hình thức nhận",
      dataIndex: "HinhThucNhan",
    },
    {
      title: "Địa chỉ nhận",
      dataIndex: "DiaChiNhanXe",
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
    },
    {
      title: "Ngày tạo",
      dataIndex: "NgayTao",
      render: (_, record) => (
        <span>
          {moment(record.NgayTao).format("DD/MM/YYYY") +
            " lúc " +
            moment(record.NgayTao).format("HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "Chức năng",
      width: "120px",
      render: (_, record) => (
        <Flex justify="center">
          <Button
            title="Nhận đơn"
            onClick={() => {
              setIsOpenModal(true);
              setMaDatHang(record.MaDatHang);
              setMaTrangThai(record.MaTrangThai);
            }}
          >
            Chi tiết
          </Button>
        </Flex>
      ),
    },
  ];

  useEffect(() => {
    loadData();
  }, [JSON.stringify(tableParams), valueSearch]);

  const onSearch = async (value) => {
    setValueSearch(value);
  };

  const handleCancelModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <div
        style={{
          minHeight: 360,
          background: "#fff",
        }}
      >
        <div className="control-btn_them">
          <Search
            placeholder="Nhập tìm kiếm..."
            allowClear
            onSearch={onSearch}
            style={{
              width: 400,
            }}
          />
          <div className="control-btn_themAxoa"></div>
        </div>

        <Table
          columns={columns}
          rowKey={(record) => record.MaDatHang}
          dataSource={data}
          pagination={{
            ...tableParams,
            onChange: (page, pageSize) => {
              setTableParams({
                page: page,
                pageSize,
                total: tableParams.total,
              });
            },
          }}
          loading={loading}
        />
      </div>

      <ChiTietDonThanhCong
        open={isOpenModal}
        cancelModal={handleCancelModal}
        maDatHang={maDatHang}
      ></ChiTietDonThanhCong>
    </>
  );
};

export default DonHangThanhCong;
