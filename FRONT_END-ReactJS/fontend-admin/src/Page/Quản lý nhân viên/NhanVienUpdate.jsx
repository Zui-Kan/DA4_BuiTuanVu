import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, Upload, message, Select } from "antd";
import {
  apiGetNhanVien,
  apiGetNhanVienbyTaiKhoan,
  apiSaveNhanVien,
} from "../../services/NhanVien.service";
import { uploads } from "../../constant/api";

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

const NhanVienUpdate = (props) => {
  const [form] = Form.useForm();
  const messageApi = message;
  const [fileList, setFileList] = useState([]);
  const [dataTaiKhoan, setDataTaiKhoan] = useState([]);
  const saveNhanVien = async () => {
    try {
      const values = await form.validateFields();

      const formData = {
        MaNhanVien: props.maNhanVien || null,
        ...values,
        upload_file: values.AnhDaiDien.file,
      };

      const res = await apiSaveNhanVien(formData);
      if (res) {
        messageApi.success("Cập nhập thành công.");
        props.loadData();
        props.cancelModal();
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      messageApi.error("Lỗi: " + error);
    }
  };

  const loadDataUpdate = async (id) => {
    let res = await apiGetNhanVien(id);
    if (res?.status_code === 200) {
      form.setFieldsValue(res.data);

      if (res?.data?.AnhDaiDien) {
        setFileList([
          {
            uid: "-1",
            name: res?.data.AnhDaiDien,
            status: "done",
            url: uploads() + res?.data.AnhDaiDien,
          },
        ]);
      }
    }
  };

  const loadDataTK = async () => {
    let res = await apiGetNhanVienbyTaiKhoan();
    if (res?.status_code === 200) {
      setDataTaiKhoan(res?.data);
    }
  };

  useEffect(() => {
    form.resetFields();
    setFileList([]);
    loadDataTK();
    if (props.maNhanVien !== "") {
      loadDataUpdate(props.maNhanVien);
    }
  }, [props.maNhanVien]);

  const handleCancelModal = () => {
    props.cancelModal();
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <Modal
      title="Cập nhật thông tin khách hàng"
      open={props.open}
      onOk={saveNhanVien}
      onCancel={handleCancelModal}
      width={800}
      okText="Lưu"
      cancelText="Huỷ bỏ"
    >
      <Form {...formItemLayout} style={{ maxWidth: 800 }} form={form}>
        <Form.Item
          label="Tên nhân viên"
          name="TenNhanVien"
          rules={[{ required: true, message: "Vui lòng nhập Tên nhân viên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="SĐT"
          name="SoDienThoai"
          rules={[
            { required: true, message: "Vui lòng nhập SĐT!" },
            {
              min: 10,
              max: 11,
              message: "nhập 10 hoặc 11 số !",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Chức vụ"
          name="ChucVu"
          rules={[{ required: true, message: "Vui lòng nhập chức vụ!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lương"
          name="Luong"
          rules={[{ required: true, message: "Vui lòng nhập Lương!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="DiaChi"
          rules={[{ required: true, message: "Vui lòng nhập Địa chỉ!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mã tài khoản"
          name="TaiKhoanID"
          rules={[{ required: true, message: "Vui lòng chọn mã tài khoản!" }]}
        >
          <Select
            placeholder="Lựa chọn tài khoản"
            disabled={!!props.maNhanVien}
          >
            {dataTaiKhoan?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Hình ảnh"
          name="AnhDaiDien"
          rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture"
            maxCount={1}
            fileList={fileList}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NhanVienUpdate;
