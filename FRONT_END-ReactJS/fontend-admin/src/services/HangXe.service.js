import { apiClient } from "../constant/api";

export const apiSearchHangXe = async (data) => {
  try {
    const res = await apiClient?.post(`/hangxe/search`, data);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiDeleteHangXe = async (id) => {
  try {
    const res = await apiClient?.delete(`/hangxe/delete/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiDeletesHangXe = async (data) => {
  try {
    const res = await apiClient?.delete(`/hangxe/deletes`, { data });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};
export const apiSaveHangXe = async (data) => {
  try {
    const res = await apiClient?.post(`/hangxe/save`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiGetHangXe = async (id) => {
  try {
    const res = await apiClient?.get(`/hangxe/get/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};
