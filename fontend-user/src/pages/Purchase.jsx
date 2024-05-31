import { useEffect, useState } from "react";
import "../style/purchase.css";

import { Button, notification, Space } from "antd";
import { lc_profile, lc_tn } from "../services/auth.service";
import { apiGetAllPurchase } from "../services/purchase.service";
import {
  formatPrice,
  formatPriceStringVND,
  formatPriceVND,
} from "../shares/formatPrice";
import { uploads } from "../constant/api";
import { Loading } from "../Components/Loading/Loading";
import { Link } from "react-router-dom";

function Purchase() {
  document.title = "Đơn hàng";

  const [api, contextHolder] = notification.useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const tn = lc_tn();
  const profile = lc_profile();
  const loadData = async (profile, tn) => {
    const res = await apiGetAllPurchase(profile.id, tn.access_token);
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

  useEffect(() => {
    loadData(profile, tn);
  }, []);

  if (!isLoading) {
    return <Loading />;
  }
  return (
    <>
      <main>
        <div className="list-purchases">
          <div className="list-purchases-title">Đơn hàng</div>
          {data?.data?.map((item, key) => (
            <div className="carts-purchase" key={key}>
              <div className="carts-purchase_trangthai_thoigian">
                <div className="carts-purchase_thoigian">
                  {item.dathang?.NgayTao}
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
                <Button type="text" danger>
                  Yêu cầu huỷ
                </Button>
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
