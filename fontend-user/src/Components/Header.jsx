import { useRecoilState } from "recoil";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCTUser, apiLogout } from "../services/auth.service";
import { uploads } from "../constant/api";
import { message } from "antd";
import { getCartDetails, getTotalQuantity } from "../services/cart.service";
import TokenRefresher from "../constant/refreshToken";
import { cartState } from "../constant/recoil";

const Header = function () {
  const [controlUser, setControlUser] = useState(false);
  const [data, setData] = useState(null);
  const [totalCart, setTotalCart] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [cart, setCart] = useRecoilState(cartState);
  const navigate = useNavigate();
  const profile = useMemo(
    () => JSON.parse(localStorage.getItem("profile") || "{}"),
    []
  );
  const token = useMemo(
    () => JSON.parse(localStorage.getItem("tn") || "{}"),
    []
  );

  const loadData = useCallback(async () => {
    if (token && profile) {
      const ctuser = await getCTUser(profile.id, token.access_token);
      if (ctuser?.status_code === 200) {
        setData(ctuser);
        setControlUser(true);
      }
    }
  }, [profile, token]);

  const loadTotal = useCallback(async () => {
    setCart(getTotalQuantity() || 0);
  }, []);

  const handleLogout = useCallback(async () => {
    const logOut = await apiLogout(token.access_token);
    if (logOut?.status_code === 200) {
      localStorage.removeItem("profile");
      localStorage.removeItem("tn");
      setControlUser(false);
      setData(null);
      messageApi.open({
        type: "success",
        content: "Đăng xuất thành công.",
      });
    } else {
      console.error("Logout failed");
    }
  }, [token.access_token, messageApi]);

  useEffect(() => {
    if (profile?.id) {
      loadData();
      loadTotal();
    }
  }, [profile, loadData, loadTotal]);

  return (
    <>
      {contextHolder}
      <header>
        <div className="header-logo">
          <Link to="/">
            <img src="../IMAGE/logo_vinfast.png" alt="" />
          </Link>
        </div>

        <div className="hearder-menu_items">
          <div className="menu-item blue-c">
            Mua xe
            <div className="submenu black-c">
              <ul>
                <li className="submenu-item_title">HÃNG XE PHỔ BIẾN</li>
                {[
                  "Toyota",
                  "Honda",
                  "Mercedes-Benz",
                  "Ford",
                  "BMW",
                  "Hyundai",
                  "Kia",
                  "Mazda",
                  "Vinfast",
                ].map((brand) => (
                  <li className="submenu-item" key={brand}>
                    <a href="#">{brand}</a>
                  </li>
                ))}
              </ul>
              <ul>
                <li className="submenu-item_title">DÒNG XE PHỔ BIẾN</li>
                {[
                  "Mercedes-Benz GL className",
                  "Mercedes-Benz E className",
                  "Mitsubishi Xpander Cross",
                  "Toyota Fortuner",
                  "Mercedes-Benz S className",
                  "Hyundai Santafe",
                  "Toyota Corolla Cross",
                  "Ford Everest",
                  "Toyota Vios",
                ].map((model) => (
                  <li className="submenu-item" key={model}>
                    <a href="#">{model}</a>
                  </li>
                ))}
              </ul>
              <ul>
                <li className="submenu-item_title">GIÁ XE</li>
                {[
                  "Dưới 500 triệu",
                  "Từ 500 - 700 triệu",
                  "Từ 700 - 1 tỷ",
                  "Trên 1 tỷ",
                ].map((priceRange) => (
                  <li className="submenu-item" key={priceRange}>
                    <a href="#">{priceRange}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="menu-item">Bán xe</div>
          <div className="menu-item">Giới thiệu</div>
          <div className="menu-item">Tin tức</div>
        </div>

        <div className="header-controls">
          <Link to="/cart" title="Giỏ hàng">
            <div className="control-cart">
              <img src="../IMAGE/icons8_add_shopping_cart_2.svg" alt="" />
              Giỏ hàng
              <p className="total-cart">{cart}</p>
            </div>
          </Link>
          {!controlUser ? (
            <div className="control-taskuser">
              <img
                className="taskuser-img"
                src="../IMAGE/icons8_user.svg"
                alt="#"
              />
              Tài khoản
              <img
                className="taskuser-img"
                src="../IMAGE/icons8_chevron_down.svg"
                alt=""
              />
              <div className="taskuser-detail">
                <button className="taskuser-detail_login">
                  <Link to="/login"> Đăng nhập</Link>
                </button>
                <button className="taskuser-detail_signup">
                  <Link to="/signup"> Đăng ký</Link>
                </button>
              </div>
            </div>
          ) : (
            <div className="control-taskuser_on">
              <img
                className="taskuser-avt"
                src={`${uploads()}${data?.data.AnhDaiDien}`}
                alt="#"
              />
              {data?.data.HoVaTen}
              <img
                className="taskuser-img"
                src="../IMAGE/icons8_chevron_down.svg"
                alt=""
              />
              <div className="taskuser-detail">
                <button
                  className="taskuser-detail_out"
                  onClick={() => navigate("/purchase")}
                >
                  Đơn hàng
                </button>
                <button className="taskuser-detail_out" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
