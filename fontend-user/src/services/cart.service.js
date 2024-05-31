import { message } from "antd";
import { apiClient } from "../constant/api";
// Khởi tạo message API
const messageApi = message;
// Hàm để tính tổng số lượng sản phẩm trong giỏ hàng
export const getTotalQuantity = () => {
  const cart = getCartFromLocalStorage();
  return cart.reduce((total, product) => total + product.SoLuong, 0);
};

// Hàm để tính tổng giá tiền trong giỏ hàng
export const getTotalPrice = () => {
  const cart = getCartFromLocalStorage();
  return cart.reduce(
    (total, product) => total + product.SoLuong * product.Gia,
    0
  );
};

// Hàm tiện ích để lấy giỏ hàng từ localStorage
export const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const getDetailCart = async (id) => {
  const response = await apiClient.get(`/cart/getDetailCart/${id}`);
  return response;
};

export const addToCart = async (selectedNoiThat, quantity) => {
  try {
    const response = await getDetailCart(selectedNoiThat);
    const cart = getCartFromLocalStorage();
    const product = {
      MaModel: response.data.data.MaModel,
      TenModel: response.data.data.TenModel,
      MaPhienBan: response.data.data.MaPhienBan,
      TenPhienBan: response.data.data.TenPhienBan,
      MaMauNgoaiThat: response.data.data.MaMauNgoaiThat,
      TenMauNgoaiThat: response.data.data.TenMauNgoaiThat,
      HinhAnhXe: response.data.data.HinhAnhXe,
      MaMauNoiThat: selectedNoiThat,
      TenMauNoiThat: response.data.data.TenMauNoiThat,
      SoLuong: quantity,
      Gia: response.data.data.Gia,
    };

    // Tìm sản phẩm trong giỏ hàng
    const existingProductIndex = cart.findIndex(
      (item) => item.MaMauNoiThat === selectedNoiThat
    );

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      cart[existingProductIndex].SoLuong += quantity;
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    messageApi.success("Sản phẩm đã được thêm vào giỏ hàng.");
  } catch (error) {
    messageApi.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
  }
};

// Hàm để lấy thông tin giỏ hàng, bao gồm tổng số lượng và tổng giá tiền
export const getCartDetails = async () => {
  try {
    const listCart = getCartFromLocalStorage();
    return { listCart };
  } catch (error) {
    messageApi.error("Có lỗi xảy ra khi lấy thông tin giỏ hàng.");
    return [];
  }
};

// Hàm để xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (selectedNoiThat) => {
  try {
    let cart = getCartFromLocalStorage();
    cart = cart.filter((item) => item.MaMauNoiThat !== selectedNoiThat);
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    messageApi.error("Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.");
  }
};

// Hàm để cập nhật số lượng sản phẩm trong giỏ hàng
export const updateQuantityInCart = (selectedNoiThat, newQuantity) => {
  try {
    let cart = getCartFromLocalStorage();
    const existingProductIndex = cart.findIndex(
      (item) => item.MaMauNoiThat === selectedNoiThat
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].SoLuong = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } catch (error) {
    messageApi.error("Có lỗi xảy ra khi cập nhật số lượng sản phẩm.");
  }
};
