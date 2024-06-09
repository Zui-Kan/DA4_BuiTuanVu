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
  apiDeleteHangXe,
  apiDeletesHangXe,
  apiSearchHangXe,
} from "../../services/HangXe.service";

import HangXeUpdate from "./HangXeUpdate";
import { Link } from "react-router-dom";

const HangXe = () => {
  document.title = "Quản lý hãng xe";

  const { confirm } = Modal;
  const { Search } = Input;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [maHangXe, setMaHangXe] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [valueSearch, setValueSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    page: 1,
    pageSize: 2,
    total: 1,
  });
  const [data, setData] = useState([]);

  const loadData = async () => {
    setLoading(true);
    const results = await apiSearchHangXe({
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
      title: "Mã hãng",
      dataIndex: "MaHang",
    },
    {
      title: "Hình ảnh",
      dataIndex: "HinhAnhHangXe",
      render: (_, record) => (
        <div className="table-img_khung">
          <img src={uploads() + record.HinhAnhHangXe} alt="" />
        </div>
      ),
    },
    {
      title: "Tên hãng",
      dataIndex: "TenHang",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngaytao",
      // width: "200px",
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
              setMaHangXe(record.MaHang);
            }}
          >
            <SettingOutlined />
          </Button>

          <Button
            title="Xoá"
            danger
            style={{ marginLeft: "5px" }}
            onClick={() => {
              showPromiseConfirmDelete(record.MaHang);
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
  //button tìm kiếm
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
  const showPromiseConfirmDelete = (maHangXe) => {
    confirm({
      title: "Xoá thông tin hãng xe ?",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xoá thông tin hãng xe đã chọn ?",
      onOk: async () => {
        const res = await apiDeleteHangXe(maHangXe);
        if (res?.status_code === 200) {
          message.open({
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
        const res = await apiDeletesHangXe({ ids: selectedRowKeys });
        if (res?.status_code === 200) {
          message.open({
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
                setMaHangXe("");
              }}
            >
              Thêm mới
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                if (selectedRowKeys.length === 0) {
                  message.open({
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
          rowKey={(record) => record.MaHang}
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

      <HangXeUpdate
        open={isOpenModal}
        cancelModal={handleCancelModal}
        maHangXe={maHangXe}
        loadData={loadData}
      ></HangXeUpdate>
    </>
  );
};

export default HangXe;
