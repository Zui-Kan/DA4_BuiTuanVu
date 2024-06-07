import { apiClient } from "../constant/api";

export const apiSearchTaiKhoan = async (data) => {
  try {
    const res = await apiClient?.post(`/taikhoan/search`, data);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiDeleteTaiKhoan = async (id) => {
  try {
    const res = await apiClient?.delete(`/taikhoan/delete/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiDeletesTaiKhoan = async (data) => {
  try {
    const res = await apiClient?.delete(`/taikhoan/deletes`, { data });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};
export const apiSaveTaiKhoan = async (data) => {
  try {
    debugger;

    const res = await apiClient?.post(`/taikhoan/save`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiGetTaiKhoan = async (id) => {
  try {
    const res = await apiClient?.get(`/taikhoan/get/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiGetCTTaiKhoan = async (id) => {
  try {
    const res = await apiClient?.get(`/taikhoan/getcttaikhoan/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};
export const apiSaveCTTaiKhoan = async (id, data) => {
  try {
    const res = await apiClient?.post(`/taikhoan/updatectusers/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};
