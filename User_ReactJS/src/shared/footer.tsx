const Footer = function () {
  return (
    <>
      <section className="registration-out">
        <div className="registration">
          <p>
            <b>
              ĐĂNG KÝ NHẬN EMAIL THÔNG BÁO KHUYẾN MẠI HOẶC ĐỂ ĐƯỢC TƯ VẤN MIỄN
              PHÍ
            </b>
          </p>
          <form className="register" action="#" method="POST">
            <input
              type="text"
              placeholder="Nhập email hoặc số điện thoại của bạn..."
              name="search_prod"
            />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </section>
      <section className="footer">
        <div className="footer-in">
          <div className="row">
            <div className="colf-3 colf-s-6">
              <ul>
                <li>
                  <b>THÔNG TIN CHUNG</b>
                </li>
                <hr />
                <li>
                  <a href="#">Giới thiệu về Nguyễn Chiến Computer</a>
                </li>
                <li>
                  <a href="#">Thông tin liên hệ</a>
                </li>
                <li>
                  <a href="#">Thông tin tuyển dụng</a>
                </li>
                <li>
                  <a href="TinTuc.html">Tin tức</a>
                </li>
              </ul>
            </div>
            <div className="colf-3 colf-s-6">
              <ul>
                <li>
                  <b>CHÍNH SÁCH MUA HÀNG</b>
                </li>
                <hr />
                <li>
                  <a href="ChinhSachBaoHanh.html">Chính sách bảo hành</a>
                </li>
                <li>
                  <a href="#">Chính sách đổi trả hàng, hoàn tiền</a>
                </li>
                <li>
                  <a href="#">Phương thức thanh toán</a>
                </li>
                <li>
                  <a href="#">Vận chuyển, lắp đặt</a>
                </li>
              </ul>
            </div>
            <div className="colf-3 colf-s-6">
              <ul>
                <li>
                  <b>HỖ TRỢ KHÁCH HÀNG</b>
                </li>
                <hr />
                <li>
                  <a href="#">Hướng dẫn mua hàng online</a>
                </li>
                <li>
                  <a href="#">Thông tin khuyến mại</a>
                </li>
                <li>
                  <a href="#">Gửi yêu cầu bảo hành</a>
                </li>
                <li>
                  <a href="#">Góp ý, khiếu nại</a>
                </li>
              </ul>
            </div>
            <div className="colf-3 colf-s-6">
              <ul>
                <li>
                  <b>CỘNG ĐỒNG CHIẾN NGUYỄN COMPUTER</b>
                </li>
                <hr />
                <li>
                  <a
                    href="https://www.facebook.com/nguyenchien.it"
                    target="_blank"
                  >
                    <i
                      className="fab fa-facebook-square"
                      style={{ color: "blue" }}
                    ></i>{" "}
                    Chiến Nguyễn Computer Fanpage
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/c/ChiếnNguyễn"
                    target="_blank"
                  >
                    <i className="fab fa-youtube" style={{ color: "red" }}></i>{" "}
                    Chiến Nguyễn Computer
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/messages/t/nguyenchien.it"
                    target="_blank"
                  >
                    <i
                      className="fab fa-facebook-messenger"
                      style={{ color: "white" }}
                    ></i>{" "}
                    Chat với tư vấn viên
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Footer;
