import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, message, Table, Row, Col, Timeline } from "antd";
import { apiNhanVienGiaoXe } from "../../../services/DatHang.service";
import { apiGetNhanVienbyTK } from "../../../services/NhanVien.service";
import ThongTinDonHang from "../ThongTinDonHang";
import Loading from "../../../Component/Loading/Loading";

const ConfirmNVGiaoXe = (props) => {
  const messageApi = message;
  const [loading, setLoading] =   (false);

  const handleConfirmModal = async () => {
    setLoading(true);
    const dulieu = {
      MaDatHang: props.maDatHang,
      MaTrangThai: props.maTrangThai,
    };
    const res = await apiNhanVienGiaoXe(dulieu);
    if (res?.status_code === 200) {
      messageApi.success("Giao xe thành công.");
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

export default ConfirmNVGiaoXe;
