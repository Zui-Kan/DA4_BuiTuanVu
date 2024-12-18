import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, message, Table, Row, Col, Timeline } from "antd";
import { apiNhanVienXacNhan } from "../../../services/DatHang.service";
import { apiGetNhanVienbyTK } from "../../../services/NhanVien.service";
import ThongTinDonHang from "../ThongTinDonHang";
import Loading from "../../../Component/Loading/Loading";

const ConfirmNVNhanDonHang = (props) => {
  const messageApi = message;
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [loading, setLoading] = useState(false);
  const handleConfirmModal = async () => {
    setLoading(true);
    const getNV = await apiGetNhanVienbyTK(profile.id);
    if (getNV && getNV.status_code === 200) {
      const dulieu = {
        MaDatHang: props.maDatHang,
        MaNhanVien: getNV?.data?.MaNhanVien,
        MaTrangThai: props.maTrangThai,
      };
      const res = await apiNhanVienXacNhan(dulieu);
      if (res?.status_code === 200) {
        messageApi.success("Nhận đơn hàng thành công");
        handleCancelModal();
        props.loadData();
      }
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
      okText="Xác nhận"
      cancelText="Huỷ bỏ"
    >
      <ThongTinDonHang maDatHang={props.maDatHang}></ThongTinDonHang>
    </Modal>
    </>
  );
};

export default ConfirmNVNhanDonHang;
