import { atom } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const cartCheckout = atom({
  key: "cartCheckOutState",
  default: "",
});

export const cartState = atom({
  key: "cartState",
  default: [],
});
