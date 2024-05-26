import { atom } from "recoil";
export const cartState = atom({
  key: "cartState",
  default: [],
});

export const tokenState = atom({
  key: "tokenState",
  default: {
    accessToken: "",
    refreshToken: "",
  },
});
