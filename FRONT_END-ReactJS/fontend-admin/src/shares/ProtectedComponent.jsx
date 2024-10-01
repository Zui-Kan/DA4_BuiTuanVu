// import { Navigate, useLocation } from "react-router-dom";
// const ProtectedComponent = ({ children }) => {
//   const token = JSON.parse(sessionStorage.getItem("token") || null);
//   let location = useLocation();
//   if (token) {
//     return <>{children}</>;
//   } else {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
// };

// export default ProtectedComponent;

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedComponent = ({ children, requiredRole }) => {
  const token = JSON.parse(sessionStorage.getItem("token") || null);
  const profile = JSON.parse(sessionStorage.getItem("profile") || null);

  if (!token) {
    // Chuyển hướng đến trang đăng nhập nếu người dùng chưa đăng nhập
    return <Navigate to="/login" />;
  }

  if (requiredRole !== undefined && profile.role !== requiredRole) {
    // Chuyển hướng đến trang chủ nếu người dùng không có quyền truy cập
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedComponent;
