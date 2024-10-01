import { apiClient } from "../constant/api";

export const getKhachHang = async (id, token) => {
  try {
    const res = await apiClient?.get(`/checkout/getkhachhangbycheckout/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin khách hàng checkout: ", error);
  }
};
export const apiDatXe = async (data, token) => {
  try {
    debugger;
    const res = await apiClient?.post(`/checkout/datxe`, data, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi lấy đặt xe: ", error);
  }
};
