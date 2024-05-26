import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "../style/Checkout.css";
function CheckOut() {
  return (
    <>
      <Header></Header>
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
                <div className="control-title">Thông tin khách hàng</div>
                <div className="left-inps">
                  {/* <!-- input họ và tên  --> */}
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
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- input giới tính và số điện thoại --> */}
                  <div className="left-inp row">
                    <div className="inps-item col-6">
                      <div className="inps_title">Giới tính</div>
                      <div className="inps_inp">
                        <select className="inp" name="inp_sex" id="inp_sex">
                          <option selected>Vùi lòng chọn giới tính...</option>
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
                          placeholder="Vui lòng nhập số điện thoại..."
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- input email --> */}
                  <div className="left-inp row">
                    <div className="inps-item col-12">
                      <div className="inps_title">Địa chỉ Email</div>
                      <div className="inps_inp">
                        <input
                          className="inp"
                          type="text"
                          name="inp_email"
                          id="inp_email"
                          placeholder="Vui lòng nhập địa chỉ Email..."
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- input địa chỉ --> */}
                  <div className="left-inp row">
                    <div className="inps-item col-12">
                      <div className="inps_title">Địa chỉ</div>
                      <div className="inps_inp">
                        <input
                          className="inp"
                          type="text"
                          name="inp_address"
                          id="inp_address"
                          placeholder="Vui lòng nhập địa chỉ..."
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- input địa chỉ --> */}
                  <div className="left-inp row">
                    <div className="inps-item col-6">
                      <div className="inps_title">Ngày sinh</div>
                      <div className="inps_inp">
                        <input
                          className="inp"
                          type="date"
                          name="inp_dateOfBirth"
                          id="inp_dateOfBirth"
                          placeholder="Vui lòng nhập ngày sinh..."
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
                          placeholder="Vui lòng nhập chứng minh nhân dân..."
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
                    checked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Nhận tại địa chỉ khách hàng
                  </label>
                </div>
                {/* <!-- input email --> */}
                <div className="left-inp row">
                  <div className="inps-item col-12">
                    <div className="inps_title">Chọn địa chỉ cửa hàng</div>
                    <div className="inps_inp">
                      <select
                        className="inp"
                        name="inp_storeAddress"
                        id="inp_storeAddress"
                      >
                        <option selected>
                          Vùi lòng chọn địa chỉ cửa hàng...
                        </option>
                        <option value="Vinfast - Tầng L1, TTTM Vincom Center Phạm Ngọc Thạch, Số 2 Phạm Ngọc Thạch, Phường Trung Tự, Quận Đống Đa, Hà Nội">
                          Vinfast - Tầng L1, TTTM Vincom Center Phạm Ngọc Thạch,
                          Số 2 Phạm Ngọc Thạch, Phường Trung Tự, Quận Đống Đa,
                          Hà Nội
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

                <hr />
                <button type="button" className="btn-order blue-bc">
                  Đặt hàng
                </button>
              </div>
              <div className="checkout-control_right col-4">
                <div className="control-right_title">
                  <div className="control-title">Giỏ hàng</div>
                  <div className="totle-cart">4</div>
                </div>

                <div className="right-carts">
                  <div className="right-cart">
                    <div className="cart-information">
                      <div className="cart-title">Vinfast VF8 - Plus</div>
                      <div className="cart-detail">
                        <p>Ngoại thất: Crimson Red</p>
                        <p>Nội thất: Granite Black</p>
                      </div>
                      <div className="cart-priceTotal">500 triệu x 3</div>
                    </div>
                    <div className="cart-amountMoney">1 tỷ 500 triệu</div>
                  </div>
                  <div className="cart-totalPayment">
                    <div className="totalPayment-title">Tổng thành tiền</div>
                    <div className="totalPayment-total">2 tỷ 500 triệu</div>
                  </div>

                  <div className="cart-btn_discountCode">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mã khuyến mã"
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
      <Footer></Footer>
    </>
  );
}

export default CheckOut;
