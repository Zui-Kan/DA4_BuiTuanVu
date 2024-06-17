import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  apiModelSave,
  apiSavePhienBan,
  apiSaveThongSoKyThuat,
} from "../../services/ModelXe.service";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modelState, phienBanState } from "../../constant/recoil";

const formItemLayout = {
  labelCol: { xs: { span: 5 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const UpdateThongSoKyThuat = (props) => {
  const [form] = Form.useForm();
  const [dataModel, setDataModel] = useRecoilState(modelState);
  const [dataPhienBan, setDataPhienBan] = useRecoilState(phienBanState);
  const messageApi = message;
  const navigate = useNavigate();

  // Hàm chuyển đổi chuỗi phân tách bằng dấu phẩy thành mảng JSON
  const convertToJsonArray = (str) => {
    return JSON.stringify(str.split(",").map((item) => item.trim()));
  };

  const handleFinishChange = async (values) => {
    try {
      // Chuyển đổi các chuỗi thành mảng JSON
      const convertedValues = {
        ...values,
        PhienBanXe: convertToJsonArray(values.PhienBanXe),
        LoaiDongCo: convertToJsonArray(values.LoaiDongCo),
        LoaiHieuDong: convertToJsonArray(values.LoaiHieuDong),
        MauSac: convertToJsonArray(values.MauSac),
        CongSuat: convertToJsonArray(values.CongSuat),
        MoMenXoan: convertToJsonArray(values.MoMenXoan),
        LoaiNhienLieu: convertToJsonArray(values.LoaiNhienLieu),
        KichThuoc: convertToJsonArray(values.KichThuoc),
        NhienLieuTieuThu100KM: convertToJsonArray(values.NhienLieuTieuThu100KM),
        HopSo: convertToJsonArray(values.HopSo),
        TuiKhi: convertToJsonArray(values.TuiKhi),
        TrongLuong: convertToJsonArray(values.TrongLuong),
      };

      // Gọi API lưu model'

      const req = await apiModelSave(null, dataModel);
      if (req?.status_code === 200) {
        // Lưu phiên bản và thông số kỹ thuật
        const [res, thongso] = await Promise.all([
          apiSavePhienBan(req?.data, dataPhienBan),
          apiSaveThongSoKyThuat(req?.data, convertedValues),
        ]);
        if (thongso?.status_code === 200) {
          messageApi.success("Tạo thành công");
          navigate("/modelxe");
        } else {
          messageApi.error("Lỗi khi tạo model");
        }
      } else {
        messageApi.error("Lỗi khi tạo model");
      }
    } catch (error) {
      messageApi.error("Lỗi khi gọi API: " + error.message);
      console.error("Lỗi chi tiết: ", error);
    }
  };

  useEffect(() => {
    props.registerFormSubmit(() => form.submit());
  }, [form, props]);

  return (
    <div>
      <Form {...formItemLayout} form={form} onFinish={handleFinishChange}>
        <Form.Item
          label="Tên phiên bản"
          name="PhienBanXe"
          rules={[{ required: true, message: "Vui lòng nhập tên phiên bản!" }]}
        >
          <Input placeholder="Nhập Tên phiên bản, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Loại động cơ"
          name="LoaiDongCo"
          rules={[{ required: true, message: "Vui lòng nhập Loại động cơ!" }]}
        >
          <Input placeholder="Nhập Loại động cơ, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Loại hiệu động"
          name="LoaiHieuDong"
          rules={[{ required: true, message: "Vui lòng nhập Loại hiệu động!" }]}
        >
          <Input placeholder="Nhập Loại hiệu động, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Màu sắc"
          name="MauSac"
          rules={[{ required: true, message: "Vui lòng nhập Màu sắc!" }]}
        >
          <Input placeholder="Nhập Màu sắc, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Công suất"
          name="CongSuat"
          rules={[{ required: true, message: "Vui lòng nhập Công suất!" }]}
        >
          <Input placeholder="Nhập Công suất, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Momen Xoắn"
          name="MoMenXoan"
          rules={[{ required: true, message: "Vui lòng nhập Momen Xoắn!" }]}
        >
          <Input placeholder="Nhập Momen Xoắn, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Loại nhiên liệu"
          name="LoaiNhienLieu"
          rules={[
            { required: true, message: "Vui lòng nhập Loại nhiên liệu!" },
          ]}
        >
          <Input placeholder="Nhập Loại nhiên liệu, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Kích thước"
          name="KichThuoc"
          rules={[{ required: true, message: "Vui lòng nhập Kích thước!" }]}
        >
          <Input placeholder="Nhập Kích thước, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Nhiên liệu tiêu thụ / 100km"
          name="NhienLieuTieuThu100KM"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Nhiên liệu tiêu thụ / 100km!",
            },
          ]}
        >
          <Input placeholder="Nhập Nhiên liệu tiêu thụ / 100km, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Hộp số"
          name="HopSo"
          rules={[{ required: true, message: "Vui lòng nhập Hộp số!" }]}
        >
          <Input placeholder="Nhập Hộp số, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Số túi khí"
          name="TuiKhi"
          rules={[{ required: true, message: "Vui lòng nhập Số túi khí!" }]}
        >
          <Input placeholder="Nhập Số túi khí, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
        <Form.Item
          label="Trọng lượng xe"
          name="TrongLuong"
          rules={[{ required: true, message: "Vui lòng nhập Trọng lượng xe!" }]}
        >
          <Input placeholder="Nhập trọng lượng xe, phân tách bằng dấu phẩy VD: a,b,c" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateThongSoKyThuat;
