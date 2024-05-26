import { apiClient } from "../constant/api";

export const getHangXe = async () => {
  try {
    const res = await apiClient?.get(`/index/hangxe`);
    return res?.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu hãng xe:", error);
  }
};

export const getModelMoi = async () => {
  try {
    const res = await apiClient?.get(`/index/modelmoi`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu Model mới:", error);
  }
};



export const getTopXeBanChay = async () => {
  try {
    const res = await apiClient?.get(`/index/topxebanchay`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu top xe bán chạy:", error);
  }
};
