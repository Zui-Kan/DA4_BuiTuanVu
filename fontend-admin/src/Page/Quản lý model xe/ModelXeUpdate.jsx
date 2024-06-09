// ModelXeUpdate.js
import React, { useEffect, useState, useRef } from "react";
import { Button, message, Steps, Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";
import UpdateXe from "./UpdateXe";
import UpdatePhienBan from "./UpdatePhienBan";
import { useRecoilState } from "recoil";
import { modelState } from "../../constant/recoil";
import UpdateThongSoKyThuat from "./UpdateThongSoKyThuat";

const ModelXeUpdate = () => {
  const { id } = useParams();
  const [dataModel, setDataModel] = useRecoilState(modelState);
  const [current, setCurrent] = useState(0);
  const formSubmitRef = useRef(null);

  const next = () => {
    if (current === 0 && formSubmitRef.current) {
      formSubmitRef.current();
    } else if (current === 1 && formSubmitRef.current) {
      formSubmitRef.current();
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Xe ô tô",
      content: (
        <UpdateXe
          maModelXe={id}
          nextPhu={() => setCurrent(current + 1)}
          registerFormSubmit={(submit) => (formSubmitRef.current = submit)}
        />
      ),
    },
    {
      title: "Phiên bản",
      content: (
        <UpdatePhienBan
          maModelXe={id}
          nextPhu={() => setCurrent(current + 1)}
          registerFormSubmit={(submit) => (formSubmitRef.current = submit)}
        />
      ),
    },
    {
      title: "Thông số kỹ thuật",
      content: <UpdateThongSoKyThuat />,
    },
  ];

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
