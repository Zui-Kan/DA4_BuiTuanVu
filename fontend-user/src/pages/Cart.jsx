import "../style/Cart.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Cart = function () {
  return (
    <>
      <Header></Header>
      <main>
        <div className="shopping-cart">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <label className="custom-checkbox">
                    <input name="dummy" type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </th>
                <th scope="col">Ảnh</th>
                <th scope="col">Thông tin</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Số tiền</th>
                <th scope="col">
                  <button type="button" className="btn-xoatat">
                    Xoá tất
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Card 1 */}
              <tr>
                <td>
                  <label className="custom-checkbox">
                    <input name="dummy" type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div className="khung-img-cart">
                    <img className="img-cart" src="/IMAGE/oto/2.jpg" alt="" />
                  </div>
                </td>

                <td>
                  <div className="cart-thongtin">
                    <a className="thongtin-title">
                      Sản phẩm 1 Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản
                      phẩm 1
                    </a>
                    <div>Màu sắc: Đỏ</div>
                    <div>Phiên bản: Đặc biệt</div>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>

                <td>
                  <div className="inp-soluong">
                    <button className="btn-secondary decrease-btn">-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      value="1"
                      min="1"
                    />
                    <button className="btn-secondary increase-btn">+</button>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>
                <td>
                  <button type="button" className="btn-xoa">
                    Xoá
                  </button>
                </td>
              </tr>
              {/* Card 1 */}
              <tr>
                <td>
                  <label className="custom-checkbox">
                    <input name="dummy" type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div className="khung-img-cart">
                    <img className="img-cart" src="/IMAGE/oto/2.jpg" alt="" />
                  </div>
                </td>

                <td>
                  <div className="cart-thongtin">
                    <a className="thongtin-title">
                      Sản phẩm 1 Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản
                      phẩm 1
                    </a>
                    <div>Màu sắc: Đỏ</div>
                    <div>Phiên bản: Đặc biệt</div>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>

                <td>
                  <div className="inp-soluong">
                    <button className="btn-secondary decrease-btn">-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      value="1"
                      min="1"
                    />
                    <button className="btn-secondary increase-btn">+</button>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>
                <td>
                  <button type="button" className="btn-xoa">
                    Xoá
                  </button>
                </td>
              </tr>
              {/* Card 1 */}
              <tr>
                <td>
                  <label className="custom-checkbox">
                    <input name="dummy" type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div className="khung-img-cart">
                    <img className="img-cart" src="/IMAGE/oto/2.jpg" alt="" />
                  </div>
                </td>

                <td>
                  <div className="cart-thongtin">
                    <a className="thongtin-title">
                      Sản phẩm 1 Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản
                      phẩm 1
                    </a>
                    <div>Màu sắc: Đỏ</div>
                    <div>Phiên bản: Đặc biệt</div>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>

                <td>
                  <div className="inp-soluong">
                    <button className="btn-secondary decrease-btn">-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      value="1"
                      min="1"
                    />
                    <button className="btn-secondary increase-btn">+</button>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>
                <td>
                  <button type="button" className="btn-xoa">
                    Xoá
                  </button>
                </td>
              </tr>
              {/* Card 1 */}
              <tr>
                <td>
                  <label className="custom-checkbox">
                    <input name="dummy" type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div className="khung-img-cart">
                    <img className="img-cart" src="/IMAGE/oto/2.jpg" alt="" />
                  </div>
                </td>

                <td>
                  <div className="cart-thongtin">
                    <a className="thongtin-title">
                      Sản phẩm 1 Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản
                      phẩm 1
                    </a>
                    <div>Màu sắc: Đỏ</div>
                    <div>Phiên bản: Đặc biệt</div>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>

                <td>
                  <div className="inp-soluong">
                    <button className="btn-secondary decrease-btn">-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      value="1"
                      min="1"
                    />
                    <button className="btn-secondary increase-btn">+</button>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>
                <td>
                  <button type="button" className="btn-xoa">
                    Xoá
                  </button>
                </td>
              </tr>
              {/* Card 1 */}
              <tr>
                <td>
                  <label className="custom-checkbox">
                    <input name="dummy" type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div className="khung-img-cart">
                    <img className="img-cart" src="/IMAGE/oto/2.jpg" alt="" />
                  </div>
                </td>

                <td>
                  <div className="cart-thongtin">
                    <a className="thongtin-title">
                      Sản phẩm 1 Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản
                      phẩm 1
                    </a>
                    <div>Màu sắc: Đỏ</div>
                    <div>Phiên bản: Đặc biệt</div>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>

                <td>
                  <div className="inp-soluong">
                    <button className="btn-secondary decrease-btn">-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      value="1"
                      min="1"
                    />
                    <button className="btn-secondary increase-btn">+</button>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>
                <td>
                  <button type="button" className="btn-xoa">
                    Xoá
                  </button>
                </td>
              </tr>
              {/* Card 1 */}
              <tr>
                <td>
                  <label className="custom-checkbox">
                    <input name="dummy" type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div className="khung-img-cart">
                    <img className="img-cart" src="/IMAGE/oto/2.jpg" alt="" />
                  </div>
                </td>

                <td>
                  <div className="cart-thongtin">
                    <a className="thongtin-title">
                      Sản phẩm 1 Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản
                      phẩm 1
                    </a>
                    <div>Màu sắc: Đỏ</div>
                    <div>Phiên bản: Đặc biệt</div>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>

                <td>
                  <div className="inp-soluong">
                    <button className="btn-secondary decrease-btn">-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      value="1"
                      min="1"
                    />
                    <button className="btn-secondary increase-btn">+</button>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>
                <td>
                  <button type="button" className="btn-xoa">
                    Xoá
                  </button>
                </td>
              </tr>
              {/* Card 1 */}
              <tr>
                <td>
                  <label className="custom-checkbox">
                    <input name="dummy" type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div className="khung-img-cart">
                    <img className="img-cart" src="/IMAGE/oto/2.jpg" alt="" />
                  </div>
                </td>

                <td>
                  <div className="cart-thongtin">
                    <a className="thongtin-title">
                      Sản phẩm 1 Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản
                      phẩm 1
                    </a>
                    <div>Màu sắc: Đỏ</div>
                    <div>Phiên bản: Đặc biệt</div>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>

                <td>
                  <div className="inp-soluong">
                    <button className="btn-secondary decrease-btn">-</button>
                    <input
                      type="number"
                      className="quantity-input"
                      value="1"
                      min="1"
                    />
                    <button className="btn-secondary increase-btn">+</button>
                  </div>
                </td>
                <td>100.000.000 VNĐ</td>
                <td>
                  <button type="button" className="btn-xoa">
                    Xoá
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="total-amount">
            <div className="total-thongtin">
              <div className="giatien">
                <div>Tổng thanh toán (2 sản phẩm):</div>
                <div className="total-giatien">200.000 VNĐ</div>
              </div>
              <div className="vat">Đã bao gồm VAT [nếu có]</div>
            </div>

            <button className="btn-thanhtoan">Thanh toán</button>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </>
  );
};

export default Cart;
