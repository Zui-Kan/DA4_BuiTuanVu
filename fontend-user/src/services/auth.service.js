import { apiClient } from "../constant/api";

export const apiLogin = async (username, password) => {
  try {
    const res = await apiClient?.post(`/auth/login`, { username, password });
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return null;
  }
};

export const apiRefreshToken = async (token) => {
  try {
    const res = await apiClient?.post(`/auth/refresh`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi refresh token:", error);
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

export const getProfile = async (token) => {
  try {
    const res = await apiClient?.get(`/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return null;
  }
};

export const getCTUser = async (id, token) => {
  try {
    if (token) {
      const res = await apiClient?.get(`/taikhoan/gettaikhoanct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return null;
  }
};

export const apiLogout = async (token) => {
  try {
    if (token) {
      const res = await apiClient?.post(`/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data;
    }
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
    return null;
  }
};
