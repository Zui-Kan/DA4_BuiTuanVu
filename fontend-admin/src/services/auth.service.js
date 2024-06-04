import { apiClient } from "../constant/api";
export const lc_tn = () => {
  return JSON.parse(localStorage.getItem("tn") || "{}");
};
export const lc_profile = () => {
  return JSON.parse(localStorage.getItem("profile") || "{}");
};

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
  if (!token) {
    console.error("Token không hợp lệ.");
    return null;
  }

  try {
    const res = await apiClient?.post(`/auth/refresh`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res && res.data) {
      return res.data;
    } else {
      console.error("Không nhận được dữ liệu từ máy chủ.");
      return null;
    }
  } catch (error) {
    console.error(
      "Lỗi khi refresh token:",
      error.response?.data || error.message || error
    );
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
      headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return null;
  }
};


export const apiLogout = async (token) => {
  try {
    if (token) {
      debugger;
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
