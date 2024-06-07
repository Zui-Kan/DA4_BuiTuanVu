import { Breadcrumb } from "antd";

const ModelXe = () => {
  document.title = "Quản lý xe";

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Xe ô tô</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        Hiển thị trang modelxe
      </div>
    </>
  );
};

export default ModelXe;
