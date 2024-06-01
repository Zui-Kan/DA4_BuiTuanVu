import "../style/post.css";

const Post = () => {
  return (
    <>
      <div className="main_post">
        <div className="posts">
          <div className="main-left">
            <a href="#" className="tenchude">
              Tên chủ đề
            </a>
            <h1 className="tieudebaiviet">Đây là tiêu đề bài viết</h1>
            <div className="USER">
              <a href="#" className="user-avt">
                <img src="/IMAGE/oto/3.jpg" alt="Lỗi r" />
              </a>
              <div className="chitiet-name">
                <div className="xuongdong">
                  <a href className="user-name">
                    {" "}
                    Người dùng đăng bài{" "}
                  </a>
                </div>
                <div className="user-quyenvadiem">
                  <span
                    title="Thành viên"
                    className="gamipress-bbpress-rank-thumbnail gamipress-bbpress-vf-community_member-thumbnail"
                  >
                    <img
                      width={25}
                      height={25}
                      src="https://cmu-cdn.vinfast.vn/2022/08/ddae6ee5-member-50x50.png"
                      className="gamipress-rank-thumbnail wp-post-image wp-stateless-item"
                      alt=""
                      decoding="async"
                      loading="lazy"
                      srcSet="
                https://cmu-cdn.vinfast.vn/2022/08/ddae6ee5-member-50x50.png    50w,
                https://cmu-cdn.vinfast.vn/2022/08/ddae6ee5-member-150x150.png 150w,
                https://cmu-cdn.vinfast.vn/2022/08/ddae6ee5-member-100x100.png 100w,
                https://cmu-cdn.vinfast.vn/2022/08/ddae6ee5-member.png         240w
              "
                      sizes="(max-width: 25px) 100vw, 25px"
                      data-image-size="25x25"
                      data-stateless-media-bucket="prod-vinfast-vn-cmu-data"
                      data-stateless-media-name="2022/08/ddae6ee5-member.png"
                    />{" "}
                  </span>
                  Thành viên
                </div>
                <div className="user-quyenvadiem">
                  <span className="gamipress-bbpress-points-thumbnail gamipress-bbpress-vf-point-thumbnail">
                    <img
                      width={25}
                      height={25}
                      src="https://storage.googleapis.com/dev-vinfast-vn-cmu-data/2022/08/3587b7ca-point1-50x50.png"
                      className="gamipress-points-thumbnail wp-post-image wp-stateless-item"
                      alt=""
                      decoding="async"
                      loading="lazy"
                      srcSet="
                https://storage.googleapis.com/dev-vinfast-vn-cmu-data/2022/08/3587b7ca-point1-50x50.png 50w,
                https://storage.googleapis.com/dev-vinfast-vn-cmu-data/2022/08/3587b7ca-point1.png       80w
              "
                      sizes="(max-width: 25px) 100vw, 25px"
                      data-image-size="25x25"
                      data-stateless-media-bucket="dev-vinfast-vn-cmu-data"
                      data-stateless-media-name="2022/08/3587b7ca-point1.png"
                    />{" "}
                  </span>
                  25 VF Points
                </div>
              </div>
              <div className="class" />
              <div className="khungtimedangbai">
                <div className="timedangbai">10/20/2024 lúc 20:30</div>
              </div>
            </div>
            <div className="khung_chitietbaiviet">
              <p className="noidungbaiviet">Đây là nội dung bài viết</p>
            </div>
            <div className="hastags">
              <div className="iconhastag">
                <img src="/IMAGE/Posts/icon_hastag.svg" />
              </div>
              <div className="hastag-cha">
                <a href="#" className="hastag">
                  #Luxa2.0
                </a>
                <a href="#" className="hastag">
                  #Luxa2.0
                </a>
                <a href="#" className="hastag">
                  #Luxa2.0
                </a>
                <a href="#" className="hastag">
                  #Luxa2.0
                </a>
                <a href="#" className="hastag">
                  #Luxa2.0
                </a>
                <a href="#" className="hastag">
                  #Luxa2.0
                </a>
              </div>
            </div>
            <hr />
            <h1 className="tieudebaiviet">Bình luận</h1>
            <div className="user-binhluan">
              <div className="form-group">
                <textarea
                  id="edt_binhluanbaiviet"
                  className="nhapnoidungvabinhluan"
                  rows={2}
                  oninput="autoExpand(this)"
                  placeholder="Điền nội dung bình luận..."
                  defaultValue={""}
                />
              </div>
              <button
                type="submit"
                ng-click="btn_binhluanbaiviet()"
                id="btn-binhluanbaiviet"
              >
                Bình luận
              </button>
            </div>
            <div className="khung_binhluan_posts">
              <div id="user-dabinhluans">
                <div className="user-dabinhluan">
                  <div className="khung_user_dabinhluan">
                    <div className="user-thongtin">
                      <a href="#" className="user-avt">
                        <img src="/IMAGE/oto/2.jpg" alt="Lỗi r" />
                      </a>
                      <a href="#" className="user-name">
                        Khang
                      </a>
                      <div className="user-quyenvadiem">
                        <span
                          title="Thành viên"
                          className="gamipress-bbpress-rank-thumbnail gamipress-bbpress-vf-community_member-thumbnail"
                        >
                          <img
                            width={25}
                            height={25}
                            src="https://cmu-cdn.vinfast.vn/2022/08/ddae6ee5-member-50x50.png"
                            className="gamipress-rank-thumbnail wp-post-image wp-stateless-item"
                            alt=""
                            decoding="async"
                            loading="lazy"
                            srcSet="
                      https://cmu-cdn.vinfast.vn/2022/08/ddae6ee5-member-50x50.png    50w,
                      https://cmu-cdn.vinfast.vn/2022/08/ddae6ee5-member-150x150.png 150w,
                      https://cmu-cdn.vinfast.vn/2022/08/ddae6ee5-member-100x100.png 100w,
                      https://cmu-cdn.vinfast.vn/2022/08/ddae6ee5-member.png         240w
                    "
                            sizes="(max-width: 25px) 100vw, 25px"
                            data-image-size="25x25"
                            data-stateless-media-bucket="prod-vinfast-vn-cmu-data"
                            data-stateless-media-name="2022/08/ddae6ee5-member.png"
                          />
                        </span>
                        Thành viên
                      </div>
                      <div id="timedangbai">02/10/2024 lúc 18:30</div>
                    </div>
                    <div
                      className="user-chucnang-dabinhluan"
                      ng-if="c.iD_User == _user.iD_User"
                    >
                      <button
                        ng-click="btn_chucnang_dabinhluan($index)"
                        id="btn_chucnang_dabinhluan"
                        type="submit"
                      >
                        <img
                          width="20px"
                          height="20px"
                          src="/IMAGE/Posts/icon_3dots.svg"
                          alt=""
                        />
                      </button>
                      <div className="from_chucnang_dabinhluan">
                        <button id="btn_chucnang_xoa_dabinhluan">Xoá</button>
                      </div>
                    </div>
                  </div>
                  <p id="noidungbinhluan">Hi đây là nội dung bình luận</p>
                </div>
              </div>
            </div>
          </div>
          <div className="main-right">
            <div className="quangcao-hinhanh1">
              <img
                width="100%"
                src="https://cmu-cdn.vinfast.vn/2023/10/d1694c46-microsoftteams-image-1-768x1024.jpg"
                alt="#"
              />
            </div>
            <div className="quangcao-trangchude" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
