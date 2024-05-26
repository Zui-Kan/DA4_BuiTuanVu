import { Link, useNavigate } from "react-router-dom";
import { closeNav, closeNavMid, openNav, openNavMid } from "../utils/hide_menu";
import { useEffect, useState } from "react";
import { getMenus } from "../services/header.services";
import { useRecoilState } from "recoil";
import { cartState } from "../constant/recoil";
const Header = function () {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useRecoilState(cartState);
  const [search_content, setSearchContent] = useState("");
  
  function changeInputValue(e: any) {
    setSearchContent(e.target.value);
  }
  function search(formData: any) {
    formData.preventDefault();
    navigate("/search?search_content=" + search_content);
  }
  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(list);
    async function loadData() {
      let data = await getMenus();
      setMenus(data);
    }
    loadData();
  }, []);
  return (
    <>
      <section className="header-i-out">
        <div className="header-inner" id="hideInner">
          <a href="#">
            <i className="fas fa-dollar-sign"></i> Cam kết giá tốt
          </a>
          <a href="#">
            <i className="fas fa-truck"></i> Miễn phí vận chuyển
          </a>
          <a href="#">
            <i className="fas fa-handshake"></i> Thanh toán khi nhận hàng
          </a>
          <a href="#">
            <i className="fas fa-history"></i> Bảo hành tận nơi
          </a>
          <span className="sp-h-in-r" id="boxrighttop">
            <a href="login.html" id="i">
              <i className="fas fa-user"></i> Đăng nhập
            </a>
            <a href="signup.html" id="i">
              <i className="fas fa-user-plus"></i> Đăng ký
            </a>
          </span>
          <div className="box-right-top-KH" id="boxrighttopKH">
            <a id="i">
              Xin chào, <span id="tenkhachhang">Nguyễn Văn A</span>
            </a>
            <div className="box-login-bottom" id="box-b">
              <button>
                <i className="fas fa-user-alt"></i> Tài khoản
              </button>
              {/* <button onClick={LogOut()}><i className="fas fa-sign-out-alt"></i> Đăng xuất</button> */}
            </div>
          </div>
        </div>
      </section>
      <section className="header-m-out">
        <div className="header-mid" id="hideMid">
          <Link to={"/"} id="m">
            <img src="img/logo.png" />
          </Link>
          <Link to={"/cart"} className="cart">
            <i className="fas fas fa-shopping-cart"></i>
            <span className="cart_number">{cart.length}</span>
          </Link>
          <form className="search" onSubmit={(e) => search(e)}>
            <input
              type="text"
              onChange={(e) => changeInputValue(e)}
              placeholder="Tìm kiếm sản phẩm..."
              name="search_content"
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div className="mid-small" id="lg">
            <Link to={"/"}>
              <img src="img/logo.png" />
            </Link>
          </div>
          <a
            href="javascript:void(0);"
            className="icon-mid"
            onClick={() => openNavMid()}
            id="lg"
          >
            <i className="fas fa-bars"></i>
          </a>
        </div>
        <div className="sidenavMid" id="mySidenavMid">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={() => closeNavMid()}
          >
            <i className="far fa-window-close"></i>
          </a>
          <form className="search" action="#">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              name="search_prod"
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <hr />
          <a href="signup.html" className="text-res">
            <i className="far fa-user-circle"></i> Đăng ký
          </a>
          <a href="login.html" className="text-res">
            <i className="far fa-user-circle"></i> Đăng nhập
          </a>
          <hr />
          <ul>
            <li>
              <Link to={"/list/1"}>
                <i className="fas fa-phone-volume"></i> Bán hàng trực tuyến
              </Link>
            </li>
            <li>
              <a href="MuaTraGop.html">
                <i className="fas fa-money-check-alt"></i> Mua trả góp
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-cart-arrow-down"></i> Khuyến mại
              </a>
            </li>
            <li>
              <a href="TinTuc.html">
                <i className="far fa-newspaper"></i> Tin tức
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className="header-b-out">
        <div className="header-bottom" id="hideBottom">
          <ul>
            <li>
              <a href="#">
                <b>
                  <span className="sp-h-bot category">
                    <i className="fas fa-bars"></i> Danh mục sản phẩm
                  </span>
                </b>
              </a>
              <ul className="submenu">
                {menus.map((x: any) => (
                  <li>
                    <Link to={"/list/" + x.maDanhMuc}>
                      <i className="fas fa-desktop"></i> {x.tenDanhMuc}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link to={"/list/1"}>
                <b>
                  <i className="fas fa-phone-volume"></i>
                  <span className="sp-h-bot"> Bán hàng trực tuyến</span>
                </b>
              </Link>
            </li>
            <li>
              <a href="MuaTraGop.html">
                <b>
                  <i className="fas fa-money-check-alt"></i>
                  <span className="sp-h-bot"> Mua trả góp</span>
                </b>
              </a>
            </li>
            <li>
              <a href="#">
                <b>
                  <i className="fas fa-cart-arrow-down"></i>
                  <span className="sp-h-bot"> Khuyến mại</span>
                </b>
              </a>
            </li>
            <li>
              <a href="TinTuc.html">
                <b>
                  <i className="far fa-newspaper"></i>
                  <span className="sp-h-bot"> Tin tức</span>
                </b>
              </a>
            </li>
          </ul>
          <a
            href="javascript:void(0);"
            className="icon"
            onClick={() => openNav()}
          >
            <i className="fas fa-bars"></i>
          </a>
        </div>
        <div className="sidenav" id="mySidenav">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={() => closeNav()}
          >
            <i className="far fa-window-close"></i>
          </a>
          <ul>
            {menus.map((x: any) => (
              <li>
                <Link to={"/list/" + x.maDanhMuc}>
                  <i className="fas fa-desktop"></i> {x.tenDanhMuc}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
export default Header;
