import { useRecoilState } from "recoil";
import Marquee from "react-fast-marquee";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { uploads } from "../constant/api";

const CardCar = function (props) {
  return (
    <>
      {/* <!-- start card car 1 --> */}
      <div className={`card_car ${props.className}`}>
        <form action="" method="post">
          <div className="card card_product">
            <Link to={`/detail/${props.maModel}`}>
              <div className="hinhanh-card">
                <img
                  className="default-img"
                  src={`${uploads()}${props.hinhAnhXe}`}
                  alt="no"
                />
              </div>

              <div className="tieude-card">{props.tenModel}</div>
              <div className="thongtinxe-card">
                <div className="doixe_thongtinxe-card thongtinxe-card_chung">
                  <img src="../IMAGE/icon_card_nam.svg" alt="" />
                  <div className="doixe_thongtinxe-card"></div>
                  {props.namSanXuat}
                </div>
                <div className="thongtinxe-card_chung">
                  <img src="../IMAGE/icon_card_xemoi.svg" alt="" />
                  <div className="hinhthuc_thongtinxe-card"></div>
                  {props.nhienLieuTieuThu100KM}
                </div>
                <div className="thongtinxe-card_chung">
                  <img src="../IMAGE/icon_card_xang.svg" alt="" />
                  <div className="nhienlieu_thongtinxe-card">
                    {props.loaiNhienLieu}
                  </div>
                </div>
                <div className="thongtinxe-card_chung">
                  <img src="../IMAGE/icon_card_tudong.svg" alt="" />
                  <div className="hopso_thongtinxe-card">{props.hopSo}</div>
                </div>
              </div>
              <div className="giaxe-card"> {props.gia}</div>
            </Link>
            <div className="chucnang-card">
              <div className="row">
                <div className="col">
                  <button type="submit" className="chucnang-card_themgiohang">
                    Thêm giỏ hàng
                  </button>
                </div>
                <div className="col">
                  <button type="submit" className="chucnang-card_muangay">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CardCar;
