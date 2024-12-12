// ModelXeUpdate.js
import React, { useEffect, useState, useRef } from "react";
import { Button, message, Steps, Breadcrumb } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import UpdateXe from "./UpdateXe";
import UpdatePhienBan from "./UpdatePhienBan";
import { useRecoilState } from "recoil";
import { modelState, phienBanState } from "../../constant/recoil";
import UpdateThongSoKyThuat from "./UpdateThongSoKyThuat";
import { apiModelSave } from "../../services/ModelXe.service";

const AddModel = () => {
  const { id } = useParams();
  const [dataModel, setDataModel] = useRecoilState(modelState);
  const [dataPhienBan, setDataPhienBan] = useRecoilState(phienBanState);

  const [current, setCurrent] = useState(0);
  const formSubmitRef = useRef(null);
  const messageApi = message;
  const navigate = useNavigate();

  
  const next = () => {
    if (current === 0 && formSubmitRef.current) {
      formSubmitRef.current();
    } else if (current === 1 && formSubmitRef.current) {
      formSubmitRef.current();
    } else {
      setCurrent(current + 1);
    }
  };

  const handleFinish = async () => {
    if (formSubmitRef.current) {
      await formSubmitRef.current();
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
      content: (
        <UpdateThongSoKyThuat
          maModelXe={id}
          registerFormSubmit={(submit) => (formSubmitRef.current = submit)}
        />
      ),
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
            <Button type="primary" onClick={handleFinish}>
              Hoàn thành
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddModel;
