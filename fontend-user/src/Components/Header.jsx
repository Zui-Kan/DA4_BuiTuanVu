import { useRecoilState } from "recoil";
import Marquee from "react-fast-marquee";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = function () {

  

  return (
    <>
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
                <li className="submenu-item">
                  <a href="#">Toyota</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Honda</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Mercedes-Benz</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Fprd</a>
                </li>
                <li className="submenu-item">
                  <a href="#">BMW</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Huyndai</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Kia</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Mazda</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Vinfast</a>
                </li>
              </ul>

              <ul>
                <li className="submenu-item_title">DÒNG XE PHỔ BIẾN</li>
                <li className="submenu-item">
                  <a href="#">Mercedes-Benz GL className</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Mercedes-Benz E className</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Mitsubishi Xpander Cross</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Toyota Fortuner</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Mercedes-Benz S className</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Hyundai Santafe</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Toyota Corolla Cross</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Ford Everest</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Toyota Vios</a>
                </li>
              </ul>
              <ul>
                <li className="submenu-item_title">GIÁ XE</li>
                <li className="submenu-item">
                  <a href="#">Dưới 500 triệu</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Từ 500 - 700 triệu</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Từ 700 - 1 tỷ</a>
                </li>
                <li className="submenu-item">
                  <a href="#">Trên 1 tỷ</a>
                </li>
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
              <p className="total-cart">4</p>
            </div>
          </Link>

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
              <button className="taskuser-detail_login">Đăng nhập</button>
              <button className="taskuser-detail_signup">Đăng ký</button>
            </div>
          </div>

          <div className="control-taskuser_on">
            <img
              className="taskuser-avt"
              src="../IMAGE/icons8_user.svg"
              alt="#"
            />
            Nguyễn Văn A
            <img
              className="taskuser-img"
              src="../IMAGE/icons8_chevron_down.svg"
              alt=""
            />
            <div className="taskuser-detail">
              <button className="taskuser-detail_out">Đăng xuất</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
