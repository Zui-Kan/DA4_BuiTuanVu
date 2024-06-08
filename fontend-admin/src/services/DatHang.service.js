import { apiClient } from "../constant/api";

export const apiHienThiTrangThai_0 = async (data) => {
  try {
    const res = await apiClient?.post(`/trangthai/hienthidondahuy`, data);
    if (res?.data?.status_code === 200) {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiHienThiTrangThai_1 = async (data) => {
  try {
    const res = await apiClient?.post(
      `/trangthai/hienthitrangthainhanvienxacnhan`,
      data
    );
    if (res?.data?.status_code === 200) {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiHienThiTrangThai_2 = async (data) => {
  try {
    const res = await apiClient?.post(`/trangthai/hienthidonxulyhoso`, data);
    if (res?.data?.status_code === 200) {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiHienThiTrangThai_3 = async (data) => {
  try {
    const res = await apiClient?.post(`/trangthai/hienthidongiaoxe`, data);
    if (res?.data?.status_code === 200) {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiHienThiTrangThai_4 = async (data) => {
  try {
    const res = await apiClient?.post(`/trangthai/hienthidonthanhcong`, data);
    if (res?.data?.status_code === 200) {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiGetChiTietDatHang = async (id) => {
  try {
    const res = await apiClient?.get(
      `/trangthai/hienthichitietdathangtheoid/${id}`
    );
    return res?.data;
  } catch (error) {
    console.error("Lỗi: ", error);
  }
};

export const apiNhanVienXacNhan = async (data) => {
  try {
    const res = await apiClient?.post(`/trangthai/nhanvienxacnhan`, data);
    if (res?.data?.status_code === 200) {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiNhanVienXuLyHoSo = async (data) => {
  try {
    const res = await apiClient?.post(`/trangthai/nhanvienxulyhoso`, data);
    if (res?.data?.status_code === 200) {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiNhanVienGiaoXe = async (data) => {
  try {
    const res = await apiClient?.post(`/trangthai/nhanviengiaoxe`, data);
    if (res?.data?.status_code === 200) {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
