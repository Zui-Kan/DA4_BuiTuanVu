import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, Upload } from "antd";
import { apiGetHangXe, apiSaveHangXe } from "../../services/HangXe.service";

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

const HangXeUpdate = (props) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const saveHangXe = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      if (props.maHangXe) {
        formData.append("MaHang", props.maHangXe);
      }
      formData.append("TenHang", values.TenHang);
      formData.append("HinhAnhHangXe", values.HinhAnhHangXe.file);

      const res = await apiSaveHangXe(formData);
      if (res) {
        console.log("Save successful", res);
        props.loadData();
        props.cancelModal();
        form.resetFields();
      }
    } catch (error) {
      console.error("Failed to save HangXe:", error);
    }
  };

  const loadDataUpdate = async (id) => {
    let res = await apiGetHangXe(id);
    if (res?.status_code === 200) {
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    form.resetFields();
    if (props.maHangXe !== "") {
      loadDataUpdate(props.maHangXe);
    }
  }, [props.maHangXe]);

  const handleCancelModal = () => {
    props.cancelModal();
    form.resetFields(); //cho các input trở về null
  };
  return (
    <Modal
      title="Cập nhật thông tin Hãng Xe"
      open={props.open}
      onOk={saveHangXe}
      onCancel={handleCancelModal}
      width={800}
      okText="Lưu"
      cancelText="Huỷ bỏ"
    >
      <Form {...formItemLayout} style={{ maxWidth: 800 }} form={form}>
        <Form.Item
          label="Tên hãng xe"
          name="TenHang"
          rules={[{ required: true, message: "Vui lòng nhập tên hãng xe!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          name="HinhAnhHangXe"
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

export default HangXeUpdate;
