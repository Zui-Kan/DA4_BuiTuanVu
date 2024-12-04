import React, { useEffect, useRef, useState } from "react";
import { Modal, Select, Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  apiGetModelXe,
  apiModelSave,
  apiSelectLoaiAndHang,
} from "../../services/ModelXe.service";
import { uploads } from "../../constant/api";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modelState } from "../../constant/recoil";
import MyCKEditorComponent from "../../Component/MyCKEditor";
import Loading from "../../Component/Loading/Loading";

const formItemLayout = {
  labelCol: { xs: { span: 5 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const UpdateXe = (props) => {
  const [form] = Form.useForm();
  const [dataSelect, setDataSelect] = useState({ HangXe: [], LoaiXe: [] });
  const [fileList, setFileList] = useState([]);
  const [fileLists, setFileLists] = useState([]);
  const [dataModel, setDataModel] = useRecoilState(modelState);
  const [moTa, setMoTa] = useState("");
  const navigate = useNavigate();
  const messageApi = message;
  const [loading, setLoading] = useState(false);

  const loadDataUpdate = async (id) => {
    setLoading(true);
    const res = await apiGetModelXe(id);
    if (res?.status_code === 200) {
      form.setFieldsValue(res.data);
      if (res?.data?.HinhAnhXe) {
        setFileList([
          {
            uid: "-1",
            name: res?.data.HinhAnhXe,
            status: "done",
            url: uploads() + res?.data.HinhAnhXe,
          },
        ]);

        const imagePaths = JSON.parse(res?.data.DSHinhAnhXe);
        const files = imagePaths.map((path, index) => ({
          uid: index.toString(),
          name: path,
          status: "done",
          url: uploads() + path,
        }));
        setFileLists(files);
      }
      setMoTa(res.data.MoTa || "");
    }
    setLoading(false);
  };

  const loadSelect = async () => {
    const res = await apiSelectLoaiAndHang();
    if (res?.status_code === 200) {
      setDataSelect(res.data);
    }
  };

  useEffect(() => {
    form.resetFields();
    if (props.maModelXe) {
      loadDataUpdate(props.maModelXe);
    }
    loadSelect();
  }, [props.maModelXe]);

  const handleChange = ({ fileList }) => setFileList(fileList);
  const handleListChange = ({ fileList }) => setFileLists(fileList);

  const handleFinishChange = async (values) => {
    setLoading(true);
    const dulieu = await {
      TenModel: values.TenModel,
      MaHang: values.MaHang,
      MaLoaiXe: values.MaLoaiXe,
      NamSanXuat: values.NamSanXuat,
      Gia: values.Gia,
      L100: values.L100,
      NhienLieu: values.NhienLieu,
      HopSo: values.HopSo,
      MoTa: moTa,
      HinhAnhXe: values?.HinhAnhXeF?.file,
      DSHinhAnhXe: values?.DSHinhAnhXeF?.fileList.map(
        (file) => file.originFileObj
      ),
    };

    if (props.maModelXe && !props.nextPhu) {
      const res = await apiModelSave(props.maModelXe, dulieu);
      if (res?.status_code === 200) {
        messageApi.success("Cập nhật thành công ok.");
        navigate("/modelxe");
      }
    } else {
      setDataModel(dulieu);
      props.nextPhu();
    }
    setLoading(false);
  };

  useEffect(() => {
    props.registerFormSubmit(form.submit);
  }, [form]);

  return (
    <>
      {loading && <Loading />}
<Form {...formItemLayout} form={form} onFinish={handleFinishChange}>
      <Form.Item
        label="Tên xe"
        name="TenModel"
        rules={[{ required: true, message: "Vui lòng nhập tên xe!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mã loại xe"
        name="MaLoaiXe"
        rules={[{ required: true, message: "Vui lòng nhập Mã loại xe !" }]}
      >
        <Select>
          {dataSelect.LoaiXe.map((item) => (
            <Select.Option key={item.MaLoaiXe} value={item.MaLoaiXe}>
              {item.TenLoaiXe}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Mã hãng"
        name="MaHang"
        rules={[{ required: true, message: "Vui lòng nhập Mã hãng !" }]}
      >
        <Select>
          {dataSelect.HangXe.map((item) => (
            <Select.Option key={item.MaHang} value={item.MaHang}>
              {item.TenHang}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Năm sản xuất"
        name="NamSanXuat"
        rules={[
          { required: true, message: "Vui lòng nhập năm sản xuất !" },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Giá tiền"
        name="Gia"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập giá!",
          },
          {
            min: 8,
            message: "nhập tối thiểu 8 số tương đương trên 10 triệu !",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Nhiên liệu"
        name="NhienLieu"
        rules={[{ required: true, message: "Vui lòng nhập nhiên liệu !" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tiêu hao nhiên liệu / 100km"
        name="L100"
        rules={[
          { required: true, message: "Vui lòng nhập tiêu hao nhiên liệu !" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hộp số"
        name="HopSo"
        rules={[{ required: true, message: "Vui lòng nhập hộp số !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hình ảnh"
        name="HinhAnhXeF"
        rules={
          !props.maModelXe && [
            { required: true, message: "Vui lòng chọn hình ảnh!" },
          ]
        }
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

      <Form.Item
        label="Danh sách hình ảnh"
        name="DSHinhAnhXeF"
        rules={
          !props.maModelXe && [
            { required: true, message: "Vui lòng chọn danh sách hình ảnh!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && value.fileList.length >= 3) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Vui lòng chọn ít nhất 3 hình ảnh!")
                );
              },
            }),
          ]
        }
      >
        <Upload
          beforeUpload={() => false}
          listType="picture"
          fileList={fileLists}
          onChange={handleListChange}
          className="upload-list-inline"
        >
          <Button icon={<UploadOutlined />}>Tải lên danh sách hình ảnh</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Mô tả" name="MoTa" className="khung-cke">
        <MyCKEditorComponent value={moTa} onChange={setMoTa} />
      </Form.Item>
    </Form>
    </>
    
  );
};

export default UpdateXe;
