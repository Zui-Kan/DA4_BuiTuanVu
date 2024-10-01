import React, { useEffect, useRef } from "react";
import { Modal, Select, Button, Form, Input, Upload, Breadcrumb } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams, Link } from "react-router-dom";
import UpdateXe from "./UpdateXe";

const formItemLayout = {
  labelCol: { xs: { span: 5 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const UpdateModelXe = () => {
  const { id } = useParams();
  const formSubmitRef = useRef(null);

  const handleSubmitClick = () => {
    if (formSubmitRef.current) {
      formSubmitRef.current();
    }
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
        <UpdateXe
          maModelXe={id}
          registerFormSubmit={(submit) => (formSubmitRef.current = submit)}
        />
        <div className="khung-btn-suamodel">
          <Button onClick={handleSubmitClick}>Cập nhật</Button>
        </div>
      </div>
    </>
  );
};

export default UpdateModelXe;
