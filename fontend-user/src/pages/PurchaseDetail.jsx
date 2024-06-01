import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Loading } from "../Components/Loading/Loading";
import { uploads } from "../constant/api";
import { lc_profile, lc_tn } from "../services/auth.service";
import { apiGetPurchase } from "../services/purchase.service";
import "../style/Checkout.css";
import "../style/purchasedetail.css";

import { Button, Timeline } from "antd";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  formatDatetime,
  formatPrice,
  formatPriceStringVND,
  formatPriceVND,
} from "../shares/format";

function PurchaseDetail() {
  document.title = "Chi tiết đơn hàng";
  const { id } = useParams();
  const tn = lc_tn();

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loadData = async (id, tn) => {
    try {
      const res = await apiGetPurchase(id, tn.access_token);
      if (res?.status_code === 200) {
        setData(res);
        setIsLoading(true);
      } else {
        console.error("Có lỗi xảy ra.");
        setIsLoading(true);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra.");
      setIsLoading(true);
    }
  };

  useEffect(() => {
    loadData(id, tn);
  }, []);

  if (!isLoading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <main>
        <div className="purchasedetails">
          <div className="purchaseDetail-header">
            <div className="checkout-header_icon">
              <img src="/IMAGE/icons8_unknown_status.svg" alt="#" />
            </div>
            <div className="purchasedetails-header_title">
              {data?.data?.trangthai?.[0]?.TrangThai || "Chưa có trạng thái"}
            </div>
          </div>

          <div className="purchasedetail-infor">
            <div className="purchasedetail-infor_title">
              <div className="infor-title_key">
                MÃ ĐƠN HÀNG: {data.data.dathang.MaDatHang}
              </div>
              <div className="infor-title_key">
                THỜI GIAN ĐẶT: {formatDatetime(data.data.dathang.NgayTao)}
              </div>
            </div>
            <div className="purchasedetail-infor_clients">
              <div className="infor-client_detail">
                <div className="client-detail_name">
                  {data.data.khachhang.HoVaTen}
                </div>
                <div className="client-detail_emailSDT">
                  <div className="emailSDT-email">
                    {data.data.khachhang.Email}
                  </div>
                  <div className="emailSDT-sdt">{data.data.khachhang.SDT}</div>
                  <div className="client-detail_sex">
                    {data.data.khachhang.GioiTinh}
                  </div>
                </div>
                <div className="client-detail_cmnd">
                  CMND: {data.data.khachhang.CMND}
                </div>
              </div>
            </div>
            <div className="purchasedetail-infor_order">
              <div className="client-detail_address">
                Địa chỉ: {data.data.khachhang.DiaChi}
              </div>
              <div className="infor-order_form">
                Hình thức nhận: {data.data.dathang.HinhThucNhan}
              </div>
              <div className="infor-order_receivingAddress">
                Địa chỉ nhận: {data.data.dathang.DiaChiNhanXe}
              </div>
            </div>
            <div className="purchasedetail-control">
              <Button type="text" danger>
                Yêu cầu huỷ
              </Button>
              <Button>Liên hệ nhân viên</Button>
            </div>
          </div>

          <div className="purchase-Orderdetails">
            <div className="carts-purchasedetail">
              <div className="carts-purchasedetail_title">
                Chi tiết đơn hàng
              </div>
              {data?.data?.chitietdathang?.map((ct, index) => (
                <div className="cart-purchase" key={index}>
                  <div className="purchase-product_img">
                    <img src={uploads() + ct.HinhAnhXe} alt="oto" />
                  </div>
                  <div className="purchase-product-infors">
                    <div className="purchase-product-infor">
                      <div className="product-infor_title">
                        {ct.TenModel} - {ct.TenPhienBan}
                      </div>
                      <div className="product-infor_color">
                        Màu ngoại thất: {ct.TenMauNgoaiThat}
                      </div>
                      <div className="product-infor_color">
                        Màu nội thất: {ct.TenMauNoiThat}
                      </div>
                      <div className="product-infor_total">
                        Giá tiền: {formatPrice(ct.GiaBan)} x {ct.SoLuong}
                      </div>
                    </div>
                    <div className="purchase-product_price">
                      {formatPrice(ct.SoLuong * ct.GiaBan)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="orderdetail-status">
              <div className="orderdetail-status_title">Lịch sử trạng thái</div>
              <div className="frame-timline">
                <Timeline
                  mode={"right"}
                  items={data?.data?.trangthai?.map((status, index) => ({
                    label: formatDatetime(status.NgayTao),
                    children: status.TrangThai,
                  }))}
                />
              </div>
            </div>
          </div>
          <div className="purchasedetail-bill">
            <div className="purchasedetail-bill-left">Tiền hàng</div>
            <div className="purchasedetail-bill-right">
              {formatPriceStringVND(data.data.dathang.TongTien)} đ
            </div>
            <div className="purchasedetail-bill-left">Phí vận chuyển</div>
            <div className="purchasedetail-bill-right">0 đ</div>
            <div className="purchasedetail-bill-left">Giảm giá</div>
            <div className="purchasedetail-bill-right">0 đ</div>
            <div className="purchasedetail-bill-left">
              Phương thức Thanh toán
            </div>
            <div className="purchasedetail-bill-right">Thanh toán tiền mặt</div>
            <div className="purchasedetail-bill-left">Tổng tiền</div>
            <div className="purchasedetail-bill-right">
              <span>{formatPriceStringVND(data.data.dathang.TongTien)} đ</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PurchaseDetail;
