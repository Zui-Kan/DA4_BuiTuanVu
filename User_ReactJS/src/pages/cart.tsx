import { useEffect, useState } from "react";
import "../assets/css/style_pay.css";
import { useForm } from "react-hook-form";
import { createOrder } from "../services/cart.services";
const Cart = function () {
  const [cart, setCart] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all"
  });

  const onSubmit = async (data: any) => {
    let obj: any = {};
    obj.khach = data;
    obj.listchitiet = [];
    let list = JSON.parse(localStorage.getItem("cart") || "[]");
    for (let x of list) {
      obj.listchitiet.push({
        maSanPham: x.maSanPham,
        soLuong: x.quantity,
        giaMua: 1,
        maDonHangNavigation:{}
      });
    }
    await createOrder(obj);
    alert("Submit form success");
  };

  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(list);
  }, []);
  return (
    <>
      <section className="main">
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <div className="row">
            <div className="col-8 col-s-12 padding-form">
              <div className="title">THÔNG TIN THANH TOÁN</div>
              <div className="note">
                (<span>*</span>) Bắt buộc
              </div>

              <div className="row">
                <div className="col-12 col-s-12">
                  <label htmlFor="txt_hoten">
                    Họ tên: <span>*</span>  {errors.tenKhachHang && <span style={{color:'red'}}>{(errors as any).tenKhachHang.message}</span>}
                  </label>
                  <br />
                  <input
                    type="text"
                    id="txt_hoten"
                    style={{ width: "100%" }}
                    {...register("tenKhachHang",{
                      required: "Tên khách không được để rỗng.",
                      minLength: {
                        value: 3,
                        message: "Độ dài Họ tên tối thiểu phải 3 ký tự."
                      }})}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-s-12">
                  <label htmlFor="txt_sdt">
                    Số điện thoại: <span>*</span> {errors.soDienThoai && <span style={{color:'red'}}>{(errors as any).soDienThoai.message}</span>}
                  </label>
                  <br />
                  <input
                    type="text"
                    id="txt_sdt"
                    style={{ width: "100%" }}
                    {...register("soDienThoai",{
                      required: "Số điện thoại không được để rỗng.",
                      pattern: {
                        value: /^[0-9 _-]{10,12}/,
                        message: "Sai định dạng số điện thoại.",
                      }})}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-s-12">
                  <label htmlFor="txt_email">Email: {errors.email && <span style={{color:'red'}}>{(errors as any).email.message}</span>}
                  </label>
                  <br />
                  <input
                    type="text"
                    id="txt_email"
                    style={{ width: "100%" }}
                    {...register("email",{
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Sai định dạng email.",
                      }})}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-s-12">
                  <label htmlFor="txt_diachi">
                    Địa chỉ: <span>*</span> {errors.diaChi && <span style={{color:'red'}}>{(errors as any).diaChi.message}</span>}
                  </label>
                  <br />
                  <textarea
                    {...register("diaChi",{
                      required: "Địa chỉ không được để rỗng."})}
                    id="txt_diachi"
                    style={{ width: "100%" }}
                    rows={3}
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-s-12">
                  <label htmlFor="txt_ghichu">Ghi chú:</label>
                  <br />
                  <textarea
                    id="txt_ghichu"
                    style={{ width: "100%" }}
                    rows={3}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-4 col-s-12 padding-form">
              <div className="title">ĐƠN HÀNG</div>
              <div
                className="row pay"
                style={{ borderBottom: "3px solid #dbdbdb" }}
              >
                <div className="col-6 col-s-12" style={{ textAlign: "left" }}>
                  <label>Sản phẩm</label>
                </div>
                <div className="col-6 col-s-12" style={{ textAlign: "right" }}>
                  <label>Số lượng</label>
                </div>
              </div>
              {cart.map((x: any) => (
                <div className="row pay">
                  <div className="col-6 col-s-12" style={{ textAlign: "left" }}>
                    <label> {x.tenSanPham}</label>
                  </div>
                  <div
                    className="col-6 col-s-12"
                    style={{ textAlign: "right" }}
                  >
                    <label>{x.quantity}</label>
                  </div>
                </div>
              ))}

              <div className="row trace">
                <div className="col-6 col-s-12" style={{ textAlign: "left" }}>
                  <label>Tổng</label>
                </div>
                <div className="col-6 col-s-12" style={{ textAlign: "right" }}>
                  <label>
                    {cart.reduce(
                      (sum: number, current: any) => sum + current.quantity,
                      0
                    )}
                  </label>{" "}
                  SP
                </div>
              </div>
              <div className="row pay">
                <div className="col-12 col-s-12" style={{ textAlign: "left" }}>
                  <button type="submit">ĐẶT HÀNG</button>
                </div>
              </div>
              <div className="row pay">
                <div className="payments">
                  <input
                    type="radio"
                    id="tienmat"
                    name="payments"
                    value="tm"
                    className="radio-payments"
                  />
                  <label htmlFor="tienmat" className="label-payments">
                    Thanh toán tiền mặt khi nhận hàng (tiền mặt / quẹt thẻ ATM,
                    Visa, Master)
                  </label>
                </div>
                <div className="payments">
                  <input
                    type="radio"
                    id="chuyenkhoan"
                    name="payments"
                    value="ck"
                    className="radio-payments"
                  />
                  <label htmlFor="chuyenkhoan" className="label-payments">
                    Thanh toán qua chuyển khoản qua tài khoản ngân hàng (khuyên
                    dùng)
                  </label>
                  <input
                    type="text"
                    id="stk"
                    placeholder="Nhập số tài khoản ngân hàng..."
                    style={{ marginTop: "10px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
export default Cart;
