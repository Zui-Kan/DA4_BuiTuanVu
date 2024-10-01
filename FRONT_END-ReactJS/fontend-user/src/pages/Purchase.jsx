import { useEffect, useState } from "react";
import "../style/purchase.css";

import { Button, notification, Space } from "antd";
import { lc_profile } from "../services/auth.service";
import { apiGetAllPurchase } from "../services/purchase.service";
import { formatDatetime, formatPrice } from "../shares/format";
import { uploads } from "../constant/api";
import { Loading } from "../Components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

function Purchase() {
  document.title = "Đơn hàng";
  const [api, contextHolder] = notification.useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const profile = lc_profile();
  const loadData = async (profile) => {
    const res = await apiGetAllPurchase(profile.id);
    if (res?.status_code === 200) {
      setData(res);
      setIsLoading(true);
    } else {
      api["error"]({
        message: "Thông báo lỗi",
        description: "Lỗi không tạo được",
      });
    }
  };

  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token") || null);

  useEffect(() => {
    if (!token) {
      navigate(-1);
    }
    loadData(profile);
  }, []);
  console.log(data);
  if (!isLoading) {
    return <Loading />;
  }

  return (
    <>
      <main>
        <div className="list-purchases">
          <div className="list-purchases-title">Đơn hàng</div>
          {data?.data?.map((item, key) => (
            <div
              className={
                `carts-purchase ` +
                (item.trangthai?.TrangThai ===
                "Hoàn thành giao xe và thanh toán"
                  ? "khung-mauxanh"
                  : item.trangthai?.TrangThai === "Đã huỷ"
                  ? "khung-maudo"
                  : "")
              }
              key={key}
            >
              <div className="carts-purchase_trangthai_thoigian">
                <div className="carts-purchase_thoigian">
                  {formatDatetime(item.dathang?.NgayTao)}
                </div>
                <div className="carts-purchase_trangthai">
                  {item.trangthai?.TrangThai}
                </div>
              </div>
              {item.chitietdathang?.map((ct, index) => (
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

              <div className="carts-purchase-tongtien">
                Thành tiền:{" "}
                <span className="total-giatien">
                  {formatPrice(item.dathang?.TongTien)} đ
                </span>
              </div>
              <div className="carts-purchase-control">
                <Link to={`/purchasedetail/${item.dathang.MaDatHang}`}>
                  <Button>Xem chi tiết</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Purchase;
