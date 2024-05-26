/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/detail.css";
import CardCar from "../Components/CardCard";
import Header from "../Components/Header";

function Detail(props) {
  const quangcao = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 6000,
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <>
      {props.children}

      <Header></Header>
      <div className="product-details_khung">
        <section className="product-details spad">
          <div className="row">
            <div className="col-lg-7 col-md-6">
              <div className="row">
                <div className="Slider-Syncing">
                  <div className="slider-for">
                    <Slider
                      asNavFor={nav2}
                      ref={(slider) => (sliderRef1 = slider)}
                    >
                      <div className="slider-anhto">
                        <img
                          src="../IMAGE/oto/1.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="slider-anhto">
                        <img
                          src="../IMAGE/oto/2.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="slider-anhto">
                        <img
                          src="../IMAGE/oto/3.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="slider-anhto">
                        <img
                          src="../IMAGE/oto/4.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="slider-anhto">
                        <img
                          src="../IMAGE/oto/5.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </Slider>
                  </div>

                  <div className="slider-nav">
                    <Slider
                      asNavFor={nav1}
                      ref={(slider) => (sliderRef2 = slider)}
                      slidesToShow={3}
                      swipeToSlide={true}
                      focusOnSelect={true}
                    >
                      <div className="slider-anhnho">
                        <img
                          src="../IMAGE/oto/1.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="slider-anhnho">
                        <img
                          src="../IMAGE/oto/2.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="slider-anhnho">
                        <img
                          src="../IMAGE/oto/3.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="slider-anhnho">
                        <img
                          src="../IMAGE/oto/4.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="slider-anhnho">
                        <img
                          src="../IMAGE/oto/5.jpg"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </Slider>
                  </div>
                </div>
                <div className="specifications">
                  <div className="spec-title blueDark-c">THÔNG SỐ KỸ THUẬT</div>
                  <div className="spec-table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Thông số kỹ thuật</th>
                          <th scope="col">Cơ bản</th>
                          <th scope="col">Cao Cấp</th>
                          <th scope="col">Cao cấp</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Động Cơ</td>
                          <td>Bi-Turbo Diesel 2.0L i4 TDCi</td>
                          <td>Single Turbo Diesel 2.0L i4 TDCi</td>
                          <td>Single Turbo Diesel 2.0L i4 TDCi</td>
                        </tr>
                        <tr>
                          <td>Dung Tích Xi Lanh (cc)</td>
                          <td>1996</td>
                          <td>1996</td>
                          <td>1996</td>
                        </tr>

                        <tr>
                          <th scope="row">Kích Thước Và Trọng Lượng</th>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Dài x Rộng x Cao (mm)</td>
                          <td>4914 x 1923 x 1842</td>
                          <td>4914 x 1923 x 1842</td>
                          <td>4914 x 1923 x 1842</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="detail_product">
                <div className="pro-title blueDark-c">
                  Mercedes C300 AMG Facelift Model 2020 Màu đen Siu Siu Đẹp
                </div>
                <div className="pro-price">1 tỷ 200 triệu</div>
                <div className="pro-date blueDark-c">
                  <img
                    src="https://www.carmudi.vn../IMAGEs/xe-oto/svg/year.svg"
                    alt=""
                  />
                  Năm sản xuất: 2023
                </div>
                <div className="pro-brand blueDark-c">
                  <img
                    src="https://www.carmudi.vn../IMAGEs/xe-oto/svg/brand.svg"
                    alt=""
                  />
                  Hãng xe: Vinfast
                </div>

                <div className="pro-versions">
                  <div className="version-title blueDark-c">Phiên bản</div>
                  <div className="row">
                    <input
                      type="radio"
                      className="btn-check"
                      name="phienban"
                      id="phienban1"
                      value="Plus"
                      autoComplete="off"
                    />
                    <label className="pro-version" htmlFor="phienban1">
                      {" "}
                      Plus{" "}
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="phienban"
                      id="phienban2"
                      value="Eco"
                      autoComplete="off"
                    />
                    <label className="pro-version" htmlFor="phienban2">
                      {" "}
                      Eco{" "}
                    </label>
                  </div>
                </div>
                <div className="pro-colors ngoaithat">
                  <div className="color-title blueDark-c">
                    Ngoại thất <span id="selected_ngoai_color" />
                  </div>
                  <div className="row">
                    <input
                      type="radio"
                      className="btn-check"
                      name="ngoai_color"
                      id="ngoai_option7"
                      value="Màu vàng"
                      autoComplete="off"
                    />
                    <label className="pro-color" htmlFor="ngoai_option7">
                      <img src="../IMAGE/color/NgoaiThat/CE11.jpg" alt="#" />
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="ngoai_color"
                      id="ngoai_option8"
                      value="Màu cam"
                      autoComplete="off"
                    />
                    <label className="pro-color" htmlFor="ngoai_option8">
                      <img src="../IMAGE/color/NgoaiThat/CE14.jpg" alt="#" />
                    </label>
                  </div>
                </div>

                <div className="pro-colors noithat">
                  <div className="color-title blueDark-c">
                    Nội thất <span id="selected_noi_color"></span>
                  </div>
                  <div className="row">
                    <input
                      type="radio"
                      className="btn-check"
                      name="noi_color"
                      id="noithat1"
                      value="Màu vàng"
                      autoComplete="off"
                    />
                    <label className="pro-color" htmlFor="noithat1">
                      <img src="../IMAGE/color/NoiThat/CI12.jpg" alt="#" />
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="noi_color"
                      id="noithat2"
                      value="Màu vàng"
                      autoComplete="off"
                    />
                    <label className="pro-color" htmlFor="noithat2">
                      <img src="../IMAGE/color/NoiThat/CI12.jpg" alt="#" />
                    </label>
                  </div>
                </div>

                <hr />
                <div className="pro-control">
                  <div className="row">
                    <div className="col-4 pro-btn">
                      <button className="pro-btn_contact blueDark-c">
                        <img src="../IMAGE/icons8_phone_1.svg" alt="" />
                        Liên hệ lái thử
                      </button>
                    </div>
                    <div className="col-7 pro-btn pro-btn_right">
                      <button className="pro-btn_cart blueDark-c">
                        <img
                          src="../IMAGE/icons8_add_shopping_cart_1.svg"
                          alt=""
                        />
                        Thêm Vào Giỏ Hàng
                      </button>

                      <button className="pro-btn_buy">Mua Ngay</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-product-abs">
                <Slider {...quangcao}>
                  <div className="khung-abs">
                    <a href="#">
                      <img src="../IMAGE/oto/3.jpg" alt="Lỗi" />
                    </a>
                  </div>

                  <div className="khung-abs">
                    <a href="#">
                      <img src="../IMAGE/oto/1.jpg" alt="Lỗi" />
                    </a>
                  </div>

                  <div className="khung-abs">
                    <a href="#">
                      <img src="../IMAGE/oto/2.jpg" alt="Lỗi" />
                    </a>
                  </div>

                  <div className="khung-abs">
                    <a href="#">
                      <img src="../IMAGE/oto/4.jpg" alt="Lỗi" />
                    </a>
                  </div>

                  <div className="khung-abs">
                    <a href="#">
                      <img src="../IMAGE/oto/5.jpg" alt="Lỗi" />
                    </a>
                  </div>
                </Slider>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <div className="mota-tieude-noidung">
                  <hr />
                  <div className="tieude-noidung blueDark-c">MÔ TẢ</div>
                  <hr />
                </div>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h4 className="center-t">
                        Với thiết kế hiện đại, độc đáo, được trang bị các công
                        nghệ và tính năng thông minh vượt trội, khả năng vận
                        hành mạnh mẽ, an toàn, VF 5 Plus hội tụ đầy đủ các yếu
                        tố người dùng trẻ tìm kiếm cho một chiếc xe điện đô thị
                        lý tưởng.
                      </h4>
                      <img
                        src="https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwaa1e651e../IMAGEs/PDP/VF5/img-vf5-banner-01.jpg"
                        alt=""
                      />
                      <p>Lưu ý:</p>
                      <p className="justify-t">
                        Một số tính năng sẽ chưa có sẵn hoặc chưa được kích hoạt
                        tại thời điểm giao xe cho Khách hàng. Những tính năng
                        này sẽ được cập nhật sau thông qua phương thức cập nhật
                        phần mềm từ xa qua kết nối không dây hoặc cập nhật tại
                        xưởng dịch vụ VinFast.
                      </p>
                      <p className="justify-t">
                        Tại thị trường Việt Nam, theo chính sách bán hàng hiện
                        tại, tất cả các tính năng thông minh trong các gói Dịch
                        vụ thông minh VF Connect được sử dụng miễn phí khi có
                        kết nối mạng. Để sử dụng tính năng thông qua mạng di
                        động, khách hàng cần tự mua dữ liệu di động (Data) từ
                        nhà mạng. Hình ảnh mang tính minh họa, sử dụng hình ảnh
                        của sản phẩm trong giai đoạn tiền thương mại. Các thông
                        tin sản phẩm có thể thay đổi mà không cần báo trước.
                      </p>
                      <p className="justify-t">
                        Hiệu suất hoạt động của xe và thông tin về quãng đường
                        di chuyển một lần sạc đầy có thể thay đổi, được hiển thị
                        khác nhau, tùy thuộc vào các yếu tố bên ngoài như tốc
                        độ, phong cách lái, số lượng hành khách, tải trọng, điều
                        kiện lốp xe, thời tiết và điều kiện đường sá. Để đảm bảo
                        an toàn, tối ưu tuổi thọ và hiệu suất hoạt động, VinFast
                        khuyến cáo người sử dụng các dòng xe điện VinFast chỉ
                        nên sử dụng pin chính hãng và các giải pháp sạc do
                        VinFast cung cấp.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <hr />
                <div className="col news-title blueDark-c">Bình luận</div>
              </div>
              <div className="user-binhluan">
                <div className="form-group">
                  <textarea
                    id="edt_binhluanbaiviet"
                    className="nhapnoidungvabinhluan"
                    //   oninput="autoExpand(this)"
                    placeholder="Điền nội dung bình luận..."
                    style={{ height: "50px" }}
                  ></textarea>
                </div>
                <button type="submit" id="btn-binhluanbaiviet">
                  Bình luận
                </button>
              </div>

              <div className="binhluan-cards">
                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>

                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>
                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>
                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>
                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>
                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>
                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>
                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>
                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>
                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>
                <div className="binhluan-card">
                  <div className="card-control_user">
                    <div className="comment-card_user">
                      <a href="#" className="user-img">
                        <img src="../IMAGE/oto/2.jpg" alt="hi" />
                      </a>
                      <a href="#" className="user-name">
                        Nguyễn DUy Khang
                      </a>
                      <div className="user-datetime">
                        28/10/2024 lúc 18:20:10
                      </div>
                    </div>

                    <div className="card-control">
                      <button type="submit">- - -</button>
                      <div className="delete-comment">Xoá</div>
                    </div>
                  </div>

                  <div className="card-comment">Đây là nội dung bình luận</div>
                </div>
              </div>
            </div>

            {/* <!-- Các sản phẩm tương tự --> */}
            <div className="col-lg-12">
              <hr />
              <div className="row">
                <div className="col news-title blueDark-c">
                  CÁC SẢN PHẨM TƯƠNG TỰ
                </div>
              </div>
              <div className="row">
                {/* <!-- start card car 1 --> */}
                <CardCar className={"col-3"}> </CardCar>
                <CardCar className={"col-3"}> </CardCar>
                <CardCar className={"col-3"}> </CardCar>
                <CardCar className={"col-3"}> </CardCar>
              </div>
            </div>
            {/* <!-- END Các sản phẩm tương tự --> */}
          </div>
        </section>
      </div>
    </>
  );
}

export default Detail;
