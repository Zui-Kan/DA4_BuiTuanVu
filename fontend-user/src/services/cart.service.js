import { message } from "antd";
import { apiClient } from "../constant/api";

// Hàm để tính tổng số lượng sản phẩm trong giỏ hàng
export const getTotalQuantity = () => {
  const cart = getCartFromLocalStorage();
  return cart.reduce((total, product) => total + product.soLuong, 0);
};

// Hàm để tính tổng giá tiền trong giỏ hàng
export const getTotalPrice = () => {
  const cart = getCartFromLocalStorage();
  return cart.reduce(
    (total, product) => total + product.soLuong * product.giaBan,
    0
  );
};

// Hàm tiện ích để lấy giỏ hàng từ localStorage
const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// Khởi tạo message API
const messageApi = message;

export const addToCart = async (selectedNoiThat, quantity) => {
  try {
    const response = await apiClient.get(
      `/cart/getDetailCart/${selectedNoiThat}`
    );

    const cart = getCartFromLocalStorage();
    const product = {
      maModel: response.data.data.MaModel,
      maPhienBan: response.data.data.MaPhienBan,
      maNgoaiThat: response.data.data.MaMauNgoaiThat,
      maNoiThat: selectedNoiThat,
      soLuong: quantity,
      giaBan: response.data.data.Gia,
    };

    // Tìm sản phẩm trong giỏ hàng
    const existingProductIndex = cart.findIndex(
      (item) => item.maNoiThat === selectedNoiThat
    );

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      cart[existingProductIndex].soLuong += quantity;
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
    const cart = getCartFromLocalStorage();
    const listDetailPromises = cart.map((item) =>
      apiClient.get(`/cart/getDetailCart/${item.maNoiThat}`)
    );

    const responses = await Promise.all(listDetailPromises);
    const listCart = responses.map((response, index) => ({
      ...response.data.data,
      soLuong: cart[index].soLuong,
    }));

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
    cart = cart.filter((item) => item.maNoiThat !== selectedNoiThat);
    localStorage.setItem("cart", JSON.stringify(cart));
    messageApi.success("Sản phẩm đã được xóa khỏi giỏ hàng.");
  } catch (error) {
    messageApi.error("Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.");
  }
};

// Hàm để cập nhật số lượng sản phẩm trong giỏ hàng
export const updateQuantityInCart = (selectedNoiThat, newQuantity) => {
  try {
    let cart = getCartFromLocalStorage();
    const existingProductIndex = cart.findIndex(
      (item) => item.maNoiThat === selectedNoiThat
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].soLuong = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } catch (error) {
    messageApi.error("Có lỗi xảy ra khi cập nhật số lượng sản phẩm.");
  }
};
