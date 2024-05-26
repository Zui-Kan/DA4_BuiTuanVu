import "./Comment.css";
import { uploads } from "../../constant/api";
export function Comment(props) {
  return (
    <>
      <div className="binhluan-card">
        <div className="card-control_user">
          <div className="comment-card_user">
            <a href="#" className="user-img">
              <img src={`${uploads()}${props.anhDaiDien}`} alt="hi" />
            </a>
            <a href="#" className="user-name">
              {props.hoTen}
            </a>
            <div className="user-datetime"> {props.thoiGian}</div>
          </div>

          <div className="card-control">
            <button type="submit">- - -</button>
            <div className="delete-comment">Xoá</div>
          </div>
        </div>

        <div className="card-comment"> {props.noiDung}</div>
      </div>
    </>
  );
}
