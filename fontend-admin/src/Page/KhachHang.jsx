import { Breadcrumb } from "antd";

const KhachHang = () => {
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Khách hàng</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        Bill is a cat.
      </div>
    </>
  );
};

export default KhachHang;
