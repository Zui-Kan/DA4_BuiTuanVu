import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../style/style.css";
import CardCar from "./CardCar";
import { Link } from "react-router-dom";
import { formatPrice } from "../shares/formatPrice";
import { uploads } from "../constant/api";

const HomeIndex = function ({ data }) {
  if (!data) {
    return null;
  }

  var category = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  var abs_toptimkiem = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  var topCars = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <main>
      {/* <!-- Start Category --> */}
      <div className="Category">
        <div className="row">
          <div className="col news-title blueDark-c">HÃNG XE</div>
        </div>
        <div className="category-cards">
          <Slider {...category}>
            {/* <!-- category card 1 --> */}

            {data?.hangXe?.map((item) => (
              <Link
                key={item.MaHang}
                to={`/carcompany/${item.MaHang}`}
                className="category-card_khung"
              >
                <div className="category-card">
                  <div className="img-cate">
                    <img src={`${uploads()}${item.HinhAnhHangXe}`} alt="#" />
                  </div>
                  <div className="name-category">{item.TenHang}</div>
                </div>
              </Link>
            ))}

            {/* <!-- end card --> */}
          </Slider>
        </div>
      </div>
      {/* <!-- End Category --> */}

      {/* <!-- start list card car --> */}
      <div className="listCar">
        <div className="row">
          <div className="col news-title blueDark-c">Model mới</div>
        </div>
        <div className="row">
          {data?.modelMoi.status_code === 200 ? (
            data?.modelMoi?.data.map((item) => (
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
            ))
          ) : (
            <div className="div">{data?.modelMoi?.message}</div>
          )}
        </div>

        <div className="index-abs_toptimkiem">
          <Slider {...abs_toptimkiem}>
            <div className="abs_toptimkiem-khung">
              <a href="#">
                <img
                  src="https://cmu-cdn.vinfast.vn/2023/05/6d1cf0ee-img_3894giainhatmvm-1536x1024.jpg"
                  alt=""
                />
              </a>
            </div>

            <div className="abs_toptimkiem-khung">
              <a href="#">
                <img src="/IMAGE/oto/1.jpg" alt="" />
              </a>
            </div>

            <div className="abs_toptimkiem-khung">
              <a href="#">
                <img src="/IMAGE/oto/1.jpg" alt="" />
              </a>
            </div>

            <div className="abs_toptimkiem-khung">
              <a href="#">
                <img src="/IMAGE/oto/1.jpg" alt="" />
              </a>
            </div>
          </Slider>
        </div>
      </div>
      {/* <!-- end list card car --> */}
      <div className="news">
        <div className="row">
          <div className="col news-title blueDark-c">TIN TỨC</div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="khunganh">
                <img
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="card-image"
                />
              </div>

              <div className="card-content">
                <h3 className="card-title">
                  <a href="">
                    Công bố giải tuần cuối (từ 24/4 đến 02/5) dành cho Hội nhóm
                    dự thi Khoảnh khắc VinFast
                  </a>
                </h3>
                <div className="card-post">
                  <p>
                    Trong tuần cuối của cuộc thi Khoảnh khắc đáng nhớ cùng
                    VinFast, hội chủ xe Fadil Hải Phòng tiếp tục dẫn đầu đường
                    đua dành cho hội nhóm tập thể. Sau khi đánh giá, tổng kết
                    các bài dự thi, Ban tổ chức công bố Hội nhóm có nhiều bài dự
                    thi hợp lệ nhất tuần qua là: Hội Fadil Hải Phòng Đây là lần
                    thứ ba liên tiếp, Hội Fadil Hải Phòng đoạt giải thường tuần.
                    Ban tổ chức xin chúc mừng Hội Fadil Hải Phòng và sẽ trực
                    tiếp liên hệ với đại diện hội đoạt giải để hướng dẫn các
                    bước nhận giải tiếp theo. Cuộc thi Khoảnh khắc đáng nhớ cùng
                  </p>
                </div>
                <div className="card-footer">
                  <div className="card-user">
                    <a href="#">
                      <img
                        src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                      <p>Admin</p>
                    </a>
                    <div className="card-time">5 giờ, 15 phút trước</div>
                    <div className="card-comment_new">
                      <img src="../IMAGE/icon_comment.tintuc.svg" alt="" />
                      <span>60</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="listTopCar">
        <div className="row">
          <div className="col news-title blueDark-c">TOP XE BÁN CHẠY</div>
        </div>
        {/* Top sản phẩm bán CHẠY */}
        <div className="topCars">
          <Slider {...topCars}>
            {data?.topXeBanChay.status_code === 200 ? (
              data?.topXeBanChay?.data.map((item) => (
                <div className="topCar_khung" key={item.MaModel}>
                  <CardCar
                    className={"topCar"}
                    maModel={item.MaModel}
                    hinhAnhXe={item.HinhAnhXe}
                    tenModel={item.TenModel}
                    namSanXuat={item.NamSanXuat}
                    nhienLieuTieuThu100KM={item.NhienLieuTieuThu100KM}
                    loaiNhienLieu={item.LoaiNhienLieu}
                    hopSo={item.HopSo}
                    gia={formatPrice(item.Gia)}
                  />
                </div>
              ))
            ) : (
              <div className="div">{data?.topXeBanChay?.message}</div>
            )}
          </Slider>
        </div>
      </div>
    </main>
  );
};

export default HomeIndex;
