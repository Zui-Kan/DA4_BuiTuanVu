import "../style/topic.css";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { apiGetForum } from "../services/topic.service";
import { Loading } from "../Components/Loading/Loading";
import { Link } from "react-router-dom";
import { uploads } from "../constant/api";

const Forum = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadData = async () => {
    const res = await apiGetForum();
    if (res?.status_code === 200) {
      setData(res);
      setIsLoading(true);
    } else {
      setIsLoading(true);
      console.error("Lỗi không load được data");
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  if (!isLoading) {
    return <Loading></Loading>;
  }
  console.log(data);
  return (
    <>
      <div className="main_topics">
        {/* START--------------------------------------------------------------------------------------Chủ đề  */}{" "}
        <div id="chudes">
          <div className="chude-tieude">
            <h1>Diễn đàn</h1>
          </div>
          <div className="cards-chude">
            {/* 1 */}
            {data?.data?.chude.map((item) => (
              <div className="card-chude">
                <Link to={`/topic/${item.chude.MaChuDe}`}>
                  <img src={uploads() + item.chude.HinhAnhChuDe} />
                  <div className="card-noidung">
                    <div className="topic-tieude-card">
                      {item.chude.TenChuDe}
                    </div>
                    <div className="card-chude_tuongtac">
                      {item.tongSoBaiVietChuDe} Bài viết |{" "}
                      {item.tongBinhLuanChuDe} Bình luận
                    </div>
                  </div>
                </Link>
              </div>
            ))}
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
                    onClick={() => setOpen(true)}
                    defaultValue="Tạo bài viết"
                  />
                </div>

                <div className="tieude-baiviets_trai chinhsualink">
                  <button
                    type="submit"
                    className="btn_hienthibaiviettheoaz btn_hienthitheoaz"
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
                </div>
              </div>
              <div
                className="list_baiviets"
                ng-repeat="P in listPosts track by P.iD_Post"
              >
                <hr />
                {/* bài viết 1 */}
                {data?.data?.baiviet.map((item) => (
                  <Link
                    href="./Bài viết.html"
                    to={`/post/${item.baiviet.MaBaiViet}`}
                    className="linkbaiviet"
                  >
                    <img
                      className="avt-baiviet"
                      src={uploads() + item.ctuser.AnhDaiDien}
                      alt=""
                    />
                    <div className="tieudes-baiviet">
                      <div className="tieudechinh-baiviet">
                        {" "}
                        {item.baiviet.TieuDe}
                      </div>
                      <div className="tacgia">{item.ctuser.HoVaTen}</div>
                      <div className="thoigiandang">{item.baiviet.NgayTao}</div>
                    </div>
                    <div className="list_binhluan binhluan">
                      <div className="view-binhluan">{item.soBinhLuan}</div>
                      <h3>Bình luận</h3>
                    </div>
                  </Link>
                ))}
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
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default Forum;
