import { useRecoilState } from "recoil";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiLogout } from "../services/auth.service";
import { uploads } from "../constant/api";
import { Button, Form, Input, message, Modal } from "antd";
import { getCartDetails, getTotalQuantity } from "../services/cart.service";
import { cartState } from "../constant/recoil";
import { apiChangePassword, getCTUser, getMenu } from "../services/header.service";

const Header = function () {
  const [controlUser, setControlUser] = useState(false);
  const [data, setData] = useState(null);
  const [isMenu, setIsMenu] = useState(null);
  const [totalCart, setTotalCart] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const formItemLayout = {
    labelCol: { xs: { span: 5 }, sm: { span: 5 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
  };
  const navigate = useNavigate();
  const profile = useMemo(
    () => JSON.parse(localStorage.getItem("profile") || "{}"),
    []
  );
  const handleModel = () => {
    setOpen(true);
  };
  const loadData = useCallback(async () => {
    if (profile) {
      const ctuser = await getCTUser(profile.id);
      if (ctuser?.status_code === 200) {
        setData(ctuser);
        setControlUser(true);
      }
    }
  }, [profile]);

  const loadMenu = useCallback(async () => {
    const menu = await getMenu();
    if (menu?.status_code === 200) {
      setIsMenu(menu);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    const logOut = await apiLogout();
    if (logOut?.status_code === 200) {
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      setControlUser(false);
      setData(null);
      messageApi.open({
        type: "success",
        content: "Đăng xuất thành công.",
      });
    } else {
      console.error("Logout failed");
    }
  }, [messageApi]);

  const handleChangePassword = async (values) => {
    const res = await apiChangePassword({ ...values, id: data?.data?.TaiKhoanID });
    if (res?.status_code === 200) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "Đổi mật khẩu thành công.",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Đổi mật khẩu không thành công.",
      }); 
    }
  };
  useEffect(() => {
    loadMenu();
    if (profile?.id) {
      loadData();
    }
  }, [profile, loadData]);

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
          {" "}
          <Link to={"/"} className="menu-item blue-c">
            Trang chủ
          </Link>
          <div className="menu-item">
            Mua xe
            <div className="submenu black-c">
              <ul>
                <li className="submenu-item_title">HÃNG XE PHỔ BIẾN</li>
                {isMenu?.data?.hangxe?.data.map((brand) => (
                  <Link to={`/carcompany/${brand.MaHang}`} key={brand.MaHang}>
                    <li className="submenu-item">{brand.TenHang}</li>
                  </Link>
                ))}
              </ul>
              <ul>
                <li className="submenu-item_title">LOẠI XE {"         "}</li>
                {isMenu?.data?.loaixe?.data.map((priceRange) => (
                  <Link
                    to={`/category/${priceRange.MaLoaiXe}`}
                    key={priceRange.MaLoaiXe}
                  >
                    <li className="submenu-item">{priceRange.TenLoaiXe}</li>
                  </Link>
                ))}
              </ul>
              <ul>
                <li className="submenu-item_title">DÒNG XE PHỔ BIẾN</li>
                {isMenu?.data?.topxe.map((model) => (
                  <Link to={`/detail/${model.MaModel}`} key={model.MaModel}>
                    <li className="submenu-item">{model.TenModel}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <Link to={"/forum"} className="menu-item">
            Diễn đàn
            <div className="submenu-forum black-c">
              <ul>
                <li className="submenu-item_title">CHỦ ĐỀ BÀI VIẾT</li>
                {isMenu?.data?.chude?.data.map((model) => (
                  <Link to={`/topic/${model.MaChuDe}`} key={model.MaChuDe}>
                    <li className="submenu-item">{model.TenChuDe}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </Link>
          <Link className="menu-item">Giới thiệu</Link>
        </div>

        <div className="header-controls">
          <Link to="/cart" title="Giỏ hàng">
            <div className="control-cart">
              <img src="../IMAGE/icons8_add_shopping_cart_2.svg" alt="" />
              Giỏ hàng
              <p className="total-cart">{getTotalQuantity()}</p>
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
                <button
                  className="taskuser-detail_out"
                  onClick={handleModel}
                >
                  Đổi mật khẩu
                </button>
                <button className="taskuser-detail_out" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      <Modal
        title="Đổi mật khẩu"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={500}
        okText="Lưu"
        cancelText="Huỷ bỏ"
        footer=""
      >
        <div className="modal-center">
          <Form
            {...formItemLayout}
            style={{ width: "100%" }}
            layout="vertical"
            onFinish={handleChangePassword}
          >
            <Form.Item
              label="Mật khẩu cũ"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  height: "40px",
                  background: "#1890ff",
                }}
              >
                ĐỔI MẬT KHẨU
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Header;
