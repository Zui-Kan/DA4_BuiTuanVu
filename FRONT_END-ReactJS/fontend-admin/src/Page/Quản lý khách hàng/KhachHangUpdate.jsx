import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, Upload, message, Select } from "antd";
import {
  apiGetKhachHang,
  apiGetKhachHangbyTaiKhoan,
  apiSaveKhachHang,
} from "../../services/KhachHang.service";
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

const KhachHangUpdate = (props) => {
  const [form] = Form.useForm();
  const messageApi = message;
  const [fileList, setFileList] = useState([]);
  const [dataTaiKhoan, setDataTaiKhoan] = useState([]);
  const saveKhachHang = async () => {
    try {
      const values = await form.validateFields();

      const formData = {
        maKhachHang: props.maKhachHang || null,
        ...values,
      };

      const res = await apiSaveKhachHang(formData);
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
    let res = await apiGetKhachHang(id);
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
    let res = await apiGetKhachHangbyTaiKhoan();
    if (res?.status_code === 200) {
      setDataTaiKhoan(res?.data);
    }
  };

  useEffect(() => {
    form.resetFields();
    setFileList([]);
    loadDataTK();
    if (props.maKhachHang !== "") {
      loadDataUpdate(props.maKhachHang);
    }
  }, [props.maKhachHang]);

  const handleCancelModal = () => {
    props.cancelModal();
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <Modal
      title="Cập nhật thông tin khách hàng"
      open={props.open}
      onOk={saveKhachHang}
      onCancel={handleCancelModal}
      width={800}
      okText="Lưu"
      cancelText="Huỷ bỏ"
    >
      <Form {...formItemLayout} style={{ maxWidth: 800 }} form={form}>
        <Form.Item
          label="Mã tài khoản"
          name="TaiKhoanID"
          rules={[{ required: true, message: "Vui lòng chọn mã tài khoản!" }]}
        >
          <Select placeholder="Lựa chọn tài khoản">
            {dataTaiKhoan?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Họ tên"
          name="HoVaTen"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="SDT"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              min: 10,
              max: 11,
              message: "nhập tối thiểu 10 số !",
            },
          ]}
        >
          <Input type="number" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ Email"
          name="Email"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ email!" },
            {
              type: "email",
              message: "Không đúng định dang emai, abc@abc.abc",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Chứng minh nhân dân"
          name="CMND"
          rules={[
            { required: true, message: "Vui lòng nhập CMND!" },
            {
              min: 12,
              max: 12,
              message: "nhập 12 số !",
            },
          ]}
        >
          <Input type="number" maxLength={12} />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="GioiTinh"
          rules={[{ required: true, message: "Vui lòng nhập giới tính!" }]}
        >
          <Select>
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Nữ">Nữ</Select.Option>
            <Select.Option value="Khác">Khác</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="DiaChi"
          rules={[{ required: true, message: "Vui lòng nhập Địa chỉ!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default KhachHangUpdate;
