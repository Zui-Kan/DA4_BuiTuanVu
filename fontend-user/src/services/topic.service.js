import { apiClient } from "../constant/api";

export const apiGetForum = async () => {
  try {
    const res = await apiClient?.get(`/topic/getforum`);
    return res.data;
  } catch (error) {
    console.error("Lỗi hiển thị đơn hàng: ", error);
  }
};
