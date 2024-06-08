import { apiClient } from "../constant/api";

export const getDetail = async (id) => {
  const res = await apiClient?.get(`/detail/getdetail/` + id);
  return res?.data.data;
};
export const getMauNoiThat = async (id) => {
  const res = await apiClient?.get(`/detail/hienthinoithat/` + id);
  return res?.data.data;
};

export const getMauNgoaiThat = async (id) => {
  const res = await apiClient?.get(`/detail/hienthingoaithat/` + id);
  return res?.data.data;
};

export const saveBinhLuan = async (data) => {
  try {
    const res = await apiClient.post(`/detail/save_binhluan`, data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lưu bình luận:", error);
    // Optionally, you can throw the error to handle it where this function is called
    throw error;
  }
};

export const apiDeleteBinhLuan = async (id) => {
  try {
    const res = await apiClient.delete(`/detail/delete_binhluan/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xoá bình luận:", error);
    throw error;
  }
};
