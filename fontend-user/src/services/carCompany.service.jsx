import { apiClient } from "../constant/api";

export const getBoLocCategory = async (id, page, filters) => {
  const params = new URLSearchParams({
    page,
    ...filters,
  });
  const res = await apiClient.post(
    `/category/boloccategory/${id}?${params.toString()}`
  );
  return res?.data;
};

export const getLoaiXe = async () => {
  try {
    const res = await apiClient.get(`/category/getloaixe`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu loại xe:", error);
  }
};

export const getNamSanXuat = async () => {
  try {
    const res = await apiClient.get(`/category/getnamsanxuat`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu năm sản xuất:", error);
  }
};
