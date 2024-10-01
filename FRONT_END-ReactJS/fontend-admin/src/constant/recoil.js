import { atom } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const cartCheckout = atom({
  key: "cartCheckOutState",
  default: "",
});

//lưu số lượng trong giỏ hàng
export const cartState = atom({
  key: "cartState",
  default: [],
});

export const modelState = atom({
  key: "modelState",
  default: [],
});

export const phienBanState = atom({
  key: "phienBanState",
  default: [],
});