import { apiClient } from "../constant/api";

export const getCTUser = async (id) => {
  try {
  
      const res = await apiClient?.get(`/header/gettaikhoanct/${id}`);
      return res?.data;
    
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
