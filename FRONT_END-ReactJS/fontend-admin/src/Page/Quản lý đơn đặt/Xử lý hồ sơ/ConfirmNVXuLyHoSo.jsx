import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, message, Table, Row, Col, Timeline } from "antd";
import { apiNhanVienXuLyHoSo } from "../../../services/DatHang.service";
import { apiGetNhanVienbyTK } from "../../../services/NhanVien.service";
import ThongTinDonHang from "../ThongTinDonHang";
import Loading from "../../../Component/Loading/Loading";

const ConfirmNVXuLyHoSo = (props) => {
  const messageApi = message;
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [loading, setLoading] = useState(false);
  const handleConfirmModal = async () => {
    setLoading(true);
    const dulieu = {
      MaDatHang: props.maDatHang,
      MaTrangThai: props.maTrangThai,
    };
    const res = await apiNhanVienXuLyHoSo(dulieu);
    if (res?.status_code === 200) {
      messageApi.success("Thủ tục hồ sơ hoàn thành.");
      handleCancelModal();
      props.loadData();
    }
    setLoading(false);
  };

  const handleCancelModal = () => {
    props.cancelModal();
  };

  return (
    <>
      {loading && <Loading />}
  <Modal
      title=""
      open={props.open}
      onOk={handleConfirmModal}
      onCancel={handleCancelModal}
      width={1000}
      okText="Hoàn thành"
      cancelText="Huỷ bỏ"
    >
      <ThongTinDonHang maDatHang={props.maDatHang}></ThongTinDonHang>
    </Modal>
    </>
  
  );
};

export default ConfirmNVXuLyHoSo;
