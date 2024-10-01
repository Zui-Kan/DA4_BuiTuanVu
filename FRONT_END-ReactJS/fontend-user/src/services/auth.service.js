import { apiClient, apiClientAuth } from "../constant/api";
export const lc_token = () => {
  return JSON.parse(localStorage.getItem("token") || null);
};
export const lc_profile = () => {
  return JSON.parse(localStorage.getItem("profile") || "{}");
};

export const apiLogin = async (username, password) => {
  try {
    const res = await apiClientAuth?.post(`/auth/login`, { username, password });
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

export const getProfile = async () => {
  try {
    const res = await apiClientAuth?.get(`/auth/profile`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return null;
  }
};

export const apiLogout = async () => {
  try {
    const res = await apiClientAuth?.post(`/auth/logout`, null);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
    return null;
  }
};
