import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, message, Table, Row, Col, Timeline } from "antd";
import ThongTinDonHang from "../ThongTinDonHang";

const ConfirmNVGiaoXe = (props) => {
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
    >
      <ThongTinDonHang maDatHang={props.maDatHang}></ThongTinDonHang>
    </Modal>
  );
};

export default ConfirmNVGiaoXe;
