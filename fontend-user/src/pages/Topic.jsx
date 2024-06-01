import "../style/topic.css";

const Topic = () => {
  return (
    <>
      <div className="main_topics">
        {/* START--------------------------------------------------------------------------------------Chủ đề  */}{" "}
        <div id="chudes">
          <div className="khung-chude" width="100%">
            <img
              src="https://cmu-cdn.vinfast.vn/2024/05/daa69985-vf-7.jpg"
              height="30px"
            />
            <div className="card-noidung">
              <div className="tieude-khung-chude">Tiêu đề</div>
              <div className="khung-chude_tuongtac">
                1.8k Chủ đề | 13.3K Trả lời
              </div>
            </div>
          </div>
          {/* Chủ đề- diễn đàn -------------------------------------------------------------START */}
          <div className="chude-diendans">
            <div className="baiviets">
              <div className="tieude-baiviets">
                <div className="taobaiviet">
                  <img src="../IMAGE/logo4.png" alt="" />
                  <input
                    id="btn_taobaiviet"
                    type="button"
                    defaultValue="Tạo bài viết"
                  />
                </div>

                <div className="tieude-baiviets_trai chinhsualink">
                  <button
                    type="submit"
                    className="btn_hienthibaiviettheoaz btn_hienthitheoaz"
                    ng-click="search_desc_and_asc()"
                    style={{ color: "#464646" }}
                  >
                    BÀI VIẾT
                  </button>
                </div>
                <div className="tieude-baiviets_phai ">
                  {/* Bình luận */}
                  <button
                    type="submit"
                    className="btn_hienthibinhluantheoaz btn_hienthitheoaz"
                    ng-click="search_binhluan_desc_and_asc()"
                    style={{ color: "#464646" }}
                  >
                    BÌNH LUẬN
                  </button>
                  {/* lượt thích */}
                  <button
                    type="submit"
                    className="btn_hienthithichtheoaz btn_hienthitheoaz"
                    ng-click="search_luotthich_desc_and_asc()"
                    style={{ color: "#464646" }}
                  >
                    LƯỢT THÍCH
                  </button>
                </div>
              </div>
              <div
                className="list_baiviets"
                ng-repeat="P in listPosts track by P.iD_Post"
              >
                <hr />
                {/* bài viết 1 */}
                <a href="./Bài viết.html" className="linkbaiviet">
                  <img
                    className="avt-baiviet"
                    src="../IMAGE/logo4.png"
                    alt=""
                  />
                  <div className="tieudes-baiviet">
                    <div className="tieudechinh-baiviet"> Tiêu đề bài viết</div>
                    <div className="tacgia">Người dùng</div>
                    <div className="thoigiandang"> 28/10 lúc 10h </div>
                  </div>
                  <div className="list_binhluan binhluan">
                    <div className="view-binhluan">30</div>
                    <h3>Bình luận</h3>
                  </div>
                  <div className="list_thich binhluan">
                    <div className="view-binhluan">20</div>
                    <h3>Lượt thích</h3>
                  </div>
                </a>
              </div>
              <div className="khung_chucnangxemthem">
                <button id="btn_xemthem_baiviet" ng-click="btn_xemthem()">
                  Xem Thêm
                </button>
              </div>
            </div>
            <div className="quangcao-trangchude">
              <div className="quangcao-hinhanh1">
                <img
                  src="https://cmu-cdn.vinfast.vn/2023/10/d1694c46-microsoftteams-image-1-768x1024.jpg"
                  alt="#"
                />
              </div>
            </div>
          </div>
          {/* END--------------------------------------------------------------------------------------Chủ đề  */}{" "}
        </div>
      </div>
    </>
  );
};

export default Topic;
