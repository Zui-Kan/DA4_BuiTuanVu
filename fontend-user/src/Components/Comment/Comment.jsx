import "./Comment.css";
import { uploads } from "../../constant/api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import { apiDeleteBinhLuan } from "../../services/detail.service";
import { formatDatetime } from "../../shares/format";

export function Comment({
  maBinhLuan,
  anhDaiDien,
  hoTen,
  thoiGian,
  noiDung,
  deleteBinhLuan,
  handleDeleteBinhLuan,
  loadData,
  profile,
  taiKhoanID,
}) {
  const [messageApi, contextHolder] = message.useMessage();

  const onDeleteComment = async () => {
    const response = await apiDeleteBinhLuan(maBinhLuan);
    if (response && response.status_code === 200) {
      messageApi.open({
        type: "success",
        content: "Bình luận đã được xóa.",
      });
      setTimeout(() => {
        loadData();
      }, 1000);
    } else {
      messageApi.open({
        type: "error",
        content: "Có lỗi xảy ra. Vui lòng thử lại.",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="binhluan-card">
        <div className="card-control_user">
          <div className="comment-card_user">
            <a href="#" className="user-img">
              <img src={`${uploads()}${anhDaiDien}`} alt="hi" />
            </a>
            <a href="#" className="user-name">
              {hoTen}
            </a>
            <div className="user-datetime"> {thoiGian}</div>
          </div>

          <div className="card-control">
            {taiKhoanID === profile.id && ( // Chỉ hiển thị nút xoá nếu taiKhoanID trùng khớp với profile.id
              <button type="button" onClick={handleDeleteBinhLuan}>
                •••
              </button>
            )}
            {deleteBinhLuan && (
              <Popconfirm
                title="Xoá bình luận"
                description="Bạn có chắc muốn xoá?"
                onConfirm={onDeleteComment}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
              >
                <button className="delete-comment">Xoá</button>
              </Popconfirm>
            )}
          </div>
        </div>

        <div className="card-comment"> {noiDung}</div>
      </div>
    </>
  );
}
