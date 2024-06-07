import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

import { Modal, message, Table, Row, Col, Timeline } from "antd";

import moment from "moment";
import { apiGetChiTietDatHang } from "../../services/TrangThai/TrangThai1.service";
import { uploads } from "../../constant/api";
import { formatDatetime, formatPrice } from "../../shares/format";

const ThongTinDonHang = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataDatHang, setDataDatHang] = useState([]);
  const [dataKhachHang, setDataKhachHang] = useState([]);
  const [dataTrangThai, setDataTrangThai] = useState([]);
  const [dataChiTietDonhang, setDataChiTietDonhang] = useState([]);

  const loadData = async () => {
    setLoading(true);
    const res = await apiGetChiTietDatHang(props.maDatHang);
    if (res?.status_code === 200) {
      setDataDatHang(res?.data.dathang);
      setDataKhachHang(res?.data.khachhang);
      setDataTrangThai(res?.data.trangthai);
      setDataChiTietDonhang(res?.data.chitietdathang);

      setLoading(false);
    } else {
      console.error("Lỗi rồi:", res?.message);
    }
  };

  useEffect(() => {
    if (props.maDatHang !== "") {
      loadData(props.maDatHang);
    }
  }, [props.maDatHang]);

  const columnChiTietDH = [
    {
      title: "Mã chi tiết",
      dataIndex: "MaChiTietDatHang",
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
      title: "Tên xe",
      dataIndex: "TenModel",
    },
    {
      title: "Phiên bản",
      dataIndex: "TenPhienBan",
    },
    {
      title: "Màu ngoại thất",
      dataIndex: "TenMauNgoaiThat",
    },
    {
      title: "Màu nội thất",
      dataIndex: "TenMauNoiThat",
    },
    {
      title: "Số lượng",
      dataIndex: "SoLuong",
    },
    {
      title: "Giá",
      dataIndex: "GiaBan",

      render: (_, record) => <span>{formatPrice(record.GiaBan)}</span>,
    },
  ];

  return (
    <>
      <Row className="thongtindathang" gutter={[16, 16]}>
        <Col span={24}>
          <div className="infor-dathang">
            <div className="infor-title">THÔNG TIN ĐƠN HÀNG</div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className="dathang-MaDatHang">
                  Mã đơn: {dataDatHang?.MaDatHang}
                </div>
              </Col>
              <Col span={12}>
                <div className="dathang-NgayTao">
                  Ngày tạo: {formatDatetime(dataDatHang?.NgayTao)}
                </div>
              </Col>
              <Col span={24}>
                <div className="dathang-HinhThucNhan">
                  Hình thức nhận: {dataDatHang?.HinhThucNhan}
                </div>
                <div className="dathang-DiaChiNhanXe">
                  Địa chỉ nhận: {dataDatHang?.DiaChiNhanXe}
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={14}>
          <div className="infor-khachhang">
            <div className="khachhang-title">
              Thông tin khách hàng - Mã {dataKhachHang?.MaKhachHang}
            </div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div className="khachhang-HoVaTen">
                  Họ và tên: {dataKhachHang?.HoVaTen}
                </div>
              </Col>
              <Col span={12}>
                <div className="khachhang-Email">
                  Email: {dataKhachHang?.Email}
                </div>
              </Col>
              <Col span={12}>
                <div className="khachhang-GioiTinh">
                  Giới tính: {dataKhachHang?.GioiTinh}
                </div>
              </Col>
              <Col span={12}>
                <div className="khachhang-CMND">
                  CMND: {dataKhachHang?.CMND}
                </div>
              </Col>
              <Col span={12}>
                <div className="khachhang-SDT">SĐT: {dataKhachHang?.SDT}</div>
              </Col>
              <Col span={24}>
                <div className="khachhang-DiaChi">
                  Địa chỉ: {dataKhachHang?.DiaChi}
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={10}>
          <div className="khachhang-title">Trạng thái đơn hàng</div>
          <Timeline
            mode={"right"}
            items={dataTrangThai?.map((status, index) => ({
              label: formatDatetime(status.NgayTao),
              children: status.TrangThai,
            }))}
          />
        </Col>
      </Row>

      <Table
        columns={columnChiTietDH}
        rowKey={(record) => record.MaChiTietDatHang}
        dataSource={dataChiTietDonhang}
        loading={loading}
      />

      <div className="tongtien-donhang">
        Tổng tiền: <nav>{dataDatHang?.TongTien}</nav>
      </div>
      <hr />
    </>
  );
};

export default ThongTinDonHang;
