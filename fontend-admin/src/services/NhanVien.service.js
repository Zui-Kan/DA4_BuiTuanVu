import { apiClient } from "../constant/api";

export const apiSearchNhanVien = async (data) => {
  try {
    const res = await apiClient?.post(`/nhanvien/search`, data);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiDeleteNhanVien = async (id) => {
  try {
    const res = await apiClient?.delete(`/nhanvien/delete/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiDeletesNhanVien = async (data) => {
  try {
    const res = await apiClient?.delete(`/nhanvien/deletes`, { data });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiSaveNhanVien = async (data) => {
  try {
    const res = await apiClient?.post(`/nhanvien/save`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiGetNhanVien = async (id) => {
  try {
    const res = await apiClient?.get(`/nhanvien/get/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiGetNhanVienbyTaiKhoan = async () => {
  try {
    const res = await apiClient?.get(`/nhanvien/gettaikhoan`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiGetNhanVienbyTK = async (id) => {
  try {
    const res = await apiClient?.get(`/nhanvien/getbytk/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};
