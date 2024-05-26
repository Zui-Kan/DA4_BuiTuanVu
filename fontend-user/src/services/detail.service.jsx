import { apiClient } from "../constant/api";

export const getDetail = async (id) => {
  const res = await apiClient?.get(`/detail/getdetail/` + id);
  return res?.data.data;
};
