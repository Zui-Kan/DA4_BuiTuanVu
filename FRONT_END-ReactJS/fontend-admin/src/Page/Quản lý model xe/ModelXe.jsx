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
  apiDeleteModelXe,
  apiDeletesModelXe,
  apiSearchModelXe,
} from "../../services/ModelXe.service";
import ModelXeUpdate from "./AddModel";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";

const ModelXe = () => {
  document.title = "Quản lý xe ô tô";

  const [messageApi, contextHolder] = message.useMessage();

  const { confirm } = Modal;
  const { Search } = Input;
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalCT, setIsOpenModalCT] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [valueSearch, setValueSearch] = useState(null);
  const [maModelXe, setMaModelXe] = useState("");
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

    const results = await apiSearchModelXe({
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
      title: "Mã xe",
      dataIndex: "MaModel",
    },

    {
      title: "Hình ảnh",
      dataIndex: "HinhAnhXe",
      render: (_, record) => (
        <div className="table-img_khung">
          <img src={uploads() + record.HinhAnhXe} alt="" />
        </div>
      ),
    },
    {
      title: "Mã loại",
      dataIndex: "MaLoaiXe",
    },
    {
      title: "Mã hãng",
      dataIndex: "MaHang",
    },
    {
      title: "Tên xe",
      dataIndex: "TenModel",
    },
    {
      title: "Giá xe",
      dataIndex: "Gia",
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
            onClick={() => {
              navigate(`/updatemodelxe/${record.MaModel}`);
            }}
          >
            <SettingOutlined />
          </Button>

          <Button
            danger
            style={{ marginLeft: "5px", marginRight: "5px" }}
            onClick={() => {
              showPromiseConfirmDelete(record.MaModel);
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
  const showPromiseConfirmDelete = (maModelXe) => {
    confirm({
      title: "Xoá thông tin hãng xe ?",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xoá thông tin hãng xe đã chọn ?",
      onOk: async () => {
        const res = await apiDeleteModelXe(maModelXe);
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
        const res = await apiDeletesModelXe({ ids: selectedRowKeys });
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
      {loading && <Loading />}
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to={"/"}>Trang chủ</Link> },
          { title: "Xe ô tô" },
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
                navigate(`/addmodel`);
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
          rowKey={(record) => record.MaModel}
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
    </>
  );
};

export default ModelXe;
