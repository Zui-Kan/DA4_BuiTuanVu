/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/detail.css";
import CardCar from "../Components/CardCar";
import Header from "../Components/Header";
import { Loading } from "../Components/Loading/Loading";
import { Comment } from "../Components/Comment/Comment";
import { useParams } from "react-router-dom";
import { getDetail } from "../services/detail.service";
import { formatPrice } from "../shares/formatPrice";
import { uploads } from "../constant/api";

function Detail(props) {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const quangcao = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  async function loadData(id) {
    const detail = await getDetail(id);
    setData(detail);
    setIsDataLoaded(true);
  }

  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, [sliderRef1, sliderRef2]);

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]);
  console.log(data);

  if (!isDataLoaded) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
  const DSHinhAnhXe = data.modelXe.DSHinhAnhXe;
  const hinhAnhArray = JSON.parse(DSHinhAnhXe);

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
                      // ref={sliderRef1}

                      ref={(slider) => (sliderRef1 = slider)}
                    >
                      {hinhAnhArray.map((hinhAnh, index) => (
                        <div className="slider-anhto" key={index}>
                          <img
                            src={`${uploads()}${hinhAnh}`}
                            style={{ width: "100%" }}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>

                  <div className="slider-nav">
                    <Slider
                      asNavFor={nav1}
                      ref={(slider) => (sliderRef2 = slider)}
                      // ref={sliderRef2}
                      slidesToShow={3}
                      swipeToSlide={true}
                      focusOnSelect={true}
                    >
                      {hinhAnhArray.map((hinhAnh, index) => (
                        <div className="slider-anhnho" key={index}>
                          <img
                            src={`${uploads()}${hinhAnh}`}
                            style={{ width: "100%" }}
                          />
                        </div>
                      ))}
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
                  {data.modelXe.TenModel}
                </div>
                <div className="pro-price">{formatPrice(data.modelXe.Gia)}</div>
                <div className="pro-date blueDark-c">
                  <img
                    src="https://www.carmudi.vn./images/xe-oto/svg/year.svg"
                    alt=""
                  />
                  Năm sản xuất: {data.modelXe.NamSanXuat}
                </div>
                <div className="pro-brand blueDark-c">
                  <img
                    src="https://www.carmudi.vn./images/xe-oto/svg/brand.svg"
                    alt=""
                  />
                  Hãng xe: {data.modelXe.TenHang}
                </div>

                <div className="pro-versions">
                  <div className="version-title blueDark-c">Phiên bản</div>
                  <div className="row">
                    {data?.phienBan.map((item) => (
                      <div key={item.MaModel}>
                        <input
                          type="radio"
                          className="btn-check"
                          name="phienban"
                          id={`phienban${item.MaModel}`}
                          value={item.TenPhienBan}
                          autoComplete="off"
                        />
                        <label
                          className="pro-version"
                          htmlFor={`phienban${item.MaModel}`}
                        >
                          {item.TenPhienBan}
                        </label>
                      </div>
                    ))}
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

                      <p className="justify-t">{data.modelXe.MoTa}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 binhluans">
              <div className="row">
                <hr />
                <div className="col news-title blueDark-c">Bình luận</div>
              </div>
              <div className="user-binhluan">
                <div className="form-group">
                  <textarea
                    id="edt_binhluanbaiviet"
                    className="nhapnoidungvabinhluan"
                    onInput="autoExpand(this)"
                    placeholder="Điền nội dung bình luận..."
                    style={{ height: "50px" }}
                  ></textarea>
                </div>
                <button type="submit" id="btn-binhluanbaiviet">
                  Bình luận
                </button>
              </div>

              <div className="binhluan-cards">
                {data.binhLuan.map((item) => (
                  <Comment
                    key={item.MaBinhLuan}
                    anhDaiDien={item.AnhDaiDien}
                    hoTen={item.HoVaTen}
                    thoiGian={item.NgayTao}
                    noiDung={item.NoiDung}
                  ></Comment>
                ))}
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
                {data.tuongTu.map((item) => (
                  <CardCar
                    key={item.MaModel}
                    className={"col-3"}
                    maModel={item.MaModel}
                    hinhAnhXe={item.HinhAnhXe}
                    tenModel={item.TenModel}
                    namSanXuat={item.NamSanXuat}
                    nhienLieuTieuThu100KM={item.NhienLieuTieuThu100KM}
                    loaiNhienLieu={item.LoaiNhienLieu}
                    hopSo={item.HopSo}
                    gia={formatPrice(item.Gia)}
                  />
                ))}
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
