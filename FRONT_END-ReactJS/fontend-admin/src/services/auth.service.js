import { apiClient } from "../constant/api";

export const apiLogin = async (data) => {
  try {
    const res = await apiClient?.post(`/auth/login`, data);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return null;
  }
};

export const apiSignup = async (data) => {
  try {
    const res = await apiClient?.post(`/taikhoan/signup`, data);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return null;
  }
};

export const apiGetProfile = async () => {
  try {
    const res = await apiClient?.get(`/auth/profile`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return null;
  }
};

export const apiLogout = async () => {
  try {
    const res = await apiClient?.post(`/auth/logout`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
    return null;
  }
};

export const apiChangePassword = async (data) => {
  try {
    const res = await apiClient?.post(`/taikhoan/changepassword`, data);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return null;
  }
};
