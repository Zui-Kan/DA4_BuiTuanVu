import React, { useEffect, useState } from "react";

import { Button, message, Steps, theme, Modal, Flex, Breadcrumb } from "antd";

import { Link, useParams } from "react-router-dom";
import UpdateXe from "./UpdateXe";

const ModelXeUpdate = (props) => {
  const { id } = useParams(null);
  const steps = [
    {
      title: "Xe ô tô",
      content: <UpdateXe maModelXe={id} />,
    },
    {
      title: "Phiên bản",
      content: "Second-content",
    },
    {
      title: "Thông số kỹ thuật",
      content: "Last-content",
    },
  ];
  const messageApi = message;
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    minHeight: "200px",
    marginTop: 16,
  };

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <Link to={"/"}>Trang chủ</Link> },
          { title: <Link to={"/modelxe"}>Xe ô tô</Link> },
          { title: "Cập nhật xe" },
        ]}
      />
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 24,
          }}
        >
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Quay lại
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Tiếp tục
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Hoàn thành
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ModelXeUpdate;
