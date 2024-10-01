import React, { useEffect } from "react";
import { Modal, Select, Button, Form, Input } from "antd";
import {
  apiGetTaiKhoan,
  apiSaveTaiKhoan,
} from "../../services/TaiKhoan.service";

const formItemLayout = {
  labelCol: { xs: { span: 5 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const TaiKhoanUpdate = (props) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        id: props.maTaiKhoan || null,
        ...values,
      };

      const res = await apiSaveTaiKhoan(formData);
      if (res?.status_code === 200) {
        console.log("Lưu thành công", res);
        props.loadData();
        props.cancelModal();
        form.resetFields();
      }
      // else {
      //   console.error("Lỗi khi lưu:", res?.message);
      // }
    } catch (error) {
      console.error("Lưu thất bại:", error);
    }
  };

  const loadDataUpdate = async (id) => {
    const res = await apiGetTaiKhoan(id);
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
      title="Cập nhật thông tin Tài khoản"
      open={props.open}
      onOk={handleSave}
      onCancel={handleCancelModal}
      width={800}
      okText="Lưu"
      cancelText="Huỷ bỏ"
    >
      <Form {...formItemLayout} style={{ maxWidth: 800 }} form={form}>
        <Form.Item
          label="Tên tài khoản"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Địa chỉ Email"
          rules={[
            {
              type: "email",
              message: "Không đúng định dang emai, abc@abc.abc",
            },
            {
              required: true,
              message: "Vui lòng nhập địa chỉ Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="pass"
          rules={
            !props.maTaiKhoan && [
              { required: true, message: "Vui lòng nhập mật khẩu!" },
            ]
          }
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Quyền"
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
        >
          <Select>
            <Select.Option value="0">Quản trị</Select.Option>
            <Select.Option value="1">Nhân viên</Select.Option>
            <Select.Option value="2">Khách hàng</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaiKhoanUpdate;
