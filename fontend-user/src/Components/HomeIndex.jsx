import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../style/style.css";
import CardCar from "./CardCar";
import { Link } from "react-router-dom";
import { formatPrice } from "../shares/format";
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
          {data?.modelMoi?.status_code === 200 ? (
            data?.modelMoi?.data.map((item) => (
              <CardCar
                key={item.MaModel}
                className={"col-3"}
                maModel={item.MaModel}
                hinhAnhXe={item.HinhAnhXe}
                tenModel={item.TenModel}
                namSanXuat={item.NamSanXuat}
                nhienLieuTieuThu100KM={item["L/100"]}
                loaiNhienLieu={item.NhienLieu}
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
                  src="https://cmu-cdn.vinfast.vn/2024/05/e1fc9553-cuoicobalienvf3coc.jpg"
                  alt=""
                />
              </a>
            </div>

            <div className="abs_toptimkiem-khung">
              <a href="#">
                <img
                  src="https://cmu-cdn.vinfast.vn/2024/03/210ae4cb-bannergioithieuhomepage.jpg"
                  alt=""
                />
              </a>
            </div>

            <div className="abs_toptimkiem-khung">
              <a href="#">
                <img
                  src="https://cmu-cdn.vinfast.vn/2024/02/58a6963d-bannerdaisuxanh2024.jpg"
                  alt=""
                />
              </a>
            </div>

            <div className="abs_toptimkiem-khung">
              <a href="#">
                <img
                  src="https://cmu-cdn.vinfast.vn/2023/08/92502f2c-bannerhomepage28aug-scaled.jpg"
                  alt=""
                />
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
          <div className="col-4">
            <div className="card">
              <div className="khunganh">
                <img
                  src="https://cmu-cdn.vinfast.vn/2024/06/e16ae2ec-vinfastkyhoptacphilippines2-768x512.jpg"
                  alt=""
                  className="card-image"
                />
              </div>

              <div className="card-content">
                <h3 className="card-title">
                  <a href="">
                    VinFast ký hợp tác với 4 đại lý đầu tiên tại Philippines
                  </a>
                </h3>
                <div className="card-post">
                  <p>
                    Manila, Philippines, ngày 31/05/2024 – VinFast Auto công bố
                    ký kết hợp tác với 4 đại lý đầu tiên ở Philippines, qua đó
                    nhanh chóng thành lập mạng lưới bán lẻ để khẳng định sự hiện
                    diện thương hiệu tại thị trường quốc gia Đông Nam Á. Tại sự
                    kiện ra mắt thương hiệu được tổ chức tại thủ đô Manila,
                    VinFast chính thức ký kết hợp đồng hợp tác với 4 đại lý đầu
                    tiên, bao gồm EV Solutions, K1 Prestige Bay Motors Inc và
                    Autoflare Corporation, trụ sở tại thủ đô Manila; và MNV Auto
                    Group Inc., trụ sở tại thành phố Iloilo. Các cửa hàng đại lý
                    VinFast đầu tiên dự kiến được khai trương tại Manila vào
                    cuối tháng 6/2024. Các đại lý sẽ bắt đầu kinh doanh những
                    mẫu xe VF 5, VF e34, VF 7 và VF 9 ngay khi các mẫu xe này ra
                    mắt tại thị trường. Những chiếc xe đầu tiên dự kiến được
                    giao đến tay khách hàng Philippines từ Quý 3 năm nay.
                    VinFast cũng cân nhắc bán mẫu xe mini eSUV VF 3 đang đặc
                    biệt được ưa chuộng tại thị trường Việt Nam, đồng thời sẽ
                    nghiên
                  </p>
                </div>
                <div className="card-footer">
                  <div className="card-user">
                    <a href="#">
                      <img
                        src="https://vinfast.vn/wp-content/uploads/avatars/314/ff507c5b-63105cdfed1a9-bpthumb.jpg"
                        alt=""
                      />
                      <p>Quỳnh Anh</p>
                    </a>
                    <div className="card-time">10 giờ, 30 phút trước</div>
                    <div className="card-comment_new">
                      <img src="../IMAGE/icon_comment.tintuc.svg" alt="" />
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card">
              <div className="khunganh">
                <img
                  src="https://cmu-cdn.vinfast.vn/2024/05/65351c1a-240531vfthmtime100-company-vinfastdocx-1717126629656-768x513.webp"
                  alt=""
                  className="card-image"
                />
              </div>

              <div className="card-content">
                <h3 className="card-title">
                  <a href="">
                    VinFast thuộc top 100 công ty có tầm ảnh hưởng nhất thế giới
                    năm 2024 của TIME
                  </a>
                </h3>
                <div className="card-post">
                  <p>
                    VinFast vừa được tạp chí TIME vinh danh trong danh sách
                    “TIME100 Company” – top 100 công ty có tầm ảnh hưởng nhất
                    trên thế giới trong năm 2024, bên cạnh những tên tuổi lớn
                    như Google, Microsoft, Amazon. Tạp chí nổi tiếng của Mỹ xếp
                    VinFast vào nhóm “Đột phá” (Disrupters) – nhóm những công ty
                    tạo nên dấu ấn nhờ mô hình mới lạ, chưa có thông lệ trên thị
                    trường, gọi hãng xe Việt là “Hãng xe điện gây tiếng vang (An
                    EV splash)”. Nguồn cảm hứng cho tương lai nhân loại Ngày
                    30/5, tạp chí TIME của Mỹ công bố danh sách top 100 công ty
                    có tầm ảnh hưởng nhất thế giới của năm 2024. Trong đó, hãng
                    xe điện VinFast trở thành doanh nghiệp Việt Nam đầu tiên
                    được vinh danh trong danh sách này. VinFast là doanh nghiệp
                    Việt Nam đầu tiên được vinh danh trong danh sách quyền lực
                    này. Xuất hiện bên cạnh VinFast trong danh sách truyền cảm
                    hứng này là các “gã khổng lồ” như Google, Microsoft, Amazon,
                    TikTok, Nvidia, các ông lớn trong ngành xe như BMW, Toyota
                    hay cả những startup về AI đã thay đổi ngành
                  </p>
                </div>
                <div className="card-footer">
                  <div className="card-user">
                    <a href="#">
                      <img
                        src="	https://vinfast.vn/wp-content/uploads/avatars/162/056ab24d-63e9152925ba8-bpthumb.jpg"
                        alt=""
                      />
                      <p>Khang</p>
                    </a>
                    <div className="card-time">2 giờ, 10 phút trước</div>
                    <div className="card-comment_new">
                      <img src="../IMAGE/icon_comment.tintuc.svg" alt="" />
                      <span>30</span>
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
            {data?.topXeBanChay?.status_code === 200 ? (
              data?.topXeBanChay?.data.map((item) => (
                <div className="topCar_khung" key={item.MaModel}>
                  <CardCar
                    className={"topCar"}
                    maModel={item.MaModel}
                    hinhAnhXe={item.HinhAnhXe}
                    tenModel={item.TenModel}
                    namSanXuat={item.NamSanXuat}
                    nhienLieuTieuThu100KM={item["L/100"]}
                    loaiNhienLieu={item.NhienLieu}
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
