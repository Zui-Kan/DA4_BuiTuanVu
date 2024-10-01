import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./shares/AppLayout";
import ErrorBoundary from "./Component/Error/Error";
import Home from "./Page/Home";
import LoaiXe from "./Page/Quản lý loại xe/LoaiXe";
import HangXe from "./Page/Quản lý hãng xe/HangXe";
import TaiKhoan from "./Page/Quản lý tài khoản/TaiKhoan";
import Login from "./Page/Login";
import ProtectedComponent from "./shares/ProtectedComponent";
import NhanVien from "./Page/Quản lý nhân viên/NhanVien";
import KhachHang from "./Page/Quản lý khách hàng/KhachHang";
import NVNhanDonHang from "./Page/Quản lý đơn đặt/Nhận đơn/NVNhanDonHang";
import QuanLyDonByNV from "./Page/Quản lý đơn đặt/QuanLyDonByNV";
import DonDaHuy from "./Page/Quản lý đơn đặt/Đơn đã huỷ/DonDaHuy";
import ModelXe from "./Page/Quản lý model xe/ModelXe";
import AddModel from "./Page/Quản lý model xe/AddModel";
import UpdateModelXe from "./Page/Quản lý model xe/UpdateModel";
import HienThiThongKe from "./Page/HienThiThongKe";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <>
        <AppLayout />
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedComponent>
            <Home />
          </ProtectedComponent>
        ),
      },
      {
        path: "/hangxe",
        element: (
          <ProtectedComponent>
            <HangXe />
          </ProtectedComponent>
        ),
      },
      {
        path: "/loaixe",
        element: (
          <ProtectedComponent>
            <LoaiXe />
          </ProtectedComponent>
        ),
      },

      {
        path: "/modelxe",
        element: (
          <ProtectedComponent>
            <ModelXe />
          </ProtectedComponent>
        ),
      },
      {
        path: "/addmodel/:id?",
        element: (
          <ProtectedComponent>
            <AddModel />
          </ProtectedComponent>
        ),
      },
      {
        path: "/updatemodelxe/:id?",
        element: (
          <ProtectedComponent>
            <UpdateModelXe />
          </ProtectedComponent>
        ),
      },
      {
        path: "/khachhang",
        element: (
          <ProtectedComponent>
            <KhachHang />
          </ProtectedComponent>
        ),
      },
      {
        path: "/nvnhandonhang",
        element: (
          <ProtectedComponent>
            <NVNhanDonHang />
          </ProtectedComponent>
        ),
      },
      {
        path: "/dondahuy",
        element: (
          <ProtectedComponent>
            <DonDaHuy />
          </ProtectedComponent>
        ),
      },
      {
        path: "/quanlydon",
        element: (
          <ProtectedComponent>
            <QuanLyDonByNV></QuanLyDonByNV>
          </ProtectedComponent>
        ),
      },
      {
        path: "/thongke",
        element: (
          <ProtectedComponent>
            <HienThiThongKe />
          </ProtectedComponent>
        ),
      },

      {
        path: "/taikhoan",
        element: (
          <ProtectedComponent requiredRole={0}>
            <TaiKhoan />
          </ProtectedComponent>
        ),
      },
      {
        path: "/nhanvien",
        element: (
          <ProtectedComponent requiredRole={0}>
            <NhanVien />
          </ProtectedComponent>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);
