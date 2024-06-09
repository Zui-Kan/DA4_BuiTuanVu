import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "../style/Checkout.css";

import { Button, Modal } from "antd";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

function OrderSuccess() {
  document.title = "Đặt xe thành công";
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <main>
        <div className="checkout">
          <div className="checkout-header">
            <div className="checkout-header_icon">
              <img src="/IMAGE/icons8_ok.svg" alt="#" />
            </div>
            <div className="checkout-header_title">Đặt hàng thành công</div>
          </div>
          <div className="checkout-success">
            <Button type="primary" key="console" onClick={() => navigate("/")}>
              Về trang chủ
            </Button>
            ,
            <Button key="buy" onClick={() => navigate(`/purchasedetail/${id}`)}>
              Chi tiết đơn
            </Button>
            ,
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccess;
