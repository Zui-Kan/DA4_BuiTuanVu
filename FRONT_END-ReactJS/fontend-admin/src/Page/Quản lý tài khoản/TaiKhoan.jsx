import React, { useCallback, useEffect, useState } from "react";

import { Breadcrumb, Button, Flex, Table, Input, Modal, message } from "antd";
import moment from "moment";
import {
  ExclamationCircleFilled,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { uploads } from "../../constant/api";
import {
  apiDeleteTaiKhoan,
  apiDeletesTaiKhoan,
  apiSearchTaiKhoan,
} from "../../services/TaiKhoan.service";
import TaiKhoanUpdate from "./TaiKhoanUpdate";
import CTTaiKhoanUpdate from "./ChiTietTaiKhoanUpdate";
import { Link } from "react-router-dom";

const TaiKhoan = () => {
  document.title = "Quản lý tài khoản";

  const [messageApi, contextHolder] = message.useMessage();

  const { confirm } = Modal;
  const { Search } = Input;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalCT, setIsOpenModalCT] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [valueSearch, setValueSearch] = useState(null);
  const [maTaiKhoan, setMaTaiKhoan] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    page: 1,
    pageSize: 5,
    total: 1,
  });

  const [data, setData] = useState([]);

  const loadData = async () => {
    setLoading(true);

    const results = await apiSearchTaiKhoan({
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
      title: "Mã tài khoản",
      dataIndex: "id",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Quyền",
      dataIndex: "role",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      render: (_, record) => (
        <span>
          {moment(record.created_at).format("DD/MM/YYYY") +
            " lúc " +
            moment(record.created_at).format("HH:mm:ss")}
        </span>
      ),
    },

    {
      title: "Chức năng",
      width: "120px",
      render: (_, record) => (
        <Flex justify="center">
          <Button
            onClick={() => {
              setIsOpenModal(true);
              setMaTaiKhoan(record.id);
            }}
          >
            <SettingOutlined />
          </Button>

          <Button
            danger
            style={{ marginLeft: "5px", marginRight: "5px" }}
            onClick={() => {
              showPromiseConfirmDelete(record.id);
            }}
          >
            <DeleteOutlined />
          </Button>

          <Button
            onClick={() => {
              setIsOpenModalCT(true);
              setMaTaiKhoan(record.id);
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

  const handleCancelModal = () => {
    setIsOpenModal(false);
    setIsOpenModalCT(false);
  };

  const onSearch = (value) => {
    setValueSearch(value);
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
  const showPromiseConfirmDelete = (maTaiKhoan) => {
    confirm({
      title: "Xoá thông tin hãng xe ?",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xoá thông tin hãng xe đã chọn ?",
      onOk: async () => {
        const res = await apiDeleteTaiKhoan(maTaiKhoan);
        if (res?.status_code === 200) {
          console.log("xoá thành công");
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
        const res = await apiDeletesTaiKhoan({ ids: selectedRowKeys });
        if (res?.status_code === 200) {
          console.log("xoá thành công");
        }
        loadData();
      },
      onCancel() {},
    });
  };
  return (
    <>
      {contextHolder}

      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to={"/"}>Trang chủ</Link> },
          { title: "Tài khoản" },
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
                setMaTaiKhoan("");
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
          rowKey={(record) => record.id}
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
      <TaiKhoanUpdate
        open={isOpenModal}
        cancelModal={handleCancelModal}
        maTaiKhoan={maTaiKhoan}
        loadData={loadData}
      ></TaiKhoanUpdate>

      <CTTaiKhoanUpdate
        open={isOpenModalCT}
        cancelModal={handleCancelModal}
        maTaiKhoan={maTaiKhoan}
        loadData={loadData}
      ></CTTaiKhoanUpdate>
    </>
  );
};

export default TaiKhoan;
