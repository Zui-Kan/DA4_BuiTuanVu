import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "../style/Checkout.css";

import { Button, Modal } from "antd";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  document.title = "Đặt xe thành công";

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
          <div className="checkout-infor"></div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccess;
