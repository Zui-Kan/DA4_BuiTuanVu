import { apiClient } from "../constant/api";

export const getKhachHang = async (id) => {
  try {
    const res = await apiClient?.get(`/checkout/getkhachhangbycheckout/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin khách hàng checkout: ", error);
  }
};
export const apiDatXe = async (data) => {
  try {
    const res = await apiClient?.post(`/checkout/datxe`, data);
    return res?.data;
  } catch (error) {
    console.error("Lỗi lấy đặt xe: ", error);
  }
};
