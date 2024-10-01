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
  apiDeleteLoaiXe,
  apiDeletesLoaiXe,
  apiSearchLoaiXe,
} from "../../services/LoaiXe.service";
import LoaiXeUpdate from "./LoaiXeUpdate";
import { Link } from "react-router-dom";

const LoaiXe = () => {
  document.title = "Quản lý loại xe";

  const [messageApi, contextHolder] = message.useMessage();

  const { confirm } = Modal;
  const { Search } = Input;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [valueSearch, setValueSearch] = useState(null);
  const [maLoaiXe, setMaLoaiXe] = useState("");
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

    const results = await apiSearchLoaiXe({
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
      title: "Mã loại xe",
      dataIndex: "MaLoaiXe",
    },
    {
      title: "Hình ảnh",
      dataIndex: "HinhAnhLoaiXe",
      render: (_, record) => (
        <div className="table-img_khung">
          <img src={uploads() + record.HinhAnhLoaiXe} alt="" />
        </div>
      ),
    },
    {
      title: "Tên loại xe",
      dataIndex: "TenLoaiXe",
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
            onClick={() => {
              setIsOpenModal(true);
              setMaLoaiXe(record.MaLoaiXe);
            }}
          >
            <SettingOutlined />
          </Button>

          <Button
            danger
            style={{ marginLeft: "5px" }}
            onClick={() => {
              showPromiseConfirmDelete(record.MaLoaiXe);
            }}
          >
            <DeleteOutlined />
          </Button>
        </Flex>
      ),
    },
  ];

  //load data
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

  //chọn checkbox
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //Show delete
  const showPromiseConfirmDelete = (maLoaiXe) => {
    confirm({
      title: "Xoá thông tin hãng xe ?",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xoá thông tin hãng xe đã chọn ?",
      onOk: async () => {
        const res = await apiDeleteLoaiXe(maLoaiXe);
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
        const res = await apiDeletesLoaiXe({ ids: selectedRowKeys });
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
          { title: "Loại xe" },
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
                setMaLoaiXe("");
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
          rowKey={(record) => record.MaLoaiXe}
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
      <LoaiXeUpdate
        open={isOpenModal}
        cancelModal={handleCancelModal}
        maLoaiXe={maLoaiXe}
        loadData={loadData}
      ></LoaiXeUpdate>
    </>
  );
};

export default LoaiXe;
