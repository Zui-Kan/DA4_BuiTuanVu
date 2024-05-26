import { useEffect, useState } from "react";
import "../assets/css/style_category.css";
import { Link, useSearchParams } from "react-router-dom";
import { getList } from "../services/list.services";
import ReactPaginate from "react-paginate";
import { useRecoilState } from "recoil";
import { cartState } from "../constant/recoil";
import { addToCart } from "../utils/cart";
const Search = function () {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setDatas] = useState([]);
  const [cart, setCart] = useRecoilState(cartState);
  const [pageCount, setPageCount] = useState(0);
  const handlePageClick = (event: any) => {
    searchParams.set("page", event.selected + 1);
    setSearchParams(searchParams);
  };
  const changeInputValue = (e: any) => {
    searchParams.set("pageSize", e.target.value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const search_content = searchParams.get("search_content") || "";
    const page = searchParams.get("page") || '1';
    const pageSize = searchParams.get("pageSize") || '6';

    searchParams.set('page', page);
    searchParams.set('pageSize', pageSize);
    setSearchParams(searchParams);

    async function loadData() {
      let items = await getList({
        page: page,
        pageSize: pageSize,
        TenSanPham: search_content,
      });
      setDatas(items.data);
      setPageCount(Math.ceil(items.totalItems / +pageSize));
    }
    loadData();
  }, [searchParams]);
  return (
    <>
      <section className="main-out">
        <div className="main">
          <div className="box-inner">
            <div className="box-left">Sắp xếp theo</div>
            <div className="box-right">
              <div className="name">Khuyến mại tốt nhất</div>
              <div className="name">Bán chạy</div>
              <div className="name">Mới về</div>
              <div className="name">Giá giảm dần</div>
              <div className="name">Giá tăng dần</div>
              <div className="price">
                <input type="text" id="pricedown" placeholder="Giá thấp nhất" />{" "}
                -
                <input type="text" id="priceup" placeholder="Giá cao nhất" />
                <button>Lọc</button>
              </div>
            </div>
          </div>
          <div className="box-bottom">
            <div className="row">
              {" "}
              {data.map((x: any) => (
                <div className="col-2 col-s-3 content">
                  <a
                    href="#"
                    title="Laptop Apple Macbook Air MGN93 (MGN93SA/A)/ Silver/ M1 Chip/ RAM 8GB/ 256GB SSD/ 13.3 inch Retina/ Touch ID/ Mac OS/ 1 Yr"
                  >
                    <img src="../img/LAPTOP/Laptop_Apple_Macbook_Air_MGN93.jpeg" />
                  </a>
                  <div className="text_product_1">
                    <Link
                      to={"/detail/" + x.maSanPham}
                      title="Laptop Apple Macbook Air MGN93 (MGN93SA/A)/ Silver/ M1 Chip/ RAM 8GB/ 256GB SSD/ 13.3 inch Retina/ Touch ID/ Mac OS/ 1 Yr"
                    >
                      {x.tenSanPham}
                    </Link>
                    <br />
                    <span className="span_price_up">28.990.000₫</span>
                    <span className="span_price_down">
                      <b>28.590.000đ</b>
                    </span>
                    <button
                      type="button"
                      className="btnAdd"
                      onClick={() => {
                        addToCart(x);
                        let list = JSON.parse(
                          localStorage.getItem("cart") || "[]"
                        );
                        setCart(list);
                      }}
                    >
                      <i className="fas fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="page">
        <select
          name="pageSize"
          onChange={(e) => changeInputValue(e)} >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="18">18</option>
          <option value="24">24</option>
        </select>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
        />
      </section>
    </>
  );
};
export default Search;
