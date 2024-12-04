import React, { useEffect, useState } from "react";

import { Breadcrumb, Button, Flex, Table, Input, Modal, message } from "antd";
import moment from "moment";
import {
  ExclamationCircleFilled,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

import { apiHienThiTrangThai_2 } from "../../../services/DatHang.service";
import { formatPrice } from "../../../shares/format";
import { apiGetNhanVienbyTK } from "../../../services/NhanVien.service";
import ConfirmNVXuLyHoSo from "./ConfirmNVXuLyHoSo";
// import ConfirmNVXuLyHoSo from "./ConfirmNVXuLyHoSo";

const NVXuLyHoSo = () => {
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
    const getNV = await apiGetNhanVienbyTK(profile?.id);
    if (getNV && getNV.status_code === 200) {
      const results = await apiHienThiTrangThai_2({
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

      } else {
        console.error("Lỗi rồi:", results?.message);
      }
    }
    setLoading(false);
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
            Xét hồ sơ
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

  //chọn checkbox
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <div
        style={{
          //   padding: 24,
          minHeight: 360,
          background: "#fff",
          //   borderRadius: "8px",
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
      <ConfirmNVXuLyHoSo
        open={isOpenModal}
        cancelModal={handleCancelModal}
        maDatHang={maDatHang}
        maTrangThai={maTrangThai}
        loadData={loadData}
        messageApi={messageApi}
      ></ConfirmNVXuLyHoSo>
    </>
  );
};

export default NVXuLyHoSo;
