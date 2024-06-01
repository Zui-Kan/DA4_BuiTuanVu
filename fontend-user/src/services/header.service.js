import { apiClient } from "../constant/api";

export const getCTUser = async (id, token) => {
  try {
    if (token) {
      const res = await apiClient?.get(`/header/gettaikhoanct/${id}`, {
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

export const getMenu = async () => {
  try {
    const res = await apiClient?.get("/header/getmenu");
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return null;
  }
};
