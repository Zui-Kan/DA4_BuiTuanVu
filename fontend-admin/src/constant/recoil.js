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

//lưu số lượng trong giỏ hàng
export const modelState = atom({
  key: "cartState",
  default: [],
});
