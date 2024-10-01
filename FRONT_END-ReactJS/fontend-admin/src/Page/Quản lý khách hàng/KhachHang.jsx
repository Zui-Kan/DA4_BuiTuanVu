import React, { useEffect, useState } from "react";

import { Breadcrumb, Button, Flex, Table, Input, Modal, message } from "antd";
import moment from "moment";
import {
  ExclamationCircleFilled,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { uploads } from "../../constant/api";

import {
  apiDeleteKhachHang,
  apiDeletesKhachHang,
  apiSearchKhachHang,
} from "../../services/KhachHang.service";

import KhachHangUpdate from "./KhachHangUpdate";
import { Link } from "react-router-dom";

import {
  formatPrice,
  formatPriceStringVND,
  formatPriceVND,
} from "../../shares/format";

const KhachHang = () => {
  document.title = "Quản lý khách hàng";
  const messageApi = message;

  const { confirm } = Modal;
  const { Search } = Input;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [maKhachHang, setMaKhachHang] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [valueSearch, setValueSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    page: 1,
    pageSize: 5,
    total: 1,
  });
  const [data, setData] = useState([]);

  const loadData = async () => {
    setLoading(true);
    const results = await apiSearchKhachHang({
      ...tableParams,
      search: valueSearch,
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
  };

  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "MaKhachHang",
    },
    {
      title: "Mã tài khoản",
      dataIndex: "TaiKhoanID",
    },
    {
      title: "Họ Tên",
      dataIndex: "HoVaTen",
    },
    {
      title: "Giới tính",
      dataIndex: "GioiTinh",
    },
    {
      title: "Địa chỉ Email",
      dataIndex: "Email",
    },
    {
      title: "SĐT",
      dataIndex: "SDT",
    },

    {
      title: "Chứng minh nhân dân",
      dataIndex: "CMND",
    },
    {
      title: "Địa chỉ",
      dataIndex: "DiaChi",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngaytao",
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
            title="Sửa"
            onClick={() => {
              setIsOpenModal(true);
              setMaKhachHang(record.MaKhachHang);
            }}
          >
            <SettingOutlined />
          </Button>

          <Button
            title="Xoá"
            danger
            style={{ marginLeft: "5px" }}
            onClick={() => {
              showPromiseConfirmDelete(record.MaKhachHang);
            }}
          >
            <DeleteOutlined />
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

  //Show delete
  const showPromiseConfirmDelete = (maKhachHang) => {
    confirm({
      title: "Xoá thông tin hãng xe ?",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xoá thông tin hãng xe đã chọn ?",
      onOk: async () => {
        const res = await apiDeleteKhachHang(maKhachHang);
        if (res?.status_code === 200) {
          messageApi.open({
            type: "success",
            content: "Xoá thành công.",
          });
        }
        loadData();
      },
      onCancel() {},
    });
  };

  const showPromiseConfirmDeletes = () => {
    confirm({
      title: "Xoá các thông tin hãng xe ?",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xoá các thông tin hãng đã chọn?",
      onOk: async () => {
        const res = await apiDeletesKhachHang({ ids: selectedRowKeys });
        if (res?.status_code === 200) {
          messageApi.open({
            type: "success",
            content: "Xoá thành công.",
          });
        }
        loadData();
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to={"/"}>Trang chủ</Link> },
          { title: "Hãng xe" },
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
        <div className="control-btn_them">
          <Search
            placeholder="Nhập tìm kiếm..."
            allowClear
            onSearch={onSearch}
            style={{
              width: 400,
            }}
          />
          <div className="control-btn_themAxoa">
            <Button
              type="primary"
              onClick={() => {
                setIsOpenModal(true);
                setMaKhachHang("");
              }}
            >
              Thêm mới
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                if (selectedRowKeys.length === 0) {
                  messageApi.open({
                    type: "error",
                    content: "Vui lòng chọn thông tin cần xoá.",
                  });
                } else {
                  showPromiseConfirmDeletes();
                }
              }}
            >
              Xoá
            </Button>
          </div>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          rowKey={(record) => record.MaKhachHang}
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

      <KhachHangUpdate
        open={isOpenModal}
        cancelModal={handleCancelModal}
        maKhachHang={maKhachHang}
        loadData={loadData}
        messageApi={messageApi}
      ></KhachHangUpdate>
    </>
  );
};

export default KhachHang;
