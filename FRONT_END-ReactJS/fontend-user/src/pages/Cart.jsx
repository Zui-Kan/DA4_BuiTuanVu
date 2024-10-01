import "../style/Cart.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import {
  getCartDetails,
  getTotalQuantity,
  removeFromCart,
  updateQuantityInCart,
} from "../services/cart.service";
import { formatPrice } from "../shares/format";
import { uploads } from "../constant/api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message, InputNumber } from "antd";
import { Loading } from "../Components/Loading/Loading";
import { useRecoilState } from "recoil";
import { cartCheckout, cartState } from "../constant/recoil";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  document.title = "Giỏ hàng";
  const [data, setData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [checkout, setCheckout] = useRecoilState(cartCheckout);
  const navigate = useNavigate();
  const messageAPI = message;
  const token = JSON.parse(localStorage.getItem("token") || null);

  const loadData = async () => {
    const details = await getCartDetails();
    setData(details);
    setSelectedItems(new Array(details.listCart.length).fill(false));
    setIsDataLoaded(true);
  };

  useEffect(() => {
    loadData();
  }, []);


  //Checkbox
  const handleCheckboxChange = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
  };


  //Checkbox tất cả
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedItems(selectedItems.map(() => isChecked));
  };

  const handleDeleteChange = async (maMauNoiThat) => {
    await removeFromCart(maMauNoiThat);
    messageAPI.success("Sản phẩm đã được xóa khỏi giỏ hàng.");
    loadData();
  };

  const handleDeleteAllChange = async () => {
    const itemsToDelete = data.listCart
      .filter((_, index) => selectedItems[index])
      .map((item) => item.MaMauNoiThat);

    for (const maMauNoiThat of itemsToDelete) {
      await removeFromCart(maMauNoiThat);
    }
    messageAPI.success("Sản phẩm đã được xóa khỏi giỏ hàng.");
    loadData();
  };


  const handleCheckoutChange = async () => {
    const itemsCheckout = data.listCart.filter(
      (_, index) => selectedItems[index]
    );
    setCheckout(itemsCheckout);

    if (itemsCheckout.length < 1) {
      messageAPI.error("Vui lòng chọn xe cần thanh toán!!!");
    } else if (!token) {
      messageAPI.error("Vui lòng đăng nhập để thanh toán!!!");
    } else {
      navigate("/checkout");
    }
  };

  const onChangeQuantity = async (index, value) => {
    updateQuantityInCart(index, value);
    loadData();
    navigate("/cart");
  };

  const calculateTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    data?.listCart.forEach((item, index) => {
      if (selectedItems[index]) {
        totalQuantity += item.SoLuong;
        totalPrice += item.SoLuong * item.Gia;
      }
    });
    return { totalQuantity, totalPrice };
  };

  const { totalQuantity, totalPrice } = calculateTotal();

  if (!isDataLoaded) {
    return <Loading />;
  }
  return (
    <>
      <main>
        <div className="shopping-cart">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={{ width: "4%" }}>
                  <label className="custom-checkbox">
                    <input
                      name="checkbox_all"
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <span className="checkmark"></span>
                  </label>
                </th>
                <th scope="col" style={{ width: "9%" }}>
                  Ảnh
                </th>
                <th scope="col" style={{ width: "40%" }}>
                  Thông tin
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  Đơn giá
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  Số lượng
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  Số tiền
                </th>
                <th scope="col" style={{ width: "76%" }}>
                  <Popconfirm
                    title="Delete"
                    description="Bạn có chắc muốn xoá các sản phẩm đã chọn?"
                    onConfirm={() => handleDeleteAllChange()}
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
                    }
                  >
                    <button type="button" className="btn-xoatat">
                      Xoá tất
                    </button>
                  </Popconfirm>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.listCart.map((item, index) => (
                <tr key={item.MaMauNoiThat}>
                  <td className="inp-soluong_cart">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td>
                    <Link to={`/detail/${item.MaModel}`}>
                      <div className="khung-img-cart inp-soluong_cart">
                        <img
                          className="img-cart"
                          src={`${uploads()}${item.HinhAnhXe}`}
                          alt=""
                        />
                      </div>
                    </Link>
                  </td>

                  <td>
                    <Link to={`/detail/${item.MaModel}`}>
                      <div className="cart-thongtin">
                        <a className="thongtin-title">{item.TenModel}</a>
                        <div>Phiên bản: {item.TenPhienBan}</div>
                        <div>
                          Màu ngoại thất: {item.TenMauNgoaiThat} - Nội thất:{" "}
                          {item.TenMauNoiThat}{" "}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="inp-soluong_cart">{formatPrice(item.Gia)}</td>

                  <td>
                    <InputNumber
                      size="large"
                      min={1}
                      max={100000}
                      defaultValue={item.SoLuong}
                      onChange={(value) =>
                        onChangeQuantity(item.MaMauNoiThat, value)
                      }
                    />
                  </td>
                  <td className="inp-soluong_cart">
                    {formatPrice(item.SoLuong * item.Gia)}
                  </td>
                  <td className="inp-soluong_cart">
                    <Popconfirm
                      title="Delete"
                      description="Bạn có chắc muốn xoá sản phẩm này?"
                      onConfirm={() => {
                        handleDeleteChange(item.MaMauNoiThat);
                      }}
                      icon={
                        <QuestionCircleOutlined
                          style={{
                            color: "red",
                          }}
                        />
                      }
                    >
                      <button type="button" className="btn-xoa">
                        Xoá
                      </button>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total-amount">
            <div className="total-thongtin">
              <div className="giatien">
                <div>Tổng thanh toán ({totalQuantity} sản phẩm):</div>
                <div className="total-giatien">{formatPrice(totalPrice)}</div>
              </div>
              <div className="vat">Đã bao gồm VAT [nếu có]</div>
            </div>

            <button
              className="btn-thanhtoan"
              onClick={() => handleCheckoutChange()}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart;
