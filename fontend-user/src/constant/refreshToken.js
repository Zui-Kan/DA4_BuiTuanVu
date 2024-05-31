import { useEffect } from "react";
import { apiRefreshToken } from "../services/auth.service";

const TokenRefresher = () => {
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem("tn"));
        if (tokenData) {
          const { access_token } = tokenData;
          const expiration = JSON.parse(atob(access_token.split(".")[1])).exp;
          const now = Math.floor(Date.now() / 1000);

          // Kiểm tra xem token đã hết hạn chưa
          if (expiration < now) {
            // Làm mới token
            const newTokenData = await apiRefreshToken(access_token);
            if (newTokenData && newTokenData.access_token) {
              // Cập nhật token mới và lưu vào local storage
              localStorage.setItem("tn", JSON.stringify(newTokenData));
            }
          }
        }
      } catch (error) {
        console.error("Lỗi khi làm mới token:", error);
      }
    };

    // Gọi hàm refreshAccessToken ngay lập tức
    refreshAccessToken();

    // Sau đó thiết lập setInterval để gọi lại sau mỗi 1 phút
    const tokenRefreshInterval = setInterval(refreshAccessToken, 60000);

    // Xóa bộ định thời khi component bị unmount
    return () => clearInterval(tokenRefreshInterval);
  }, []);

  return null;
};

export default TokenRefresher;
