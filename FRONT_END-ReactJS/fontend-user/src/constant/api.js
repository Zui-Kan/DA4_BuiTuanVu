import axios from "axios";

// Hàm làm mới token
const apiRefreshToken = async (token) => {
  if (!token) {
    console.error("Token không hợp lệ.");
    return null;
  }

  try {
    const res = await axios.post(
      `http://127.0.0.1:8099/api/auth/refresh`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res?.data?.status_code === 200) {
      return res.data;
    } else {
      console.error("Không nhận được dữ liệu từ máy chủ.");
      return null;
    }
  } catch (error) {
    if (error.response?.data?.message === "The token has been blacklisted") {
      console.error("Token đã bị đưa vào blacklist. Vui lòng đăng nhập lại.");
      return null;
    } else {
      console.error(
        "Lỗi khi refresh token:",
        error.response?.data || error.message || error
      );
      return null;
    }
  }
};

// Tạo instance axios với cấu hình mặc định
export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8099/api/user",
  timeout: 1000 * 60 * 30 * 3,
});

export const apiClientAuth = axios.create({
  baseURL: "http://127.0.0.1:8099/api",
  timeout: 1000 * 60 * 30 * 3,
});

// URL cho uploads
export const uploads = () => "http://localhost:8099/uploads/";

let isRefreshing = false;
let failedQueue = [];

// Xử lý hàng đợi khi refresh token
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Hàm để cấu hình interceptor
const setupInterceptors = (client) => {
  client.interceptors.request.use(
    async function (config) {
      let token = JSON.parse(localStorage.getItem("token") || null);
      if (token) {
        const expiration = JSON.parse(atob(token.split(".")[1])).exp;
        const now = Math.floor(Date.now() / 1000);

        // Kiểm tra xem token đã hết hạn chưa
        if (expiration < now) {
          if (!isRefreshing) {
            isRefreshing = true;
            const newTokenData = await apiRefreshToken(token);
            if (newTokenData?.status_code === 200) {
              localStorage.setItem(
                "token",
                JSON.stringify(newTokenData.access_token)
              );
              token = newTokenData.access_token;
              processQueue(null, newTokenData.access_token);
            } else {
              localStorage.removeItem("token");
              processQueue("Không thể làm mới token");
            }
            isRefreshing = false;
          }

          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              config.headers.Authorization = `Bearer ${token}`;
              return config;
            })
            .catch((error) => {
              return Promise.reject(error);
            });
        }

        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },

    function (error) {
      return Promise.reject(error);
    }
  );
};

// Cấu hình interceptor cho cả hai client
setupInterceptors(apiClient);
setupInterceptors(apiClientAuth);
