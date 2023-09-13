import axios from "axios";
import { AUTH_API } from "../const";

const instance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

async function callRefreshToken() {
  console.log("refreshing");
  console.log(localStorage.getItem("refreshToken"));
  try {
    // Tạo một yêu cầu POST và thêm refreshToken vào tiêu đề (header)
    const response = await axios.post(AUTH_API + "/auth/refresh", null, {
      headers: {
        authentication: localStorage.getItem("refreshToken"),
      },
    });

    return {
      newAccessToken: response.data.accessToken,
      newRefreshToken: response.data.refreshToken,
    };
  } catch (error) {
    throw error;
  }
}

// Interceptor trước khi gửi yêu cầu
instance.interceptors.request.use(
  (config) => {
    // Thực hiện các xử lý trước khi gửi yêu cầu, ví dụ: thêm token vào tiêu đề
    // config.headers.Authorization = `Bearer ${yourAccessToken}`;
    //config.authentication = sessionStorage.getItem("accessToken") || config.authentication;
    config.headers.authentication =
      localStorage.getItem("accessToken") || config.headers.authentication;
    console.log(config);
    console.log("set access");
    return config;
  },
  (error) => {
    //return Promise.reject(error);
    console.log("error");
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      console.log("refreshing");
      try {
        const { newAccessToken, newRefreshToken } = await callRefreshToken();
        console.log("refreshed" + newAccessToken);
        if (newAccessToken) {
          console.log("test" + newAccessToken);

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          console.log("reset " + newAccessToken);
          const newConfig = { ...config }; // Tạo bản sao của config
          newConfig.headers.authentication =
            localStorage.getItem("accessToken") ||
            config.headers.authentication;

          return axios(newConfig);
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/auth/login";

          return Promise.reject(error);
        }
      } catch (error) {
        console.log("nguu");
        localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
// Interceptor sau khi nhận phản hồi
// instance.interceptors.response.use(

//   (response) => {

//     if (response.status !== 401) {
//       console.log("Response status:", response.status);
//         return response;
//       }
//     try {
//         // Gọi refreshToken để lấy accessToken mới
//         const newAccessToken = callRefreshToken(); // Tạo hàm callRefreshToken để thực hiện refresh

//         if (newAccessToken) {
//           // Nếu refreshToken thành công và lấy được accessToken mới, sử dụng nó và thử gửi lại yêu cầu gốc
//           sessionStorage.setItem("accessToken", newAccessToken);
//           const originalRequest = response.config;
//           originalRequest.authentication = sessionStorage.getItem("accessToken") || originalRequest.authentication;

//           return axios(originalRequest);
//         } else {
//           // Nếu refreshToken thất bại, đăng xuất hoặc xử lý tùy thuộc vào logic của bạn
//           // Ví dụ: đăng xuất người dùng hoặc xử lý lỗi khác
//           // logoutUser();
//           sessionStorage.removeItem("accessToken");
//           sessionStorage.removeItem("refreshToken");
//           window.location.href = '/login';

//           return Promise.reject(response);
//         }
//       } catch (error) {
//         console.log("nguu")
//         return Promise.reject(error);
//       }
//   },
//   (error) => {
//     console.log("refresh needed")
//     return Promise.reject(error);
//   }
// );

export default instance;
