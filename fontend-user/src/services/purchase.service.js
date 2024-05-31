import { apiClient } from "../constant/api";

export const apiGetAllPurchase = async (id, token) => {
  try {
    const res = await apiClient?.get(`/purchase/getallpurchase/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi hiển thị đơn hàng: ", error);
  }
};

export const apiGetPurchase = async (id, token) => {
  try {
    const res = await apiClient?.get(`/purchase/getpurchase/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi hiển thị đơn hàng: ", error);
  }
};
