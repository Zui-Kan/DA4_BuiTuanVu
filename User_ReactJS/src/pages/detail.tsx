import { useEffect, useState } from "react";
import "../assets/css/style_detail_screen.css";
import { addToCart } from "../utils/cart";
import { currentSlide, showSlides } from "../utils/image_product";
import { useParams } from "react-router-dom";
import { getItem } from "../services/detail.services";
import { useRecoilState } from "recoil";
import { cartState } from "../constant/recoil";
type DataParams = {
  id: string;
};
const Detail = function () {
  const { id } = useParams<DataParams>();
  const [data, setData] = useState({ maSanPham: null, tenSanPham: null });
  const [cart, setCart] = useRecoilState(cartState);
  useEffect(() => {
    showSlides(1);
    async function loadData(id: any) {
      let items = await getItem(id);
      setData(items);
    }
    loadData(id);
  }, [id]);
  return (
    <>
      <div className="link-out">
        <div className="link">
          <a href="index.html">Trang chủ</a>{" "}
          <i className="fas fa-caret-right"></i>
          <a href="DM_Laptop.html">Laptop</a>{" "}
          <i className="fas fa-caret-right"></i> Laptop ASUS ZenBook UX325EA
          EG079T
        </div>
      </div>
      <section className="content-inner">
        <div className="row">
          <div className="colc-4 colc-s-6 content">
            <div className="container">
              <div className="mySlides">
                <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T.jpg" />
              </div>

              <div className="mySlides">
                <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v1.png" />
              </div>

              <div className="mySlides">
                <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v2.png" />
              </div>

              <div className="mySlides">
                <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v3.png" />
              </div>

              <div className="mySlides">
                <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v4.png" />
              </div>

              <div className="mySlides">
                <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v1.png" />
              </div>

              {/* <a className="prev" onClick="plusSlides(-1)">❮</a>
                    <a className="next" onClick="plusSlides(1)">❯</a> */}

              <div className="row">
                <div className="column">
                  <img
                    className="demo cursor"
                    src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T.jpg"
                    onClick={() => currentSlide(1)}
                  />
                </div>
                <div className="column">
                  <img
                    className="demo cursor"
                    src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v1.png"
                    onClick={() => currentSlide(2)}
                  />
                </div>
                <div className="column">
                  <img
                    className="demo cursor"
                    src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v2.png"
                    onClick={() => currentSlide(3)}
                  />
                </div>
                <div className="column">
                  <img
                    className="demo cursor"
                    src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v3.png"
                    onClick={() => currentSlide(4)}
                  />
                </div>
                <div className="column">
                  <img
                    className="demo cursor"
                    src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v4.png"
                    onClick={() => currentSlide(5)}
                  />
                </div>
                <div className="column">
                  <img
                    className="demo cursor"
                    src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v1.png"
                    onClick={() => currentSlide(6)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="colc-5 colc-s-6 content padding-le">
            <div className="name">{data.tenSanPham}</div>
            <div className="evaluate">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>{" "}
              <span className="sp-eval">
                <a href="#cont-cmt">(1 đánh giá của khách hàng)</a>
              </span>
            </div>
            <div className="price">
              <span className="up">21.990.000₫</span>
              <span className="down">20.390.000₫</span>
            </div>
            <button
              type="button"
              className="btnAdd"
              onClick={() => {
                addToCart(data);
                let list = JSON.parse(localStorage.getItem('cart') || '[]');
                setCart(list);
              }}
            >
              <i className="fas fa-cart-plus"></i> Thêm vào giỏ
            </button>
            <script src="js/cart.js"></script>
            <div className="gift">
              <div className="title">
                <i className="fas fa-gift"></i> QUÀ TẶNG / KHUYẾN MẠI
              </div>
              <div className="content">
                NHẬN NGAY BỘ QUÀ TẶNG LÊN TỚI 600.000Đ (Từ ngày 10/05 -
                10/06/2021) bao gồm:
                <br />- Bàn phím Logitech K120
                <br />- Chuột Rapoo V16 Black
              </div>
            </div>
          </div>
          <div className="colc-3 content" id="r">
            <div className="commitment">
              <div className="title">CAM KẾT BÁN HÀNG</div>
              <div className="content">
                <li>Sản phẩm 100% chính hãng</li>
                <li>Sản phẩm mới 100%</li>
                <li>Hoàn tiền 120% khi phát hiện hàng giả</li>
                <li>Hỗ trợ nhanh khi cần</li>
                <li>Mua hàng nhanh: 0948098195</li>
              </div>
            </div>
            <div className="commitment1">
              <div className="title">GIAO HÀNG</div>
              <div className="content">
                <li>Nội thành HD 30 đến 120 phút</li>
                <li>Tỉnh thành khác - Từ 1 - 3 ngày</li>
                <li>Thanh toán khi nhận hàng</li>
                <li>Xem hàng trước khi thanh toán</li>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tab">
        <div className="tab1">
          <a href="#MoTa">Đặc điểm nổi bật</a>
        </div>
        <div className="tab1">
          <a href="#BinhLuan">Đánh giá</a>
        </div>
        <div className="tab1">
          <a href="#TuVan">Tư vấn & bán hàng qua Facebook</a>
        </div>
      </div>
      <section className="describe">
        <div className="title padding_title" id="MoTa">
          MÔ TẢ
        </div>
        <div className="title1">Thông số kỹ thuật:</div>
        <div className="parameter">
          <table>
            <tr>
              <td>CPU</td>
              <td>Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>8GB LPDDR4X 3200MHz (Onboard)</td>
            </tr>
            <tr>
              <td>Ổ lưu trữ</td>
              <td>256GB SSD M.2 PCIE G3X2</td>
            </tr>
            <tr>
              <td>Card đồ họa</td>
              <td>Intel Iris Xe Graphics</td>
            </tr>
            <tr>
              <td>Màn hình</td>
              <td>
                13.3" FHD (1920 x 1080) IPS, Anti-Glare, 72% NTSC, 100% sRGB,
                300nits
              </td>
            </tr>
            <tr>
              <td>Bàn phím</td>
              <td>Backlit Chiclet Keyboard</td>
            </tr>
            <tr>
              <td>Đọc thẻ nhớ</td>
              <td>MicroSD Card Reader</td>
            </tr>
            <tr>
              <td>Kết nối có dây (LAN)</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Kết nối không dây</td>
              <td>Intel Wi-Fi 6(Gig+)(802.11ax), Bluetooth v5.0</td>
            </tr>
            <tr>
              <td>Webcam</td>
              <td>3D IR HD camera with Windows Hello support</td>
            </tr>
            <tr>
              <td>Cổng giao tiếp</td>
              <td>
                2x Thunderbolt 4 USB-C (up to 40Gbps)
                <br />
                1x USB 3.2 Gen 1 Type-A (up to 5Gbps)
                <br />
                1x Standard HDMI 2.0a
              </td>
            </tr>
            <tr>
              <td>Hệ điều hành</td>
              <td>Windows 10 Home</td>
            </tr>
            <tr>
              <td>Pin</td>
              <td>4 Cell 67Whr</td>
            </tr>
            <tr>
              <td>Trọng lượng</td>
              <td>1.11 kg</td>
            </tr>
            <tr>
              <td>Kích thước</td>
              <td>30.42 x 20.3 x 1.39 ~ 1.39 cm</td>
            </tr>
            <tr>
              <td>Màu sắc</td>
              <td>Pine Grey</td>
            </tr>
            <tr>
              <td className="td-last">Bảo mật</td>
              <td className="td-last">None</td>
            </tr>
          </table>
        </div>
        <div className="title1">Giới thiệu sản phẩm:</div>
        <p style={{ marginTop: "10px" }}>
          Sở hữu cấu hình mạnh mẽ với sự góp mặt của chip Intel thế hệ 11 mới
          nhất, và thiết kế hiện đại mang vẻ đẹp vượt thời gian, laptop Asus
          ZenBook 13 UX325EA EG079T vừa ra mắt đã được đánh giá sẽ trở thành một
          trong những mã laptop doanh nhân được yêu thích nhất. Liệu UX325EA
          EG079T có đạt được kỳ vọng đó hay không, hãy cùng nhau chấm điểm cho
          mã laptop này nhé.
        </p>
        <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_c1.png" />
        <div className="title2">Vẻ đẹp hiện đại vượt thời gian</div>
        <p>
          Cả bốn mặt A,B,C,D của laptop Asus ZenBook 13 UX325EA đều được làm
          bằng kim loại cao cấp, bền đẹp với thời gian; kết hợp cùng tông màu
          Xám thông, làm nổi bật vẻ đẹp sang trọng, quý phái của chiếc máy cũng
          như người chủ sở hữu. Kích thước nhỏ gọn 30.42 x 20.3 cm, đặc biệt là
          chỉ dày 13.9mm và nặng chỉ 1.11 kg cả pin, người dùng dễ dàng mang máy
          đi bất cứ nơi đâu mong muốn. Tuy nhiên, điểm đặc biệt là dù mỏng nhẹ
          là thế, nhưng Asus vẫn khéo léo giữ lại cho người dùng cổng HDMI, điều
          này đặc biệt quan trọng với doanh nhân, bởi đôi khi có những cuộc họp
          quan trọng, cần kết nối với màn hình ngoài, thì cổng HDMI là không thể
          thiếu.
        </p>
        <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_c2.jpg" />
        <p style={{ marginTop: "10px" }}>
          Bản lề ErgoLift nâng máy lên 3 độ so với mặt phẳng tiếp xúc, giúp
          người dùng sử dụng bàn phím dễ dàng hơn, lại tạo ra khe hở giúp tản
          nhiệt tốt hơn, giữ máy luôn trong trạng thái mát mẻ, không hề bị nóng
          khi sử dụng. Chưa hết tại vị trí này, cũng giúp nâng cao chất lượng âm
          thanh của máy bởi loa được đặt ở mặt D của máy.
        </p>
        <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_c3.jpg" />
        <div className="title2">Màn hình 13.3 inch IPS tràn viền</div>
        <p>
          Asus ZenBook UX325EA EG079T sở hữu màn hình NanoEdge 13.3inch với viền
          siêu mỏng, nâng tỉ lệ màn hình trên thân máy lên tới 88%, mang lại
          trải nghiệm hình ảnh, không gian không giới hạn. Cùng với đó là độ
          phân giải FHD (1920 x 1080), tấm nền IPS và công nghệ chống lóa
          Anti-Glare, tái hiện hình ảnh sắc nét, màu sắc chân thật và chuyển
          động sống động hơn bao giờ hết.
        </p>
        <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_c4.jpg" />
        <div className="title2">Hiệu năng ấn tượng</div>
        <p>
          Laptop Asus UX325EAM EG079T sở hữu cấu hình với những thông số thật sự
          ấn tượng. CPU Intel core i5 thế hệ 11 mới nhất, với 8MB bộ nhớ đệm và
          xung nhịp tối đa đạt 4.20GHz, đây là một cpu mạnh cho các tác vụ văn
          phòng, đồ họa và gaming nhẹ. RAM 8GB LPDDR4X tiết kiệm điện bus
          4266MHz mạnh mẽ, khả năng chạy đa nhiệm mượt mà. Ổ cứng SSD M.2 NVMe
          PCIe 3.0 dung lượng 256GB, tốc độ xử lý nhanh nhạy.
        </p>
        <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_c5.png" />
        <p style={{ marginTop: "10px" }}>
          Chưa hết, ở mã laptop Asus 13.3inch nhỏ gọn này nếu người dùng có nhu
          cầu với các tác vụ đồ họa nhẹ như photoshop 2D với gaming giải trí nhẹ
          nhàng thì vga Intel Iris Xe Graphics đi kèm sẽ giúp người dùng xử lý
          một cách nhẹ nhàng. Cùng với đó là hệ điều hành Windows 10 Home bản
          quyền theo máy, người dùng không khó khăn khi phải mua bản quyền rời
          bên ngoài hoặc cài những bản win không chất lượng.
        </p>
        <div className="title2">Pin trâu - Sạc nhanh</div>
        <p>
          Theo kết quả test thời lượng pin của Asus thì laptop Asus ZenBook 13
          UX325EA EG079T sở hữu thời lượng pin lên tới 18 tiếng đồng hồ. Tuy
          nhiên, với các nhu cầu và cách sử dụng máy khác nhau mà thời lượng sử
          dụng pin sẽ khác nhau, nhưng với các linh kiện tiết kiệm điện năng
          được tích hợp theo máy thì người dùng hoàn toàn thoải mái sử dụng máy
          khi ra ngoài với thời lượng mười mấy tiếng đồng hồ như vậy.
        </p>
        <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_c6.png" />
        <p style={{ marginTop: "10px" }}>
          Ngoài ra, công nghệ sạc nhanh được tích hợp đi kèm, giúp người dùng có
          thể sạc thêm 60% pin trong vòng 49 phút để tiếp tục cuộc hành trình
          của mình. Đây thật sự là một điểm cộng rất lớn cho mã laptop Asus core
          i5 này, nhất là khi mã laptop này được tạo ra phục vụ cho những khách
          hàng doanh nhân thường phải di chuyển nhiều, việc mang theo một bộ sạc
          lỉnh kỉnh thật sự rất vướng víu và không được sang trọng cho lắm.
        </p>
        <div className="title2">
          Bàn phím tràn viền - Touchpad tích hợp Numpad
        </div>
        <p>
          Asus ZenBook 13 UX325EA EG079T sở hữu bàn phím tràn viền, tăng khoảng
          cách và kích thước phím, giúp người dùng tránh hiện tượng dính phím,
          gõ nhầm thường gặp ở bàn phím laptop kích thước nhỏ. Phông chữ dễ nhìn
          sang trọng, hành trình phím ngắn, cảm giác gõ thích, đổ nảy tốt, mang
          lại trải nghiệm rất thoải mái và dễ chịu.
        </p>
        <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_c7.png" />
        <p style={{ marginTop: "10px" }}>
          Touchpad nhạy, rộng lại được tích hợp chuyển đổi với Numpad tiện lợi,
          linh hoạt, giúp người dùng chuyển đổi dễ dàng giữa 2 chế độ, thuận
          tiện cho công việc.
        </p>
        <div className="title2">
          Cổng kết nối HDMI hiếm hoi trên laptop 13.3 inch siêu mỏng nhẹ
        </div>
        <p>
          Asus ZenBook 13 UX325EA làm lại một định nghĩa hoàn toàn mới về những
          gì mà một chiếc laptop siêu mỏng nhẹ có thể có, mang tới cho người
          dùng một bộ cổng kết nối đầy đủ. Mỏng nhẹ là vậy nhưng Asus vẫn giữ
          lại cổng HDMI và USB Type-A cho UX325EA EG079T. Ngoài ra, người dùng
          còn được tận hưởng sức mạnh của Thunderbolt™ 4 qua hai cổng
          Thunderbolt™ 4 USB-C® hỗ trợ sạc nhanh, màn hình ngoài với chất lượng
          4K UHD và tốc độ truyền gửi dữ liệu lên tới 40Gbps. Đầu đọc thẻ
          microSD dễ dàng trao đổi dữ liệu với các thiết bị di động khác.
        </p>
        <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_c8.png" />
      </section>
      <section className="comment">
        <div className="title padding_title" id="BinhLuan">
          BÌNH LUẬN
        </div>
        <div className="title1 padding_title" id="cont-cmt">
          1 đánh giá cho Màn hình máy tính MSI Optix MAG322CQRV Cong 2K 144Hz
        </div>
        <div className="box">
          <span className="point">
            5.00 <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </span>
          <span className="count">
            <a href="#cont-cmt">1 đánh giá của khách hàng</a>
          </span>
          <div className="ratio">
            <div className="level">
              5<i className="fas fa-star"></i>
            </div>
            <div className="progressBar">
              <div className="percentage"></div>
            </div>
            <div className="status">
              <span className="sp-status">100%</span> | 1 đánh giá
            </div>
          </div>
          <div className="ratio">
            <div className="level">
              4<i className="fas fa-star"></i>
            </div>
            <div className="progressBar"></div>
            <div className="status">
              <span className="sp-status">0%</span> | 0 đánh giá
            </div>
          </div>
          <div className="ratio">
            <div className="level">
              3<i className="fas fa-star"></i>
            </div>
            <div className="progressBar"></div>
            <div className="status">
              <span className="sp-status">0%</span> | 0 đánh giá
            </div>
          </div>
          <div className="ratio">
            <div className="level">
              2<i className="fas fa-star"></i>
            </div>
            <div className="progressBar"></div>
            <div className="status">
              <span className="sp-status">0%</span> | 0 đánh giá
            </div>
          </div>
          <div className="ratio">
            <div className="level">
              1<i className="fas fa-star"></i>
            </div>
            <div className="progressBar"></div>
            <div className="status">
              <span className="sp-status">0%</span> | 0 đánh giá
            </div>
          </div>
          <button type="button" className="btn-right" id="ri">
            ĐÁNH GIÁ NGAY
          </button>
          <button type="button" className="btn-bottom" id="bo">
            ĐÁNH GIÁ NGAY
          </button>
        </div>
        <div className="cmt">
          <div className="nameUser">Thuan Nguyen</div>
          <div className="content-cmt">
            <span>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </span>
            Quá tốt trong tầm giá
          </div>
          <div className="time">
            <a href="#">Thảo luận</a> <span>• 14/05/2021</span>
          </div>
          <hr />
        </div>
        <div className="box2">
          <textarea
            name="mota"
            rows={4}
            cols={167}
            placeholder="Mời bạn tham gia thảo luận, vui lòng nhập Tiếng Việt có dấu"
          ></textarea>
          <div className="content">
            <form method="POST">
              <input
                type="text"
                name="name"
                id="name"
                value=""
                placeholder="Họ tên (bắt buộc)"
                className="txtbox"
              />
              <input
                type="text"
                name="mail"
                id="mail"
                value=""
                placeholder="Email"
                className="txtbox"
              />
              <input
                type="button"
                name="send"
                id="send"
                value="Gửi"
                className="btn-send"
              />
            </form>
          </div>
        </div>
        <div className="content-cmt1">Chưa có bình luận nào</div>
      </section>
      <section className="advisory">
        <div className="title padding_title" id="TuVan">
          TƯ VẤN BÁN HÀNG QUA FACEBOOK
        </div>
        <div className="count">
          0 bình luận{" "}
          <span className="sp-sort">
            Sắp xếp theo
            <select id="sort" name="sort">
              <option value="old">Cũ nhất</option>
              <option value="new">Mới nhất</option>
            </select>
          </span>
        </div>
        <div className="add-comment" style={{ position: "relative" }}>
          <div className="avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="content">
            <textarea
              name="mota"
              rows={3}
              cols={156}
              placeholder="Thêm bình luận..."
            ></textarea>
            <div className="content-bot">
              <input type="checkbox" id="uptofb" name="uptofb" />
              <label htmlFor="uptofb">Cũng đang lên Facebook</label>
              <input type="button" value="Đăng" className="btn-up" />
            </div>
          </div>
        </div>
        <hr />
        <div className="public-fb">
          <i className="fab fa-facebook-square">
            {" "}
            <a
              href="https://developers.facebook.com/products/social-plugins/comments/?utm_campaign=social_plugins&utm_medium=offsite_pages&utm_source=comments_plugin"
              target="_blank"
            >
              Plugin bình luận trên Facebook
            </a>
          </i>
        </div>
      </section>
      <section className="module_products">
        <div className="product_title">
          <a href="DM_Laptop.html">
            <b>SẢN PHẨM TƯƠNG TỰ</b>
          </a>
        </div>
        <div className="row">
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Laptop Apple Macbook Air MGN93 (MGN93SA/A)/ Silver/ M1 Chip/ RAM 8GB/ 256GB SSD/ 13.3 inch Retina/ Touch ID/ Mac OS/ 1 Yr"
            >
              <img src="../img/LAPTOP/Laptop_Apple_Macbook_Air_MGN93.jpeg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Laptop Apple Macbook Air MGN93 (MGN93SA/A)/ Silver/ M1 Chip/ RAM 8GB/ 256GB SSD/ 13.3 inch Retina/ Touch ID/ Mac OS/ 1 Yr"
              >
                Laptop Apple Macbook Air...
              </a>
              <br />
              <span className="span_price_up">28.990.000₫</span>
              <span className="span_price_down">
                <b>28.590.000đ</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Laptop Asus Vivobook X515EA-EJ062T (Core i3-1115G4 | 4GB | 512GB | Intel UHD | 15.6-inch FHD | Win 10 | Bạc))"
            >
              <img src="../img/LAPTOP/Laptop_Asus_Vivobook_X515EA-EJ062T.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Laptop Asus Vivobook X515EA-EJ062T (Core i3-1115G4 | 4GB | 512GB | Intel UHD | 15.6-inch FHD | Win 10 | Bạc))"
              >
                Laptop Asus Vivobook X515E...
              </a>
              <br />
              <span className="span_price_up">13.490.000₫</span>
              <span className="span_price_down">
                <b>11.790.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="Laptop_ASUS_ZenBook_UX325EA_EG079T.html"
              title="Laptop ASUS ZenBook UX325EA EG079T"
            >
              <img src="../img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="Laptop_ASUS_ZenBook_UX325EA_EG079T.html"
                title="Laptop ASUS ZenBook UX325EA EG079T"
              >
                Laptop ASUS ZenBook UX325...
              </a>
              <br />
              <span className="span_price_up">21.990.000₫</span>
              <span className="span_price_down">
                <b>20.390.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="Laptop Acer Aspire 5 A514 54 540F">
              <img src="../img/LAPTOP/Laptop_Acer_Aspire_5_A514_54_540F.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="Laptop Acer Aspire 5 A514 54 540F">
                Laptop Acer Aspire 5 A514 54 540F
              </a>
              <br />
              <span className="span_price_up">17.690.000₫</span>
              <span className="span_price_down">
                <b>16.490.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Laptop ASUS TUF Gaming F15 FX506LH-HN002T (i5-10300H | 8GB | 512GB | VGA GTX 1650 4GB | 15.6' FHD 144Hz | Win 10)"
            >
              <img src="../img/LAPTOP/Laptop_ASUS_TUF_Gaming_F15_FX506LH_HN002T.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Laptop ASUS TUF Gaming F15 FX506LH-HN002T (i5-10300H | 8GB | 512GB | VGA GTX 1650 4GB | 15.6' FHD 144Hz | Win 10)"
              >
                Laptop ASUS TUF Gaming F15 FX50...
              </a>
              <br />
              <span className="span_price_up">20.490.000₫</span>
              <span className="span_price_down">
                <b>19.490.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Laptop Lenovo Legion Slim 7-15IMH5 (82BC005YVN) (i7 10750H/16GB RAM/512GB SSD/15.6 FHD 144hz/GTX1660TI 6G/Win/Xám)"
            >
              <img src="../img/LAPTOP/Lenovo_Legion_Slim_7-15IMH5.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Laptop Lenovo Legion Slim 7-15IMH5 (82BC005YVN) (i7 10750H/16GB RAM/512GB SSD/15.6 FHD 144hz/GTX1660TI 6G/Win/Xám)"
              >
                Laptop Lenovo Legion Slim...
              </a>
              <br />
              <span className="span_price_up">39.999.000₫</span>
              <span className="span_price_down">
                <b>37.999.000đ</b>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Detail;
