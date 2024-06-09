import React, { useEffect, useState } from "react";
import { Modal, Select, Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  apiGetModelXe,
  apiSelectLoaiAndHang,
} from "../../services/ModelXe.service";
import { uploads } from "../../constant/api";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modelState } from "../../constant/recoil";

const formItemLayout = {
  labelCol: { xs: { span: 5 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const UpdateThongSoKyThuat = (props) => {
  const [form] = Form.useForm();
  const [dataModel, setDataModel] = useRecoilState(modelState);

  const handleFinishChange = (values) => {
    console.log(values);
  };
  console.log(dataModel);
  return (
    <Form {...formItemLayout} form={form} onFinish={handleFinishChange}>
      <Form.Item
        label="Tên xe"
        name="TenModel"
        rules={[{ required: true, message: "Vui lòng nhập tên xe!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default UpdateThongSoKyThuat;
