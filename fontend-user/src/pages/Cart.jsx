import "../style/Cart.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useEffect, useState, useCallback } from "react";
import {
  getCartDetails,
  getTotalQuantity,
  removeFromCart,
  updateQuantityInCart,
} from "../services/cart.service";
import { formatPrice } from "../shares/formatPrice";
import { uploads } from "../constant/api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import { Loading } from "../Components/Loading/Loading";
import { useRecoilState } from "recoil";
import { cartCheckout, cartState } from "../constant/recoil";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce"; // Thêm lodash.debounce để sử dụng debounce

const Cart = function () {
  const [data, setData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [checkout, setcheckout] = useRecoilState(cartCheckout);
  const [card, setCart] = useRecoilState(cartState);
  const navigate = useNavigate();
  const messageAPI = message;
  const loadData = async () => {
    const details = await getCartDetails();
    setData(details);
    setSelectedItems(new Array(details.listCart.length).fill(false));
    setIsDataLoaded(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckboxChange = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const newSelectedItems = selectedItems.map(() => isChecked);
    setSelectedItems(newSelectedItems);
  };

  const handleDeleteChange = async (maMauNoiThat) => {
    await removeFromCart(maMauNoiThat);
    messageAPI.success("Sản phẩm đã được xóa khỏi giỏ hàng.");

    loadData();
  };

  const handleDeleteAllChange = async () => {
    const itemsToDelete = [];
    selectedItems.forEach((isSelected, index) => {
      if (isSelected) {
        itemsToDelete.push(data.listCart[index].MaMauNoiThat);
      }
    });

    for (const maMauNoiThat of itemsToDelete) {
      await removeFromCart(maMauNoiThat);
    }
    messageAPI.success("Sản phẩm đã được xóa khỏi giỏ hàng.");

    loadData();
  };

  const handleCheckoputChange = async () => {
    const itemsCheckout = data.listCart.filter(
      (item, index) => selectedItems[index]
    );
    setcheckout(itemsCheckout);

    if (itemsCheckout.length < 1) {
      messageAPI.error("Vui lòng chọn xe cần thanh toán!!!");
    } else {
      navigate("/checkout");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateQuantity = useCallback(
    debounce((index, newQuantity) => {
      const selectedNoiThat = data.listCart[index].MaMauNoiThat;
      updateQuantityInCart(selectedNoiThat, newQuantity);
      setData((prevData) => {
        const newData = { ...prevData };
        newData.listCart[index].SoLuong = newQuantity;
        return newData;
      });
    }),
    [data]
  );

  const handleQuantityChange = async (index, newQuantity) => {
    await updateQuantity(index, newQuantity);
    setCart(getTotalQuantity() || 0);
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
                    <div className="khung-img-cart inp-soluong_cart">
                      <img
                        className="img-cart"
                        src={`${uploads()}${item.HinhAnhXe}`}
                        alt=""
                      />
                    </div>
                  </td>

                  <td>
                    <div className="cart-thongtin">
                      <a className="thongtin-title">{item.TenModel}</a>
                      <div>Phiên bản: {item.TenPhienBan}</div>
                      <div>
                        Màu ngoại thất: {item.TenMauNgoaiThat} - Nội thất:{" "}
                        {item.TenMauNoiThat}{" "}
                      </div>
                    </div>
                  </td>
                  <td className="inp-soluong_cart">{formatPrice(item.Gia)}</td>

                  <td>
                    <div className="inp-soluong inp-soluong_cart">
                      <button
                        className="btn-secondary decrease-btn"
                        onClick={() =>
                          handleQuantityChange(
                            index,
                            item.SoLuong > 1 ? item.SoLuong - 1 : 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={item.SoLuong}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(index, parseInt(e.target.value))
                        }
                      />
                      <button
                        className="btn-secondary increase-btn"
                        onClick={() =>
                          handleQuantityChange(index, item.SoLuong + 1)
                        }
                      >
                        +
                      </button>
                    </div>
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
              onClick={() => handleCheckoputChange()}
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
