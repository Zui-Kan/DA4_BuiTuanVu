import { apiClient } from "../constant/api";

export const apiSearchLoaiXe = async (data) => {
  try {
    const res = await apiClient?.post(`/loaixe/search`, data);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiDeleteLoaiXe = async (id) => {
  try {
    const res = await apiClient?.delete(`/loaixe/delete/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiDeletesLoaiXe = async (data) => {
  try {
    debugger;
    const res = await apiClient?.delete(`/loaixe/deletes`, { data });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};
export const apiSaveLoaiXe = async (data) => {
  try {
    debugger;

    const res = await apiClient?.post(`/loaixe/save`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiGetLoaiXe = async (id) => {
  try {
    const res = await apiClient?.get(`/loaixe/get/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};
