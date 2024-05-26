import Marquee from "react-fast-marquee";
import { Init, ShowLeft, ShowRight } from "../utils/slide_show";
import { useEffect } from "react";
import '../assets/css/style_home.css'
var myIndex = 0;
var timerID: any;
const Home = function () {
  useEffect(() => {
    function carousel() {
      var i;
      var x = document.getElementsByClassName("slide_auto");
      for (i = 0; i < x.length; i++) {
        (x[i] as HTMLElement).style.display = "none";
      }
      myIndex++;
      if (myIndex > x.length) {
        myIndex = 1;
      }
      (x[myIndex - 1] as HTMLElement).style.display = "block";
    }
    timerID = setInterval(() => carousel(), 4000);
    Init();
    carousel();
    return () => {
      clearInterval(timerID);
    } 
  }, []);
  return (
    <>
      <section className="slide-out">
        <div className="slideshow">
          <img
            className="silde_img slide_auto"
            src="img/SLIDE/slideshow_1.jpg"
          />
          <img
            className="silde_img slide_auto"
            src="img/SLIDE/slideshow_2.jpg"
          />
          <img
            className="silde_img slide_auto"
            src="img/SLIDE/slideshow_3.jpg"
          />
          <img
            className="silde_img slide_auto"
            src="img/SLIDE/slideshow_4.jpg"
          />
          <img
            className="silde_img slide_auto"
            src="img/SLIDE/slideshow_5.jpg"
          />
          <button onClick={() => ShowLeft()} className="display-left black">
            <i className="fas fa-caret-left"></i>
          </button>
          <button onClick={() => ShowRight()} className="display-right black">
            <i className="fas fa-caret-right"></i>
          </button>
        </div>
        <script src="js/slide_show.js"></script>
      </section>
      <section className="run-text">
        <div className="r-txt">
          <b>Liên hệ với Nguyễn Chiến Computer</b>
          <i className="fas fa-caret-right"></i>
        </div>
        <div className="r1-txt">
          <Marquee>
            NGUYỄN CHIẾN COMPUTER &nbsp; Điện thoại: 0948.098.195 - 0975.992.125
            &nbsp; Địa chỉ: 195 Nguyễn Chế Nghĩa, Gia Lộc, Hải Dương
          </Marquee>
        </div>
      </section>
      <section className="module_products">
        <div className="product_title" style={{ position: "relative" }}>
          <a href="#">
            <b>SẢN PHẨM BÁN CHẠY</b>
          </a>
        </div>
        <div className="row">
          <div className="col-2 col-s-3 content">
            <a
              href="MSI_Optix_MAG322CQRV.html"
              title="Màn hình máy tính MSI Optix MAG322CQRV Cong 2K 144Hz"
            >
              <img src="img/MANHINH/MSI_Optix_MAG322CQRV.png" />
            </a>
            <div className="text_product_1">
              <a
                href="MSI_Optix_MAG322CQRV.html"
                title="Màn hình máy tính MSI Optix MAG322CQRV Cong 2K 144Hz"
              >
                Màn hình máy tính MSI Op...
              </a>
              <br />
              <span className="span_price_up">12.500.000₫</span>
              <span className="span_price_down">
                <b>12.150.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Laptop Lenovo Legion Slim 7-15IMH5 (82BC005YVN) (i7 10750H/16GB RAM/512GB SSD/15.6 FHD 144hz/GTX1660TI 6G/Win/Xám)"
            >
              <img src="img/LAPTOP/Lenovo_Legion_Slim_7-15IMH5.png" />
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
          <div className="col-2 col-s-3 content">
            <a href="#" title="GVN Ivy 10 M">
              <img src="img/GAMING_STREAMING/GVN_Ivy_10_M.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="GVN Ivy 10 M">
                GVN Ivy 10 M
              </a>
              <br />
              <span className="span_price_up">16.090.000₫</span>
              <span className="span_price_down">
                <b>15.090.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Màn hình máy tính Dell Monitor S2421HN 23.8 Wide LED, Full HD 1920 x 1080, 2 x HDMI 1.4, 1 x 3.5mm Audio Out"
            >
              <img src="img/MANHINH/Dell_Monitor_S2421HN_23.8_Wide_LED.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Màn hình máy tính Dell Monitor S2421HN 23.8 Wide LED, Full HD 1920 x 1080, 2 x HDMI 1.4, 1 x 3.5mm Audio Out"
              >
                Màn hình máy tính Dell Monitor S2421HN 23.8...
              </a>
              <br />
              <span className="span_price_up">3.908.000₫</span>
              <span className="span_price_down">
                <b>3.750.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Máy chủ Dell PowerEdge T40 Tower (E-2224G / 8GB / 1TB)"
            >
              <img src="img/DH_WORKSTATION/Dell_PowerEdge_T40.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Máy chủ Dell PowerEdge T40 Tower (E-2224G / 8GB / 1TB)"
              >
                Máy tính chủ Dell PowerEdge T40/Intel Xeon E-...
              </a>
              <br />
              <span className="span_price_up">15.990.000₫</span>
              <span className="span_price_down">
                <b>15.500.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="Laptop Acer Aspire 5 A514 54 540F">
              <img src="img/LAPTOP/Laptop_Acer_Aspire_5_A514_54_540F.jpg" />
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
        </div>
      </section>
      <section className="module_products">
        <div className="product_title">
          <a href="#">
            <b>
              PC ĐỒ HOẠ – WORKSTATION
              <span>
                <a href="#" className="span_product_title">
                  Xem tất cả
                  <i className="fas fa-angle-double-right"></i>
                </a>
              </span>
            </b>
          </a>
        </div>
        <div className="row">
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Máy trạm Workstation Dell Precision T582042PT58DW27 Mini Tower"
            >
              <img src="img/DH_WORKSTATION/Dell_Precision_T5820.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Máy trạm Workstation Dell Precision T582042PT58DW27 Mini Tower"
              >
                Máy trạm Workstation Dell Precision T5820...
              </a>
              <br />
              <span className="span_price_up">50.900.000₫</span>
              <span className="span_price_down">
                <b>48.900.000đ</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Máy chủ HP DL20 (P06963-B21-2224-16GB-4SFF) Gen10 E2224, 4SFF, 16GB, 290W, Non HDD, 4y NBD FC"
            >
              <img src="img/DH_WORKSTATION/HP_DL20.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Máy chủ HP DL20 (P06963-B21-2224-16GB-4SFF) Gen10 E2224, 4SFF, 16GB, 290W, Non HDD, 4y NBD FC"
              >
                Máy chủ HP DL20 (P06963-B21-2224-16GB-4SFF) Gen10...
              </a>
              <br />
              <span className="span_price_up">34.000.000₫</span>
              <span className="span_price_down">
                <b>31.900.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Máy tính chủ Dell PowerEdge T340 Server/Intel Xeon E-2234,up to 8x3.5/8GB/1TB 7.2K SATA hp hc/iDrac9Ba/H330/DVDRW/2x1GbE LOM/495W/4YrPro"
            >
              <img src="img/DH_WORKSTATION/Dell_PowerEdge_T340_Server.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Máy tính chủ Dell PowerEdge T340 Server/Intel Xeon E-2234,up to 8x3.5/8GB/1TB 7.2K SATA hp hc/iDrac9Ba/H330/DVDRW/2x1GbE LOM/495W/4YrPro"
              >
                Máy tính chủ Dell PowerEdge T340 Server/Intel Xeon...
              </a>
              <br />
              <span className="span_price_up">45.000.000₫</span>
              <span className="span_price_down">
                <b>40.000.000</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Máy chủ HP MicroSvr (P19752-371) Gen10+ E-2224, 8GB, NHP Svr, 3Y NBD FC"
            >
              <img src="img/DH_WORKSTATION/HP_MicroSvr.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Máy chủ HP MicroSvr (P19752-371) Gen10+ E-2224, 8GB, NHP Svr, 3Y NBD FC"
              >
                Máy chủ HP MicroSvr (P19752-371) Gen10+ E-2224, 8GB, NHP...
              </a>
              <br />
              <span className="span_price_up">21.000.000₫</span>
              <span className="span_price_down">
                <b>19.900.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Máy tính chủ Dell PowerEdge T40/Intel Xeon E-2224G/8GB/1TB 7.2K SATA Cab/DVDRW/1xIntel I219-LM Gigabit/300W/4YrPro"
            >
              <img src="img/DH_WORKSTATION/Dell_PowerEdge_T40.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Máy tính chủ Dell PowerEdge T40/Intel Xeon E-2224G/8GB/1TB 7.2K SATA Cab/DVDRW/1xIntel I219-LM Gigabit/300W/4YrPro"
              >
                Máy tính chủ Dell PowerEdge T40/Intel Xeon E-2224G/...
              </a>
              <br />
              <span className="span_price_up">15.990.000₫</span>
              <span className="span_price_down">
                <b>15.500.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Máy tính chủ Dell PowerEdge T340 Server/Intel Xeon E-2234,up to 8x3.5/8GB/1TB 7.2K SATA hp hc/iDrac9Ba/H330/DVDRW/2x1GbE LOM/495W/4YrPro"
            >
              <img src="img/DH_WORKSTATION/Dell_PowerEdge_T340_Server.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Máy tính chủ Dell PowerEdge T340 Server/Intel Xeon E-2234,up to 8x3.5/8GB/1TB 7.2K SATA hp hc/iDrac9Ba/H330/DVDRW/2x1GbE LOM/495W/4YrPro"
              >
                Máy tính chủ Dell PowerEdge T340 Server/Intel Xeon...
              </a>
              <br />
              <span className="span_price_up">45.000.000₫</span>
              <span className="span_price_down">
                <b>40.000.000</b>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="module_products">
        <div className="product_title">
          <a href="#">
            <b>
              PC GAMING, STREAMING
              <span>
                <a href="#" className="span_product_title">
                  Xem tất cả
                  <i className="fas fa-angle-double-right"></i>
                </a>
              </span>
            </b>
          </a>
        </div>
        <div className="row">
          <div className="col-2 col-s-3 content">
            <a href="#" title="GVN Venus S">
              <img src="img/GAMING_STREAMING/GVN_Venus_S.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="GVN Venus S">
                GVN Venus S
              </a>
              <br />
              <span className="span_price_up">26.400.000₫</span>
              <span className="span_price_down">
                <b>24.890.000đ</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="GVN Volibear S">
              <img src="img/GAMING_STREAMING/GVN_Volibear_S.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="GVN Volibear S">
                GVN Volibear S
              </a>
              <br />
              <span className="span_price_up">32.890.000₫</span>
              <span className="span_price_down">
                <b>30.490.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="GVN Hextech S">
              <img src="img/GAMING_STREAMING/GVN_Hextech_S.png" />
            </a>
            <div className="text_product_1">
              <a href="#" title="GVN Hextech S">
                GVN Hextech S
              </a>
              <br />
              <span className="span_price_up">23.200.000₫</span>
              <span className="span_price_down">
                <b>21.590.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="GVN Armin M">
              <img src="img/GAMING_STREAMING/GVN_Armin_M.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="GVN Armin M">
                GVN Armin M
              </a>
              <br />
              <span className="span_price_up">14.930.000₫</span>
              <span className="span_price_down">
                <b>14.190.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="GVN Ivy 10 M">
              <img src="img/GAMING_STREAMING/GVN_Ivy_10_M.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="GVN Ivy 10 M">
                GVN Ivy 10 M
              </a>
              <br />
              <span className="span_price_up">16.090.000₫</span>
              <span className="span_price_down">
                <b>15.090.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="PCAP Apollo">
              <img src="img/GAMING_STREAMING/PCAP_Apollo.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="PCAP Apollo">
                PCAP Apollo
              </a>
              <br />
              <span className="span_price_up">15.500.000₫</span>
              <span className="span_price_down">
                <b>13.500.000₫</b>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="module_products">
        <div className="product_title">
          <a href="#">
            <b>
              PC VĂN PHÒNG, AIO, MINI PC
              <span>
                <a href="#" className="span_product_title">
                  Xem tất cả
                  <i className="fas fa-angle-double-right"></i>
                </a>
              </span>
            </b>
          </a>
        </div>
        <div className="row">
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Máy tính để bàn All In One Dell Inspiron 5400 (42INAIO540001)/ Black/ Intel core i3-1115G4 ( upto 4.10GHz, 6MB)/ Ram 8GB (8GB x1) DDR4/ HDD 1TB/ Intel UHD Graphics/ 23.8 Inch FHD Non touch/ WC + WL + BT/ Wl Key + Mouse/ No DVD/ Win10SL/ 1Yr"
            >
              <img src="img/VANPHONG_AIO_MINI/Dell_Inspiron_5400.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Máy tính để bàn All In One Dell Inspiron 5400 (42INAIO540001)/ Black/ Intel core i3-1115G4 ( upto 4.10GHz, 6MB)/ Ram 8GB (8GB x1) DDR4/ HDD 1TB/ Intel UHD Graphics/ 23.8 Inch FHD Non touch/ WC + WL + BT/ Wl Key + Mouse/ No DVD/ Win10SL/ 1Yr"
              >
                Máy tính để bàn All In One Dell Dell Inspiron 5400...
              </a>
              <br />
              <span className="span_price_up">25.990.000₫</span>
              <span className="span_price_down">
                <b>24.590.000đ</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Máy tính để bàn All In One Dell OptiPlex 7480/ Intel Core i5-10500T (2.30Ghz, 12MB)/ RAM 8GB (1x8GB) DDR4/ SSD 512GB/ Intel UHD Graphics/ 23.8 inch FHD Touch/ Wifi + BT + WC/ Key + Mouse/ Ubuntu/ 3Yrs"
            >
              <img src="img/VANPHONG_AIO_MINI/Dell_OptiPlex_7480.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Máy tính để bàn All In One Dell OptiPlex 7480/ Intel Core i5-10500T (2.30Ghz, 12MB)/ RAM 8GB (1x8GB) DDR4/ SSD 512GB/ Intel UHD Graphics/ 23.8 inch FHD Touch/ Wifi + BT + WC/ Key + Mouse/ Ubuntu/ 3Yrs"
              >
                Máy tính để bàn All In One Dell OptiPlex 7480/ Intel...
              </a>
              <br />
              <span className="span_price_up">27.923.300₫</span>
              <span className="span_price_down">
                <b>26.490.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="PC Acer Aspire XC-885 (i5-8400/4G RAM/1TB HDD/DVDRW/WL/K+M/Dos) (DT.BAQSV.002)"
            >
              <img src="img/VANPHONG_AIO_MINI/PC_Acer_Aspire_XC_885.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="PC Acer Aspire XC-885 (i5-8400/4G RAM/1TB HDD/DVDRW/WL/K+M/Dos) (DT.BAQSV.002)"
              >
                PC Acer Aspire XC-885 (i5-8400/4G RAM/1TB HDD...
              </a>
              <br />
              <span className="span_price_up">12.000.000₫</span>
              <span className="span_price_down">
                <b>11.099.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="PC Dell OptiPlex 3070 Micro (i5-9500T/4GB RAM/500GB HDD/Fedora) (42OC370003)"
            >
              <img src="img/VANPHONG_AIO_MINI/PC_Dell_OptiPlex_3070_Micro.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="PC Dell OptiPlex 3070 Micro (i5-9500T/4GB RAM/500GB HDD/Fedora) (42OC370003)"
              >
                PC Dell OptiPlex 3070 Micro (i5-9500T/4GB RAM/500...
              </a>
              <br />
              <span className="span_price_up">12.999.000₫</span>
              <span className="span_price_down">
                <b>12.399.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Mini PC Asus PN60 (i3-8130U/WL/Vesa Mount/Com Port/Đen)"
            >
              <img src="img/VANPHONG_AIO_MINI/Mini_PC_Asus_PN60.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Mini PC Asus PN60 (i3-8130U/WL/Vesa Mount/Com Port/Đen)"
              >
                Mini PC Asus PN60 (i3-8130U/WL/Vesa Mount/Com...
              </a>
              <br />
              <span className="span_price_up">8.100.000₫</span>
              <span className="span_price_down">
                <b>7.999.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="PC Dell OptiPlex 3070 Micro (i5-9500T/4GB RAM/500GB HDD/Fedora) (42OC370003)"
            >
              <img src="img/VANPHONG_AIO_MINI/PC_Dell_OptiPlex_3070_Micro.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="PC Dell OptiPlex 3070 Micro (i5-9500T/4GB RAM/500GB HDD/Fedora) (42OC370003)"
              >
                PC Dell OptiPlex 3070 Micro (i5-9500T/4GB RAM/500...
              </a>
              <br />
              <span className="span_price_up">12.999.000₫</span>
              <span className="span_price_down">
                <b>12.399.000₫</b>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="module_products">
        <div className="product_title">
          <a href="DM_Laptop.html">
            <b>
              LAPTOP, MÁY TÍNH XÁCH TAY
              <span>
                <a href="DM_Laptop.html" className="span_product_title">
                  Xem tất cả
                  <i className="fas fa-angle-double-right"></i>
                </a>
              </span>
            </b>
          </a>
        </div>
        <div className="row">
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Laptop Apple Macbook Air MGN93 (MGN93SA/A)/ Silver/ M1 Chip/ RAM 8GB/ 256GB SSD/ 13.3 inch Retina/ Touch ID/ Mac OS/ 1 Yr"
            >
              <img src="img/LAPTOP/Laptop_Apple_Macbook_Air_MGN93.jpeg" />
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
              <img src="img/LAPTOP/Laptop_Asus_Vivobook_X515EA-EJ062T.png" />
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
              <img src="img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T.jpg" />
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
              <img src="img/LAPTOP/Laptop_Acer_Aspire_5_A514_54_540F.jpg" />
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
              <img src="img/LAPTOP/Laptop_ASUS_TUF_Gaming_F15_FX506LH_HN002T.jpg" />
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
              <img src="img/LAPTOP/Lenovo_Legion_Slim_7-15IMH5.png" />
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
      <section className="module_products">
        <div className="product_title">
          <a href="DM_ManHinh.html">
            <b>
              MÀN HÌNH
              <span>
                <a href="DM_ManHinh.html" className="span_product_title">
                  Xem tất cả
                  <i className="fas fa-angle-double-right"></i>
                </a>
              </span>
            </b>
          </a>
        </div>
        <div className="row">
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Màn hình thông minh Samsung LS32AM700UEXXV 32 inch 4K"
            >
              <img src="img/MANHINH/Samsung_LS32AM700UEXXV_32.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Màn hình thông minh Samsung LS32AM700UEXXV 32 inch 4K"
              >
                Màn hình thông minh Samsung LS32AM700UEX...
              </a>
              <br />
              <span className="span_price_up">10.990.000₫</span>
              <span className="span_price_down">
                <b>10.888.000đ</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Màn hình máy tính Dell Monitor S2421HN 23.8 Wide LED, Full HD 1920 x 1080, 2 x HDMI 1.4, 1 x 3.5mm Audio Out"
            >
              <img src="img/MANHINH/Dell_Monitor_S2421HN_23.8_Wide_LED.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Màn hình máy tính Dell Monitor S2421HN 23.8 Wide LED, Full HD 1920 x 1080, 2 x HDMI 1.4, 1 x 3.5mm Audio Out"
              >
                Màn hình máy tính Dell Monitor S2421HN 23.8...
              </a>
              <br />
              <span className="span_price_up">3.908.000₫</span>
              <span className="span_price_down">
                <b>3.750.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Màn hình LCD LG 29 inch Ultrawide 29WN600-W.ATV (2560 x 1080/IPS/75Hz"
            >
              <img src="img/MANHINH/LG_29_inch_Ultrawide_29WN600-W.ATV.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Màn hình LCD LG 29 inch Ultrawide 29WN600-W.ATV (2560 x 1080/IPS/75Hz"
              >
                Màn hình LCD LG 29 inch Ultrawide 29WN600-W...
              </a>
              <br />
              <span className="span_price_up">6.490.000₫</span>
              <span className="span_price_down">
                <b>6.190.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Màn hình máy tính ASUS ProArt PA278QV 27 inch 2K IPS - Chuyên đồ họa"
            >
              <img src="img/MANHINH/ASUS_ProArt_PA278QV_27.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Màn hình máy tính ASUS ProArt PA278QV 27 inch 2K IPS - Chuyên đồ họa"
              >
                Màn hình ASUS ProArt PA278QV 27 inch 2K IPS
              </a>
              <br />
              <span className="span_price_up">9.490.000₫</span>
              <span className="span_price_down">
                <b>8.990.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="MSI_Optix_MAG322CQRV.html"
              title="Màn hình máy tính MSI Optix MAG322CQRV Cong 2K 144Hz"
            >
              <img src="img/MANHINH/MSI_Optix_MAG322CQRV.png" />
            </a>
            <div className="text_product_1">
              <a
                href="MSI_Optix_MAG322CQRV.html"
                title="Màn hình máy tính MSI Optix MAG322CQRV Cong 2K 144Hz"
              >
                Màn hình máy tính MSI Optix MAG322CQRV Cong 2K...
              </a>
              <br />
              <span className="span_price_up">12.500.000₫</span>
              <span className="span_price_down">
                <b>12.150.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Màn hình thông minh Samsung LS32AM700UEXXV 32 inch 4K"
            >
              <img src="img/MANHINH/Samsung_LS32AM700UEXXV_32.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Màn hình thông minh Samsung LS32AM700UEXXV 32 inch 4K"
              >
                Màn hình thông minh Samsung LS32AM700UEX...
              </a>
              <br />
              <span className="span_price_up">10.990.000₫</span>
              <span className="span_price_down">
                <b>10.888.000đ</b>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="module_products">
        <div className="product_title">
          <a href="#">
            <b>
              LINH KIỆN MÁY TÍNH
              <span>
                <a href="#" className="span_product_title">
                  Xem tất cả
                  <i className="fas fa-angle-double-right"></i>
                </a>
              </span>
            </b>
          </a>
        </div>
        <div className="row">
          <div className="col-2 col-s-3 content">
            <a href="#" title="Tản Nhiệt Khí CoolerMaster Hyper 212 Spectrum">
              <img src="img/LINHKIEN/Cooler_Master_Hyper_212.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="Tản Nhiệt Khí CoolerMaster Hyper 212 Spectrum">
                Tản nhiệt Cooler Master Hyper 21...
              </a>
              <br />
              <span className="span_price_up">890.000₫</span>
              <span className="span_price_down">
                <b>690.000đ</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="RAM PNY XLR8 Gaming 8GB (1x8GB) DDR4 3200MHz">
              <img src="img/LINHKIEN/RAM_PNY_XLR8_GAMING.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="RAM PNY XLR8 Gaming 8GB (1x8GB) DDR4 3200MHz">
                RAM PNY XLR8 GAMING (8GB DD...
              </a>
              <br />
              <span className="span_price_up">1.390.000₫</span>
              <span className="span_price_down">
                <b>1.250.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="SSD Samsung 970 Evo Plus 500G M.2 NVMe 500GB">
              <img src="img/LINHKIEN/SSD_Samsung_970_Evo_Plus.png" />
            </a>
            <div className="text_product_1">
              <a href="#" title="SSD Samsung 970 Evo Plus 500G M.2 NVMe 500GB">
                SSD Samsung 970 Evo Plus 500G M...
              </a>
              <br />
              <span className="span_price_up">3.690.000₫</span>
              <span className="span_price_down">
                <b>2.890.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="GIGABYTE Z490 AORUS ELITE (rev. 1.0)">
              <img src="img/LINHKIEN/GIGABYTE_Z490_AORUS_ELITE.png" />
            </a>
            <div className="text_product_1">
              <a href="#" title="GIGABYTE Z490 AORUS ELITE (rev. 1.0)">
                GIGABYTE Z490 AORUS ELITE (rev. 1.0)
              </a>
              <br />
              <span className="span_price_up">6.190.000₫</span>
              <span className="span_price_down">
                <b>5.790.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Intel Core i7 10700 / 16MB / 2.9GHz / 8 Nhân 16 Luồng / LGA 1200"
            >
              <img src="img/LINHKIEN/Intel_Core_i7_10700.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Intel Core i7 10700 / 16MB / 2.9GHz / 8 Nhân 16 Luồng / LGA 1200"
              >
                Intel Core i7 10700 / 16MB / 2.9GHz / 8 Nhân...
              </a>
              <br />
              <span className="span_price_up">9.690.000₫</span>
              <span className="span_price_down">
                <b>8.490.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="RAM PNY XLR8 Gaming 8GB (1x8GB) DDR4 3200MHz">
              <img src="img/LINHKIEN/RAM_PNY_XLR8_GAMING.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="RAM PNY XLR8 Gaming 8GB (1x8GB) DDR4 3200MHz">
                RAM PNY XLR8 GAMING (8GB DDR4 1x8G...
              </a>
              <br />
              <span className="span_price_up">1.390.000₫</span>
              <span className="span_price_down">
                <b>1.250.000₫</b>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="module_products">
        <div className="product_title">
          <a href="#">
            <b>
              GAMING GEAR
              <span>
                <a href="#" className="span_product_title">
                  Xem tất cả
                  <i className="fas fa-angle-double-right"></i>
                </a>
              </span>
            </b>
          </a>
        </div>
        <div className="row">
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Bàn phím cơ E-DRA EK3104 Huano Red switch Version 2021"
            >
              <img src="img/GAMING_GEAR/E-DRA_EK3104.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Bàn phím cơ E-DRA EK3104 Huano Red switch Version 2021"
              >
                Bàn phím cơ E-DRA EK3104 Red...
              </a>
              <br />
              <span className="span_price_up">1.000.000₫</span>
              <span className="span_price_down">
                <b>745.000đ</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="Chuột Logitech G304 LIGHTSPEED Wireless">
              <img src="img/GAMING_GEAR/Logitech_G304.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="Chuột Logitech G304 LIGHTSPEED Wireless">
                Chuột Logitech G304 LIGHTSPEE...
              </a>
              <br />
              <span className="span_price_up">850.000₫</span>
              <span className="span_price_down">
                <b>795.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="Bàn phím cơ DareU EK145 Brown switch">
              <img src="img/GAMING_GEAR/DareU_EK145.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="Bàn phím cơ DareU EK145 Brown switch">
                Bàn phím cơ DareU EK145 Brown...
              </a>
              <br />
              <span className="span_price_up">650.000₫</span>
              <span className="span_price_down">
                <b>570.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="Tai Nghe Gaming DareU EH722s Đen">
              <img src="img/GAMING_GEAR/DareU_EH722s.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="Tai Nghe Gaming DareU EH722s Đen">
                Tai Nghe Gaming DareU EH722s Đen
              </a>
              <br />
              <span className="span_price_up">679.350₫</span>
              <span className="span_price_down">
                <b>647.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Tai nghe Gaming Logitech G733 LIGHTSPEED Wireless 7.1 RGB"
            >
              <img src="img/GAMING_GEAR/Logitech_G733_LIGHTSPEED_Wireless.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Tai nghe Gaming Logitech G733 LIGHTSPEED Wireless 7.1 RGB"
              >
                Tai nghe Gaming Logitech G733 LIGHTSPEED...
              </a>
              <br />
              <span className="span_price_up">4.200.000₫</span>
              <span className="span_price_down">
                <b>3.899.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a href="#" title="Chuột Logitech G304 LIGHTSPEED Wireless">
              <img src="img/GAMING_GEAR/Logitech_G304.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="Chuột Logitech G304 LIGHTSPEED Wireless">
                Chuột Logitech G304 LIGHTSPEE...
              </a>
              <br />
              <span className="span_price_up">850.000₫</span>
              <span className="span_price_down">
                <b>795.000₫</b>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="module_products">
        <div className="product_title">
          <a href="#">
            <b>
              PHỤ KIỆN LAPTOP, PC, KHÁC
              <span>
                <a href="#" className="span_product_title">
                  Xem tất cả
                  <i className="fas fa-angle-double-right"></i>
                </a>
              </span>
            </b>
          </a>
        </div>
        <div className="row">
          <div className="col-2 col-s-3 content">
            <a href="#" title="Capture Card AVerMedia Live Gamer 4K GC573">
              <img src="img/PHUKIEN/AVerMedia_Live_Gamer.jpg" />
            </a>
            <div className="text_product_1">
              <a href="#" title="Capture Card AVerMedia Live Gamer 4K GC573">
                Capture Card AVerMedia Live Gamer 4K GC573
              </a>
              <br />
              <span className="span_price_up">6.490.000₫</span>
              <span className="span_price_down">
                <b>5.990.000đ</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Cổng chuyển HYPERDRIVE DUO 7-IN-2 HDMI 4K60HZ WITH CABLE USB-C HUB - HD28C"
            >
              <img src="img/PHUKIEN/HYPERDRIVE_DUO_7-IN-2.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Cổng chuyển HYPERDRIVE DUO 7-IN-2 HDMI 4K60HZ WITH CABLE USB-C HUB - HD28C"
              >
                Cổng chuyển HYPERDRIVE DUO 7-IN-2 HDMI...
              </a>
              <br />
              <span className="span_price_up">2.700.000₫</span>
              <span className="span_price_down">
                <b>2.590.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Khay lắp ổ cứng SSD cho laptop qua khay CD (Loại mỏng)"
            >
              <img src="img/PHUKIEN/Khay_Lap_O_Cung_SSD.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Khay lắp ổ cứng SSD cho laptop qua khay CD (Loại mỏng)"
              >
                Khay lắp ổ cứng SSD cho laptop qua khay CD...
              </a>
              <br />
              <span className="span_price_up">199.000₫</span>
              <span className="span_price_down">
                <b>129.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Sạc Laptop Dell 19.5V-4.62A 90W Chân kim to, củ hình chữ nhật"
            >
              <img src="img/PHUKIEN/Sac_Laptop_Dell_19.5V.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Sạc Laptop Dell 19.5V-4.62A 90W Chân kim to, củ hình chữ nhật"
              >
                Sạc Laptop Dell 19.5V-4.62A 90W Chân kim to,...
              </a>
              <br />
              <span className="span_price_up">300.000₫</span>
              <span className="span_price_down">
                <b>249.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Cổng chuyển HyperDrive 4K HDMI 3-in-1 USB-C Hub - HD259A"
            >
              <img src="img/PHUKIEN/HyperDrive_4K_HDMI_3-in-1.png" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Cổng chuyển HyperDrive 4K HDMI 3-in-1 USB-C Hub - HD259A"
              >
                Cổng chuyển HyperDrive 4K HDMI 3-in-1 USB...
              </a>
              <br />
              <span className="span_price_up">1.400.000₫</span>
              <span className="span_price_down">
                <b>1.290.000₫</b>
              </span>
            </div>
          </div>
          <div className="col-2 col-s-3 content">
            <a
              href="#"
              title="Cổng chuyển HYPERDRIVE DUO 7-IN-2 HDMI 4K60HZ WITH CABLE USB-C HUB - HD28C"
            >
              <img src="img/PHUKIEN/HYPERDRIVE_DUO_7-IN-2.jpg" />
            </a>
            <div className="text_product_1">
              <a
                href="#"
                title="Cổng chuyển HYPERDRIVE DUO 7-IN-2 HDMI 4K60HZ WITH CABLE USB-C HUB - HD28C"
              >
                Cổng chuyển HYPERDRIVE DUO 7-IN-2 HDMI...
              </a>
              <br />
              <span className="span_price_up">2.700.000₫</span>
              <span className="span_price_down">
                <b>2.590.000₫</b>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
