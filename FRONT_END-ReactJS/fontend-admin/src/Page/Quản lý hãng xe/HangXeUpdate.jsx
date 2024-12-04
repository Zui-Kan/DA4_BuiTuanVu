import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, Upload, message } from "antd";
import { apiGetHangXe, apiSaveHangXe } from "../../services/HangXe.service";
import { uploads } from "../../constant/api";
import Loading from "../../Component/Loading/Loading";

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
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveHangXe = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      const formData = {
        MaHang: props.maHangXe || null,
        TenHang: values.TenHang,
        HinhAnhHangXe: values.HinhAnhHangXe.file,
      };

      const res = await apiSaveHangXe(formData);
      if (res) {
        message.success("Cập nhập thành công.");
        props.loadData();
        props.cancelModal();
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      message.open("Lỗi: " + error);
    } finally {
      setLoading(false);
    }
  };

  const loadDataUpdate = async (id) => {
    let res = await apiGetHangXe(id);
    if (res?.status_code === 200) {
      form.setFieldsValue(res.data);

      if (res?.data?.HinhAnhHangXe) {
        setFileList([
          {
            uid: "-1",
            name: res?.data.HinhAnhHangXe,
            status: "done",
            url: uploads() + res?.data.HinhAnhHangXe,
          },
        ]);
      }
    }

  };

  useEffect(() => {
    form.resetFields();
    setFileList([]);
    if (props.maHangXe !== "") {
      loadDataUpdate(props.maHangXe);
    }
  }, [props.maHangXe]);

  const handleCancelModal = () => {
    props.cancelModal();
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <>
      {loading && <Loading />}
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
    </>
 
  );
};

export default HangXeUpdate;
