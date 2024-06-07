import { Breadcrumb } from "antd";

const PhienBan = () => {
  document.title = "Quản lý phiên bản";

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Phiên bản</Breadcrumb.Item>
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

export default PhienBan;
