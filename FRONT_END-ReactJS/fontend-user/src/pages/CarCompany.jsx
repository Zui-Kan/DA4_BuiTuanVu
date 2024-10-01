import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BoxSum } from "../Components/BoxSum/BoxSum";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "../style/Category.css";
import {
  getBoLocCarCompany,
  getLoaiXe,
  getNamSanXuat,
  getNhienLieu,
} from "../services/category.service";
import { formatPrice } from "../shares/format";
import { Loading } from "../Components/Loading/Loading";
import CardCar from "../Components/CardCar";

function CarCompany(props) {
  document.title = "Hãng xe";

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBrands, setShowBrands] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [showFuels, setShowFuels] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedLoaiXe, setSelectedLoaiXe] = useState([]);
  const [selectedNamSanXuat, setSelectedNamSanXuat] = useState([]);
  const [selectedNhienLieu, setSelectedNhienLieu] = useState([]);
  const [search, setSearch] = useState("");

  async function loadData(id, currentPage, filters = {}) {
    setIsLoading(true);

    const [boLoc, loaiXe, namSanXuat, nhienLieu] = await Promise.all([
      getBoLocCarCompany(id, currentPage, filters),
      getLoaiXe(),
      getNamSanXuat(),
      getNhienLieu(),
    ]);

    setData({ boLoc, loaiXe, namSanXuat, nhienLieu });
    setIsDataLoaded(true);
    setIsLoading(false);
  }

  useEffect(() => {
    loadData(id, currentPage);
  }, [id, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    const filters = {
      min_price: minPrice,
      max_price: maxPrice,
      maloaixe: selectedLoaiXe.join(","),
      namsanxuat: selectedNamSanXuat.join(","),
      nhienlieu: selectedNhienLieu.join(","),
      timkiem: search,
    };
    loadData(id, 1, filters);
  };

  const handleLoaiXeChange = (event) => {
    const value = event.target.value;
    setSelectedLoaiXe((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  const handleNhienLieuChange = (event) => {
    const value = event.target.value;
    setSelectedNhienLieu((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  const handleNamSanXuatChange = (event) => {
    const value = event.target.value;
    setSelectedNamSanXuat((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((item) => item !== value)
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleFilterChange();
    }
  };
  if (!isDataLoaded) {
    return <Loading />;
  }

  return (
    <>
      <main>
        <div className="listCar">
          <div className="title-listCar">HÃNG XE → {data.boLoc.tenhang}</div>
          <hr />
          <div className="row">
            <div className="col-3">
              <div className="filters">
                <div className="filter-title blueDark-c">BỘ LỌC</div>

                <div className="row filter-row">
                  <div className="col-1">
                    <img
                      src="https://www.carmudi.vn/images/xe-oto/svg/price.svg"
                      alt=""
                    />
                  </div>
                  <div className="col-9 blueDark-c">Giá</div>
                </div>

                <div className="fillter-price">
                  <div className="price-inps">
                    <input
                      type="number"
                      placeholder="Tối thiểu 100 triệu"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <div>-</div>
                    <input
                      type="number"
                      placeholder="Tối đa"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                  <div className="price-suggest">
                    <button
                      className="btn-price_suggest"
                      onClick={() => {
                        setMinPrice(300000000);
                        setMaxPrice(500000000);
                      }}
                    >
                      300 triệu - 500 triệu
                    </button>
                    <button
                      className="btn-price_suggest"
                      onClick={() => {
                        setMinPrice(500000000);
                        setMaxPrice(1000000000);
                      }}
                    >
                      500 triệu - 1 tỷ
                    </button>
                    <button
                      className="btn-price_suggest"
                      onClick={() => {
                        setMinPrice(1000000000);
                        setMaxPrice(2000000000);
                      }}
                    >
                      1 tỷ - 2 tỷ
                    </button>
                  </div>
                </div>

                <div
                  className="row filter-row setShowBrand"
                  onClick={() => setShowBrands(!showBrands)}
                >
                  <div className="col-1">
                    <img
                      src="https://www.carmudi.vn/images/xe-oto/svg/bodyType.svg"
                      alt=""
                    />
                  </div>
                  <div className="col-9 blueDark-c">Dòng xe</div>
                  <div className="col-1">
                    {showBrands ? (
                      <img src="../IMAGE/icons8_chevron_up.svg" alt="" />
                    ) : (
                      <img src="../IMAGE/icons8_chevron_down.svg" alt="" />
                    )}
                  </div>
                </div>

                {showBrands && (
                  <div className="filter-brands">
                    {data?.loaiXe?.data.map((item) => (
                      <div className="row filter-sub" key={item.MaLoaiXe}>
                        <div className="col-1">
                          <label className="custom-checkbox">
                            <input
                              name={item.TenLoaiXe}
                              type="checkbox"
                              value={item.MaLoaiXe}
                              onChange={handleLoaiXeChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <div className="col blueDark-c">{item.TenLoaiXe}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="row filter-row setShowyear"
                  onClick={() => setShowYears(!showYears)}
                >
                  <div className="col-1">
                    <img
                      src="https://www.carmudi.vn/images/xe-oto/svg/year.svg"
                      alt=""
                    />
                  </div>
                  <div className="col-9 blueDark-c">NĂM SẢN XUẤT</div>
                  <div className="col-1">
                    {showYears ? (
                      <img src="../IMAGE/icons8_chevron_up.svg" alt="" />
                    ) : (
                      <img src="../IMAGE/icons8_chevron_down.svg" alt="" />
                    )}
                  </div>
                </div>

                {showYears && (
                  <div className="filter-years">
                    {data?.namSanXuat?.data.map((year) => (
                      <div className="row filter-sub" key={year}>
                        <div className="col-1">
                          <label className="custom-checkbox">
                            <input
                              name="nam"
                              type="checkbox"
                              value={year}
                              onChange={handleNamSanXuatChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <div className="col blueDark-c">{year}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="row filter-row setShowyear"
                  onClick={() => setShowFuels(!showFuels)}
                >
                  <div className="col-1">
                    <img src="../IMAGE/icon_card_xang.svg" alt=""></img>
                  </div>
                  <div className="col-9 blueDark-c">NHIÊN LIỆU</div>
                  <div className="col-1">
                    {showFuels ? (
                      <img src="../IMAGE/icons8_chevron_up.svg" alt="" />
                    ) : (
                      <img src="../IMAGE/icons8_chevron_down.svg" alt="" />
                    )}
                  </div>
                </div>
                {showFuels && (
                  <div className="filter-years">
                    {data?.nhienLieu?.data.map((nhienlieu) => (
                      <div className="row filter-sub" key={nhienlieu}>
                        <div className="col-1">
                          <label className="custom-checkbox">
                            <input
                              name="nam"
                              type="checkbox"
                              value={nhienlieu}
                              onChange={handleNhienLieuChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <div className="col blueDark-c">{nhienlieu}</div>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  className="btn-price_filter"
                  onClick={handleFilterChange}
                >
                  {isLoading ? "Đang lọc..." : "Lọc"}
                </button>
              </div>

              <div className="advertise"></div>
            </div>

            <div className="col-9">
              <div className="timkiems">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 30 30"
                >
                  <path
                    d="M13 3C7.4889971 3 3 7.4889971 3 13C3 18.511003 7.4889971 23 13 23C15.396508 23 17.597385 22.148986 19.322266 20.736328L25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969L20.736328 19.322266C22.148986 17.597385 23 15.396508 23 13C23 7.4889971 18.511003 3 13 3 z M 13 5C17.430123 5 21 8.5698774 21 13C21 17.430123 17.430123 21 13 21C8.5698774 21 5 17.430123 5 13C5 8.5698774 8.5698774 5 13 5 z"
                    fill="#2D2B2D"
                  />
                </svg>
                <input
                  type="text"
                  name="timkiem"
                  id="edt_timkiem_trangchu_muaxe"
                  placeholder="Tìm kiếm theo tên xe"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="row">
                {data?.boLoc.status_code === 200 ? (
                  data?.boLoc.data?.data.map((item) => (
                    <CardCar
                      key={item.MaModel}
                      className={"col-4"}
                      maModel={item.MaModel}
                      hinhAnhXe={item.HinhAnhXe}
                      tenModel={item.TenModel}
                      namSanXuat={item.NamSanXuat}
                      nhienLieuTieuThu100KM={item.L100}
                      loaiNhienLieu={item.NhienLieu}
                      hopSo={item.HopSo}
                      gia={formatPrice(item.Gia)}
                    />
                  ))
                ) : (
                  <div className="div">{data?.boLoc.message}</div>
                )}
              </div>
              <BoxSum
                currentPage={currentPage}
                totalPages={data.boLoc.data.last_page}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CarCompany;
