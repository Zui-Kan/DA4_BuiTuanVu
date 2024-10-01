import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, Upload } from "antd";
import { apiGetLoaiXe, apiSaveLoaiXe } from "../../services/LoaiXe.service";

const formItemLayout = {
  labelCol: {
    xs: { span: 5 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const LoaiXeUpdate = (props) => {
  const [form] = Form.useForm();
  // const [file, setFile] = useState(null);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      if (props.maLoaiXe) {
        formData.append("MaLoaiXe", props.maLoaiXe);
      }
      formData.append("TenLoaiXe", values.TenLoaiXe);
      formData.append("HinhAnhLoaiXe", values.HinhAnhLoaiXe.file);

      const res = await apiSaveLoaiXe(formData);
      if (res) {
        console.log("Save successful", res);
        props.loadData();
        props.cancelModal();
        form.resetFields();
      }
    } catch (error) {
      console.error("Failed to save LoaiXe:", error);
    }
  };

  const loadDataUpdate = async (id) => {
    let res = await apiGetLoaiXe(id);
    if (res?.status_code === 200) {
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    form.resetFields();
    if (props.maLoaiXe !== "") {
      loadDataUpdate(props.maLoaiXe);
    }
  }, [props.maLoaiXe]);

  const handleCancelModal = () => {
    props.cancelModal();
    form.resetFields(); //cho các input trở về null
  };

  return (
    <Modal
      title="Cập nhật thông tin Hãng Xe"
      open={props.open}
      onOk={handleSave}
      onCancel={handleCancelModal}
      okText="Lưu"
      cancelText="Huỷ bỏ"
      width={800}
    >
      <Form {...formItemLayout} style={{ maxWidth: 800 }} form={form}>
        <Form.Item
          label="Tên loại xe"
          name="TenLoaiXe"
          rules={[{ required: true, message: "Vui lòng nhập tên loại xe!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          name="HinhAnhLoaiXe"
          rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
        >
          <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoaiXeUpdate;
