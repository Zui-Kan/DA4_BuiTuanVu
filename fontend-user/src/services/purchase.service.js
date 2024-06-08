import { apiClient } from "../constant/api";

export const apiGetAllPurchase = async (id) => {
  try {
    const res = await apiClient?.get(`/purchase/getallpurchase/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi hiển thị đơn hàng: ", error);
  }
};

export const apiGetPurchase = async (id) => {
  try {
    const res = await apiClient?.get(`/purchase/getpurchase/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi hiển thị đơn hàng: ", error);
  }
};

export const apiYeuCauHuyDon = async (data) => {
  try {
    const res = await apiClient?.post(`/purchase/yeucauhuydon`, data);
    return res.data;
  } catch (error) {
    console.error("Lỗi hiển thị đơn hàng: ", error);
  }
};
