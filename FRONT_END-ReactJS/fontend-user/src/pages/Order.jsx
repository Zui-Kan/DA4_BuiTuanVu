import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "../style/Checkout.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartCheckout, cartState } from "../constant/recoil";
import { formatPriceStringVND, formatPriceVND } from "../shares/format"; // Assuming formatPriceVND is a function that formats prices to VND
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { apiDatXe, getKhachHang } from "../services/checkout.service";
import { lc_profile } from "../services/auth.service";
import { message } from "antd";
import {
  getCartFromLocalStorage,
  getTotalQuantity,
  removeFromCart,
} from "../services/cart.service";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const profile = lc_profile();
  const cart = getCartFromLocalStorage();
  const itemsCheckout = useRecoilValue(cartCheckout);
  const [card, setCart] = useRecoilState(cartState);

  const validItemsCheckout = Array.isArray(itemsCheckout) ? itemsCheckout : [];
  const [open, setOpen] = useState(false);
  const [dataKhachHang, setDataKhachHang] = useState(null);
  const [selectedKhachHang, setSelectedKhachHang] = useState({});
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  // Khởi tạo message API
  const messageApi = message;

  const navigate = useNavigate();
  // Calculate total price and quantity dynamicallyd
  const calculateTotal = () => {
    document.title = "Đặt hàng";

    let totalQuantity = 0;
    let totalPrice = 0;
    validItemsCheckout.forEach((item) => {
      totalQuantity += item.SoLuong;
      totalPrice += item.SoLuong * item.Gia;
    });
    return { totalQuantity, totalPrice };
  };

  const loadData = async (profile) => {
    const res = await getKhachHang(profile.id);
    if (res) {
      setDataKhachHang(res);
    }
  };
  const token = JSON.parse(localStorage.getItem("token") || null);

  useEffect(() => {
    if (itemsCheckout.length < 1 || !token) {
      navigate(-1);
    }
    loadData(profile);
  });

  const { totalQuantity, totalPrice } = calculateTotal();

  const refreshInput = () => {
    setSelectedKhachHang({});
    setIsInputDisabled(false);
  };

  const handleSelectKhachHang = (item) => {
    setSelectedKhachHang(item);
    setIsInputDisabled(true);
    setOpen(false);
  };

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
    setSelectedAddress(""); // Clear the address when store is selected
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
    setSelectedStore("");
  };

  const handleOrderSubmit = async () => {
    setIsLoading(true);

    if (selectedStore === "on" && !selectedAddress) {
      messageApi.error("Vui lòng chọn địa chỉ nhận xe trước khi đặt hàng");
      setIsLoading(false);
      return;
    }
    if (
      !selectedKhachHang.HoVaTen ||
      !selectedKhachHang.Email ||
      !selectedKhachHang.SDT ||
      !selectedKhachHang.DiaChi ||
      !selectedKhachHang.GioiTinh ||
      !selectedKhachHang.CMND ||
      !totalPrice
    ) {
      messageApi.error(
        "Vui lòng cung cấp đầy đủ thông tin và giỏ hàng trước khi đặt hàng"
      );
      setIsLoading(false);

      return;
    }

    // Tạo đối tượng data dựa trên điều kiện
    let data = {
      TongTien: totalPrice,
      HinhThucNhan:
        selectedStore !== ""
          ? "Nhận tại cửa hàng"
          : "Nhận tại địa chỉ khách hàng",
      DiaChiNhanXe:
        selectedStore !== "" ? selectedStore : selectedKhachHang.DiaChi,
      ChiTietDatHang: validItemsCheckout?.map((item) => ({
        MaModel: item.MaModel,
        MaPhienBan: item.MaPhienBan,
        MaMauNgoaiThat: item.MaMauNgoaiThat,
        MaMauNoiThat: item.MaMauNoiThat,
        SoLuong: item.SoLuong,
        GiaBan: item.Gia,
      })),
    };

    // Nếu MaKhachHang không tồn tại, thêm các trường khác
    if (!selectedKhachHang.MaKhachHang) {
      data = {
        ...data,
        HoVaTen: selectedKhachHang.HoVaTen,
        MaTaiKhoan: profile.id,
        Email: selectedKhachHang.Email,
        CMND: selectedKhachHang.CMND,
        SDT: selectedKhachHang.SDT,
        DiaChi: selectedKhachHang.DiaChi,
        GioiTinh: selectedKhachHang.GioiTinh,
      };
    } else {
      data = {
        ...data,
        MaKhachHang: selectedKhachHang.MaKhachHang,
      };
    }

    try {
      const response = await apiDatXe(data);
      if (response.success) {
        messageApi.success("Đặt hàng thành công.");
        validItemsCheckout.forEach((item) => {
          removeFromCart(item.MaMauNoiThat);
        });
        setCart(getTotalQuantity() || 0);
        setIsLoading(false);
        navigate(`/ordersuccess/${response.MaDatHang}`);
      } else {
        setIsLoading(false);

        messageApi.error("Đặt hàng thất bại:", response.message);
      }
    } catch (error) {
      setIsLoading(false);

      console.error("Lỗi rồi:", error);
      // Bạn có thể hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <>
      <main>
        <div className="checkout">
          <div className="checkout-header">
            <div className="checkout-header_icon">
              <img src="/IMAGE/icons8_credit_card_interest.svg" alt="#" />
            </div>
            <div className="checkout-header_title">Đặt hàng</div>
            <div className="checkout-header_note">
              Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước
              khi Đặt hàng
            </div>
          </div>
          <div className="checkout-control">
            <div className="row">
              <div className="checkout-control_left col-8">
                <div className="control-title_InformationAvailable">
                  <div className="control-title">Thông tin khách hàng</div>
                  <div className="control-modalAndRefresh">
                    <Button
                      className="btn-refresh_modal"
                      onClick={() => refreshInput()}
                    >
                      <img src="../IMAGE/icons8_refresh.svg" alt="" />
                    </Button>
                    <Button onClick={() => setOpen(true)}>
                      Chọn thông tin cũ
                    </Button>
                    <Modal
                      title="Thông tin khách hàng"
                      centered
                      open={open}
                      onOk={() => setOpen(false)}
                      onCancel={() => setOpen(false)}
                      width={700}
                    >
                      {dataKhachHang?.data && dataKhachHang.data.length > 0 ? (
                        dataKhachHang.data.map((item) => (
                          <div
                            className="form-check form-check_modal"
                            key={item.MaKhachHang}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              onClick={() => handleSelectKhachHang(item)}
                              id={`RadioModal${item.MaKhachHang}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`RadioModal${item.MaKhachHang}`}
                            >
                              <div className="modal-checkout_chonthongtin">
                                <div className="checkout-chonthongtin_cot1">
                                  <div className="chonthongtin-cot1_name">
                                    {item.HoVaTen}
                                  </div>
                                  <div className="chonthongtin-cot1_sdt">
                                    {item.SDT}
                                  </div>
                                </div>
                                <div className="checkout-chonthongtin_cot2">
                                  {item.Email}
                                </div>
                                <div className="checkout-chonthongtin_cot3">
                                  Địa chỉ: {item.DiaChi}
                                </div>
                              </div>
                            </label>
                          </div>
                        ))
                      ) : (
                        <h4>Chưa có thông tin khách hàng nào tồn tại</h4>
                      )}
                    </Modal>
                  </div>
                </div>
                <div className="left-inps">
                  <div className="left-inp row">
                    <div className="inps-item col-12">
                      <div className="inps_title">Họ và tên</div>
                      <div className="inps_inp">
                        <input
                          className="inp"
                          type="text"
                          name="inp_fullName"
                          id="inp_fullName"
                          placeholder="Vui lòng nhập họ và tên..."
                          value={selectedKhachHang.HoVaTen || ""}
                          disabled={isInputDisabled}
                          onChange={(e) =>
                            setSelectedKhachHang({
                              ...selectedKhachHang,
                              HoVaTen: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="left-inp row">
                    <div className="inps-item col-6">
                      <div className="inps_title">Giới tính</div>
                      <div className="inps_inp">
                        <select
                          className="inp"
                          name="inp_sex"
                          id="inp_sex"
                          disabled={isInputDisabled}
                          value={selectedKhachHang.GioiTinh || ""}
                          onChange={(e) =>
                            setSelectedKhachHang({
                              ...selectedKhachHang,
                              GioiTinh: e.target.value,
                            })
                          }
                        >
                          <option defaultValue>
                            Vùi lòng chọn giới tính...
                          </option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                          <option value="Khác">Khác</option>
                        </select>
                      </div>
                    </div>
                    <div className="inps-item col-6">
                      <div className="inps_title">Số điện thoại</div>
                      <div className="inps_inp">
                        <input
                          className="inp"
                          type="number"
                          name="inp_phoneNumber"
                          id="inp_phoneNumber"
                          disabled={isInputDisabled}
                          placeholder="Vui lòng nhập số điện thoại..."
                          value={selectedKhachHang.SDT || ""}
                          onChange={(e) =>
                            setSelectedKhachHang({
                              ...selectedKhachHang,
                              SDT: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="left-inp row">
                    <div className="inps-item col-12">
                      <div className="inps_title">Địa chỉ</div>
                      <div className="inps_inp">
                        <input
                          className="inp"
                          type="text"
                          name="inp_address"
                          id="inp_address"
                          disabled={isInputDisabled}
                          placeholder="Vui lòng nhập địa chỉ..."
                          value={selectedKhachHang.DiaChi || ""}
                          onChange={(e) =>
                            setSelectedKhachHang({
                              ...selectedKhachHang,
                              DiaChi: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="left-inp row">
                    <div className="inps-item col-6">
                      <div className="inps_title">Địa chỉ Email</div>
                      <div className="inps_inp">
                        <input
                          className="inp"
                          type="text"
                          name="inp_email"
                          id="inp_email"
                          disabled={isInputDisabled}
                          placeholder="Vui lòng nhập địa chỉ Email..."
                          value={selectedKhachHang.Email || ""}
                          onChange={(e) =>
                            setSelectedKhachHang({
                              ...selectedKhachHang,
                              Email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="inps-item col-6">
                      <div className="inps_title">CMND</div>
                      <div className="inps_inp">
                        <input
                          className="inp"
                          type="number"
                          name="inp_CMND"
                          id="inp_CMND"
                          disabled={isInputDisabled}
                          placeholder="Vui lòng nhập chứng minh nhân dân..."
                          value={selectedKhachHang.CMND || ""}
                          onChange={(e) =>
                            setSelectedKhachHang({
                              ...selectedKhachHang,
                              CMND: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="control-title">Hình thức nhận xe</div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={selectedStore !== ""}
                    onChange={handleStoreChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Nhận tại cửa hàng
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked={selectedAddress !== ""}
                    onChange={handleAddressChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Nhận tại địa chỉ khách hàng
                  </label>
                </div>
                {selectedStore && (
                  <div className="left-inp row">
                    <div className="inps-item col-12">
                      <div className="inps_title">Chọn địa chỉ cửa hàng</div>
                      <div className="inps_inp">
                        <select
                          className="inp"
                          name="inp_storeAddress"
                          id="inp_storeAddress"
                          value={selectedStore}
                          onChange={handleStoreChange}
                        >
                          <option value>
                            Vùi lòng chọn địa chỉ cửa hàng...
                          </option>
                          <option value="Vinfast - Tầng L1, TTTM Vincom Center Phạm Ngọc Thạch, Số 2 Phạm Ngọc Thạch, Phường Trung Tự, Quận Đống Đa, Hà Nội">
                            Vinfast - Tầng L1, TTTM Vincom Center Phạm Ngọc
                            Thạch, Số 2 Phạm Ngọc Thạch, Phường Trung Tự, Quận
                            Đống Đa, Hà Nội
                          </option>
                          <option value="Vinfast - 118 khu Miếu Thờ, Đường QL3, xã Tiên Dược, huyện Sóc Sơn, Hà Nội">
                            Vinfast - 118 khu Miếu Thờ, Đường QL3, xã Tiên Dược,
                            huyện Sóc Sơn, Hà Nội
                          </option>
                          <option value="Vinfast - 155-157 Tô Hiệu, Hiến Nam, Hưng Yên">
                            Vinfast - 155-157 Tô Hiệu, Hiến Nam, Hưng Yên
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <hr />
                <button
                  type="button"
                  disabled={isLoading}
                  className="btn-order blue-bc"
                  onClick={handleOrderSubmit}
                >
                  {isLoading ? "Đang xử lý..." : "Đặt hàng"}
                </button>
              </div>
              <div className="checkout-control_right col-4">
                <div className="control-right_title">
                  <div className="control-title">Giỏ hàng</div>
                  <div className="totle-cart">{totalQuantity}</div>
                </div>

                <div className="right-carts">
                  {validItemsCheckout.map((item, index) => (
                    <div className="right-cart" key={index}>
                      <div className="cart-information">
                        <div className="cart-title">
                          {item.TenModel} - {item.TenPhienBan}
                        </div>
                        <div className="cart-detail">
                          <p>Ngoại thất: {item.TenMauNgoaiThat}</p>
                          <p>Nội thất: {item.TenMauNoiThat}</p>
                        </div>
                        <div className="cart-priceTotal">
                          {formatPriceStringVND(item.Gia)} x {item.SoLuong}
                        </div>
                      </div>
                      <div className="cart-amountMoney">
                        {formatPriceVND(item.Gia * item.SoLuong)}
                      </div>
                    </div>
                  ))}
                  <div className="cart-totalPayment">
                    <div className="totalPayment-title">Tổng thành tiền</div>
                    <div className="totalPayment-total">
                      {formatPriceVND(totalPrice)}
                    </div>
                  </div>

                  <div className="cart-btn_discountCode">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mã khuyến mãi"
                        aria-describedby="button-addon2"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CheckOut;
