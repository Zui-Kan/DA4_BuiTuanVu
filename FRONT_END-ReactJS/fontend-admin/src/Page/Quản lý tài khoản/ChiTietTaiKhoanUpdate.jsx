import React, { useEffect } from "react";
import { Modal, Select, Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  apiGetCTTaiKhoan,
  apiGetTaiKhoan,
  apiSaveCTTaiKhoan,
  apiSaveTaiKhoan,
} from "../../services/TaiKhoan.service";

const formItemLayout = {
  labelCol: { xs: { span: 5 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const CTTaiKhoanUpdate = (props) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        ...values,
        upload_file: values.AnhDaiDien.file,
      };
      const res = await apiSaveCTTaiKhoan(props.maTaiKhoan, formData);
      if (res?.status_code === 200) {
        console.log("Lưu thành công", res);
        props.loadData();
        props.cancelModal();
        form.resetFields();
      } else {
        console.error("Lỗi khi lưu:", res?.message);
      }
    } catch (error) {
      console.error("Lưu thất bại:", error);
    }
  };

  const loadDataUpdate = async (id) => {
    const res = await apiGetCTTaiKhoan(id);
    if (res?.status_code === 200) {
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    form.resetFields();
    if (props.maTaiKhoan) {
      loadDataUpdate(props.maTaiKhoan);
    }
  }, [props.maTaiKhoan]);

  const handleCancelModal = () => {
    props.cancelModal();
    // form.resetFields();
  };

  return (
    <Modal
      title="Cập nhật thông tin chi tiết Tài khoản"
      open={props.open}
      onOk={handleSave}
      onCancel={handleCancelModal}
      width={800}
      okText="Lưu"
      cancelText="Huỷ bỏ"
    >
      <Form {...formItemLayout} style={{ maxWidth: 800 }} form={form}>
        <Form.Item
          label="Họ và tên"
          name="HoVaTen"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="SDT"
          label="SĐT "
          rules={[
            {
              required: true,
              message: "Vui lòng nhập SĐT!",
            },
            {
              max: 10,
              message: "nhập tối đa 10 số !",
            },
          ]}
        >
          <Input type="number" maxLength={10} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="DiaChi"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Chứng minh nhân dân"
          name="CMND"
          rules={[
            { required: true, message: "Vui lòng nhập CMND!" },
            {
              max: 12,
              message: "nhập tối đa 12 số !",
            },
          ]}
        >
          <Input type="number" maxLength={12} />
        </Form.Item>
        <Form.Item
          label="Ảnh đại diện"
          name="AnhDaiDien"
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

export default CTTaiKhoanUpdate;
