import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, message, Table, Row, Col, Timeline } from "antd";
import { apiNhanVienGiaoXe } from "../../../services/DatHang.service";
import { apiGetNhanVienbyTK } from "../../../services/NhanVien.service";
import ThongTinDonHang from "../ThongTinDonHang";

const ChiTietDonThanhCong = (props) => {
  const handleCancelModal = () => {
    props.cancelModal();
  };

  return (
    <Modal
      title=""
      open={props.open}
      onOk={handleCancelModal}
      onCancel={handleCancelModal}
      width={1000}
      cancelText="Đóng"
    >
      <ThongTinDonHang maDatHang={props.maDatHang}></ThongTinDonHang>
    </Modal>
  );
};

export default ChiTietDonThanhCong;
