import { apiClient } from "../constant/api";

export const apiSearchModelXe = async (data) => {
  try {
    const res = await apiClient?.post(`/modelxe/search`, data);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiDeleteModelXe = async (id) => {
  try {
    const res = await apiClient?.delete(`/modelxe/delete/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiDeletesModelXe = async (data) => {
  try {
    debugger;
    const res = await apiClient?.delete(`/modelxe/deletes`, { data });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};
export const apiSaveModelXe = async (data) => {
  try {
    debugger;

    const res = await apiClient?.post(`/modelxe/save`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiGetModelXe = async (id) => {
  try {
    const res = await apiClient?.get(`/modelxe/getmodel/${id}`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiSelectLoaiAndHang = async () => {
  try {
    const res = await apiClient?.get(`/selecthangandloai`);
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};
