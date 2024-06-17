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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getDetail,
  getMauNgoaiThat,
  getMauNoiThat,
  saveBinhLuan,
} from "../services/detail.service";
import { formatPrice } from "../shares/format";
import { uploads } from "../constant/api";
import { Input, message } from "antd";

import {
  addToCart,
  getCartDetails,
  getDetailCart,
  getTotalQuantity,
} from "../services/cart.service";
import { cartCheckout, cartState } from "../constant/recoil";
import { useRecoilState } from "recoil";
import { lc_profile, lc_token } from "../services/auth.service";
import AsNavFor from "../Components/AsNavFor";
const { TextArea } = Input;

function Detail() {
  document.title = "Chi tiết";

  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const [quantity, setQuantity] = useState(1);

  const profile = lc_profile();
  const token = lc_token();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [versions, setVersions] = useState([]);
  const [allMauNgoaiThat, setAllMauNgoaiThat] = useState([]);
  const [allMauNoiThat, setAllMauNoiThat] = useState([]);
  const [mauNgoaiThat, setMauNgoaiThat] = useState([]);
  const [mauNoiThat, setMauNoiThat] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedNgoaiThat, setSelectedNgoaiThat] = useState(null);
  const [selectedNoiThat, setSelectedNoiThat] = useState(null);
  const [soLuongTon, setSoLuongTon] = useState(1);
  const [formDataGioHang, setFormDataGioHang] = useState({
    maNoiThat: null,
    soLuong: 1,
  });
  const [formDataBinhLuan, setFormDataBinhLuan] = useState({
    MaModel: "",
    TaiKhoanID: profile.id,
    NoiDung: "",
  });

  const [activeCommentId, setActiveCommentId] = useState(null);
  const [cart, setCart] = useRecoilState(cartState);
  const [checkout, setcheckout] = useRecoilState(cartCheckout);

  const quangcao = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };
  const tuongtu = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.min(prevQuantity + 1, soLuongTon);
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(prevQuantity - 1, 1);
      return newQuantity;
    });
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const newQuantity = Math.max(1, Math.min(value, soLuongTon));
    setQuantity(newQuantity);
  };

  async function loadData(id) {
    const [detail] = await Promise.all([getDetail(id)]);
    setData(detail);

    // Tải dữ liệu các phiên bản và màu sắc khi component mount
    const versions = detail?.phienBan || [];
    setVersions(versions);

    // Tải trước dữ liệu màu ngoại thất và nội thất cho tất cả các phiên bản
    const allMauNgoaiThat = await Promise.all(
      versions.map((version) => getMauNgoaiThat(version.MaPhienBan))
    );

    const allMauNoiThat = await Promise.all(
      allMauNgoaiThat
        .flat()
        .map((ngoaiThat) => getMauNoiThat(ngoaiThat.MaMauNgoaiThat))
    );

    setAllMauNgoaiThat(allMauNgoaiThat);
    setAllMauNoiThat(allMauNoiThat);

    setIsDataLoaded(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      loadData(id);
    }
  }, [id]);

  useEffect(() => {
    if (data && data.modelXe && data.modelXe.MaModel) {
      setFormDataBinhLuan((prevState) => ({
        ...prevState,
        MaModel: data.modelXe.MaModel,
      }));
    }
  }, [data]);

  //chức năng bình luận
  const handleSubmit = async () => {
    if (!formDataBinhLuan.NoiDung) {
      messageApi.open({
        type: "error",
        content: "Nội dung bình luận không được để trống.",
      });
      return;
    }
    try {
      const response = await saveBinhLuan(formDataBinhLuan);

      if (response && response.status_code === 200) {
        if (response.data) {
          setData((prevData) => ({
            ...prevData,
            binhLuan: [...prevData.binhLuan, response.data],
          }));
          setFormDataBinhLuan((prevState) => ({
            ...prevState,
            NoiDung: "",
          }));
          messageApi.open({
            type: "success",
            content: "Bình luận đã được gửi.",
          });
          loadData(id); // Tải lại dữ liệu để cập nhật danh sách bình luận
        } else {
          throw new Error("Dữ liệu bình luận mới không hợp lệ.");
        }
      } else {
        messageApi.open({
          type: "error",
          content: "Có lỗi xảy ra. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `Có lỗi xảy ra. Vui lòng thử lại: ${error.message}`,
      });
    }
  };

  // Chọn phiên bản, màu ngoại thất và màu nội thất
  const handleVersionChange = (versionId) => {
    setSelectedVersion(versionId);
    const ngoaiThatData = allMauNgoaiThat.find(
      (ngoaiThat) => ngoaiThat[0]?.MaPhienBan === versionId
    );
    setMauNgoaiThat(ngoaiThatData || []);
    setMauNoiThat([]);
    setSoLuongTon(1);
    setQuantity(1);
  };

  // Chọn màu ngoại thất
  const handleNgoaiThatChange = (ngoaiThatId) => {
    setSelectedNgoaiThat(ngoaiThatId);
    const noiThatData = allMauNoiThat.find(
      (noiThat) => noiThat[0]?.MaMauNgoaiThat === ngoaiThatId
    );
    setMauNoiThat(noiThatData || []);
    setSoLuongTon(1);
    setQuantity(1);
  };

  // Chọn màu nội thất và cập nhật số lượng
  const handleNoiThatChange = (noiThatId) => {
    setSelectedNoiThat(noiThatId);
    setFormDataGioHang((prevState) => ({
      ...prevState,
      maNoiThat: noiThatId,
    }));

    const soLuongTon = getSoLuongTon(noiThatId);
    setSoLuongTon(soLuongTon);
  };

  const getSoLuongTon = (noiThatId) => {
    const noiThatItem = mauNoiThat.find(
      (item) => item.MaMauNoiThat === noiThatId
    );
    return noiThatItem ? noiThatItem.SoLuong : null;
  };

  const handleAddToCart = async () => {
    if (!selectedNoiThat) {
      messageApi.error(
        "Vui lòng chọn phiên bản, màu ngoại thất và màu nội thất."
      );
      return;
    }
    await addToCart(selectedNoiThat, quantity);

    navigate("/detail/" + id);
  };

  const handleBuyNowChange = async () => {
    if (!selectedNoiThat) {
      messageApi.error(
        "Vui lòng chọn phiên bản, màu ngoại thất và màu nội thất."
      );
      return;
    } else if (!token) {
      messageApi.error("Vui lòng đăng nhập để mua sản phẩm.");
      return;
    } else {
      const response = await getDetailCart(selectedNoiThat);
      const buyNow = await [
        {
          ...response.data.data,
          SoLuong: quantity,
        },
      ];
      setcheckout(buyNow);
      navigate("/checkout");
    }
  };

  if (!isDataLoaded) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  return (
    <>
      {contextHolder}

      <div className="product-details_khung">
        <section className="product-details spad">
          <div className="row">
            <div className="col-lg-7 col-md-6">
              <div className="row">
                <div className="Slider-Syncing">
                  <AsNavFor data={data}></AsNavFor>
                </div>
                <div className="specifications">
                  <div className="spec-title blueDark-c">THÔNG SỐ KỸ THUẬT</div>
                  <div className="spec-table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Thông số kỹ thuật</th>
                          {JSON.parse(data?.thongSoKyThuat.PhienBanXe).map(
                            (item, index) => (
                              <th scope="col" key={index}>
                                {item}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Động cơ</th>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Loại động cơ</td>
                          {JSON.parse(data?.thongSoKyThuat.LoaiDongCo).map(
                            (item, index) => (
                              <td key={index}>{item}</td>
                            )
                          )}
                        </tr>
                        <tr>
                          <td>Hiệu động</td>
                          {JSON.parse(data?.thongSoKyThuat.LoaiHieuDong).map(
                            (item, index) => (
                              <td key={index}>{item}</td>
                            )
                          )}
                        </tr>
                        <tr>
                          <td>Công Suất (HP)</td>
                          {JSON.parse(data?.thongSoKyThuat.CongSuat).map(
                            (item, index) => (
                              <td key={index}>{item}</td>
                            )
                          )}
                        </tr>

                        <tr>
                          <td>Công Suất (HP)</td>
                          {JSON.parse(data?.thongSoKyThuat.MoMenXoan).map(
                            (item, index) => (
                              <td key={index}>{item}</td>
                            )
                          )}
                        </tr>
                        <tr>
                          <th scope="row">Thông tin</th>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Màu sắc</td>
                          {JSON.parse(data?.thongSoKyThuat.MauSac).map(
                            (item, index) => (
                              <td key={index}>{item}</td>
                            )
                          )}
                        </tr>
                        <tr>
                          <td>Nhiên liệu</td>
                          {JSON.parse(data?.thongSoKyThuat.LoaiNhienLieu).map(
                            (item, index) => (
                              <td key={index}>{item}</td>
                            )
                          )}
                        </tr>

                        <tr>
                          <td>Nhiên liệu tiêu thụ (L/100km)</td>
                          {JSON.parse(
                            data?.thongSoKyThuat.NhienLieuTieuThu100KM
                          ).map((item, index) => (
                            <td key={index}>{item}</td>
                          ))}
                        </tr>
                        <tr>
                          <td>Hộp số</td>
                          {JSON.parse(data?.thongSoKyThuat.HopSo).map(
                            (item, index) => (
                              <td key={index}>{item}</td>
                            )
                          )}
                        </tr>
                        <tr>
                          <td>Túi khí</td>
                          {JSON.parse(data?.thongSoKyThuat.TuiKhi).map(
                            (item, index) => (
                              <td key={index}>{item}</td>
                            )
                          )}
                        </tr>
                        <tr>
                          <th scope="row">Kích Thước Và Trọng Lượng</th>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Nhiên liệu</td>
                          {JSON.parse(data?.thongSoKyThuat.KichThuoc).map(
                            (item, index) => (
                              <td key={index}>{item}</td>
                            )
                          )}
                        </tr>
                        <tr>
                          <td>Trọng lượng</td>
                          {JSON.parse(data?.thongSoKyThuat.TrongLuong).map(
                            (item, index) => (
                              <td key={index}>{item}</td>
                            )
                          )}
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
                  {" Năm sản xuất: "}

                  {data.modelXe.NamSanXuat}
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
                  <div className="column-pro_mauvaphienban">
                    {data?.phienBan.map((item) => (
                      <div
                        className="item-control_phienbgan"
                        key={item.MaPhienBan}
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="phienban"
                          id={`phienban${item.MaPhienBan}`}
                          value={item.TenPhienBan}
                          autoComplete="off"
                          onChange={() => handleVersionChange(item.MaPhienBan)}
                        />
                        <label
                          className="pro-version"
                          htmlFor={`phienban${item.MaPhienBan}`}
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
                  <div className="column-pro_mauvaphienban">
                    {mauNgoaiThat.map((mau) => (
                      <div
                        className="item-control_mau"
                        key={mau.MaMauNgoaiThat}
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="ngoai_color"
                          id={`ngoai_color${mau.MaMauNgoaiThat}`}
                          value={mau.TenMauNgoaiThat}
                          autoComplete="off"
                          onChange={() =>
                            handleNgoaiThatChange(mau.MaMauNgoaiThat)
                          }
                        />
                        <label
                          className="pro-color"
                          htmlFor={`ngoai_color${mau.MaMauNgoaiThat}`}
                        >
                          <img
                            src={uploads() + mau.HinhAnhMauNgoaiThat}
                            alt={mau.TenMauNgoaiThat}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pro-colors noithat">
                  <div className="color-title blueDark-c">
                    Nội thất <span id="selected_noi_color"></span>
                  </div>
                  <div className="column-pro_mauvaphienban">
                    {mauNoiThat.map((mau) => (
                      <div className="item-control_mau" key={mau.MaMauNoiThat}>
                        <input
                          type="radio"
                          className="btn-check"
                          name="noi_color"
                          id={`noi_color${mau.MaMauNoiThat}`}
                          value={mau.TenMauNoiThat}
                          onChange={() => handleNoiThatChange(mau.MaMauNoiThat)}
                          autoComplete="off"
                        />
                        <label
                          className="pro-color"
                          htmlFor={`noi_color${mau.MaMauNoiThat}`}
                        >
                          <img
                            src={uploads() + mau.HinhAnhMauNoiThat}
                            alt={mau.TenMauNoiThat}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pro-colors noithat">
                  <div className="color-title blueDark-c">
                    Số lượng <span id="selected_noi_color"></span>
                  </div>
                  <div className="inp-soluong">
                    <button
                      className="btn-secondary decrease-btn"
                      onClick={handleDecrease}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={quantity}
                      min="1"
                      max={soLuongTon}
                      onChange={handleInputChange}
                    />
                    <button
                      className="btn-secondary increase-btn"
                      onClick={handleIncrease}
                    >
                      +
                    </button>
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
                      <button
                        className="pro-btn_cart blueDark-c"
                        onClick={handleAddToCart}
                      >
                        <img
                          src="../IMAGE/icons8_add_shopping_cart_1.svg"
                          alt=""
                        />
                        Thêm Vào Giỏ Hàng
                      </button>

                      <button
                        className="pro-btn_buy"
                        onClick={handleBuyNowChange}
                      >
                        Mua Ngay
                      </button>
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
                      <div className="product__details__tab__desc">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.modelXe.MoTa,
                          }}
                        />
                      </div>
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

              {token && (
                <div className="user-binhluan">
                  <div className="form-group">
                    <TextArea
                      rows={3}
                      className="nhapnoidungvabinhluan"
                      placeholder="Điền nội dung bình luận..."
                      value={formDataBinhLuan.NoiDung}
                      onChange={(e) =>
                        setFormDataBinhLuan({
                          ...formDataBinhLuan,
                          NoiDung: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    id="btn-binhluanbaiviet"
                    onClick={handleSubmit}
                  >
                    Bình luận
                  </button>
                </div>
              )}

              <div className="binhluan-cards">
                {console.log(data.binhLuan)}
                {data?.binhLuan && data.binhLuan.length > 0 ? (
                  data?.binhLuan?.map((item) => (
                    <Comment
                      key={item?.MaBinhLuan}
                      profile={profile}
                      taiKhoanID={item?.TaiKhoanID}
                      maBinhLuan={item?.MaBinhLuan}
                      anhDaiDien={item?.AnhDaiDien || "TaiKhoan/img_1.jpg"}
                      hoTen={item?.HoVaTen || "Anonymous"}
                      thoiGian={item?.NgayTao || "Unknown time"}
                      noiDung={item?.NoiDung || ""}
                      deleteBinhLuan={activeCommentId === item.MaBinhLuan}
                      handleDeleteBinhLuan={() =>
                        setActiveCommentId(
                          activeCommentId === item.MaBinhLuan
                            ? null
                            : item.MaBinhLuan
                        )
                      }
                      loadData={() => loadData(id)}
                    />
                  ))
                ) : (
                  <p>Chưa có bình luận nào.</p>
                )}
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
                <div className="tuongtus">
                  <Slider {...tuongtu}>
                    {data.tuongTu.map((item) => (
                      <div className="topCar_khung" key={item.MaModel}>
                        <CardCar
                          maModel={item.MaModel}
                          hinhAnhXe={item.HinhAnhXe}
                          tenModel={item.TenModel}
                          namSanXuat={item.NamSanXuat}
                          nhienLieuTieuThu100KM={item.L100}
                          loaiNhienLieu={item.NhienLieu}
                          hopSo={item.HopSo}
                          gia={formatPrice(item.Gia)}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
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
