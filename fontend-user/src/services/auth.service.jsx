import { apiClient } from "../constant/api";

export const apiLogin = async (username, password) => {
  try {
    const res = await apiClient?.post(`/auth/login`, { username, password });
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
};

export const apiSignup = async (data) => {
  try {
    debugger;
    const res = await apiClient?.post(`/taikhoan/signup`, data);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
};
