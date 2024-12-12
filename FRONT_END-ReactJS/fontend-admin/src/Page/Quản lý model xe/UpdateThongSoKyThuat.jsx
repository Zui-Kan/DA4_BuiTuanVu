import React, { useEffect, useState } from "react";
import { Form, Input, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

import {
  apiModelSave,
  apiSavePhienBan,
  apiSaveThongSoKyThuat,
} from "../../services/ModelXe.service";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modelState, phienBanState } from "../../constant/recoil";
import Loading from "../../Component/Loading/Loading";

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
  const [loading, setLoading] = useState(false);
  const [thongSoKyThuatList, setThongSoKyThuatList] = useState([
    {
      PhienBanXe: "",
      LoaiDongCo: "",
      LoaiHieuDong: "",
      MauSac: "",
      CongSuat: "",
      MoMenXoan: "",
      LoaiNhienLieu: "",
      KichThuoc: "",
      NhienLieuTieuThu100KM: "",
      HopSo: "",
      TuiKhi: "",
      TrongLuong: "",
    },
  ]);

  const handleFinishChange = async (values) => {
    setLoading(true);
    try {
      // Chuyển đổi mảng thông số kỹ thuật thành object mới
      const convertedThongSoList = thongSoKyThuatList.reduce((result, thongSo) => {
        Object.entries(thongSo).forEach(([key, value]) => {
          if (!result[key]) {
            result[key] = [];
          }
          result[key].push(value);
        });
        return result;
      }, {});

      // Chuyển các mảng trong convertedThongSoList thành chuỗi JSON
      const stringifiedThongSoList = {};
      for (const key in convertedThongSoList) {
        stringifiedThongSoList[key] = JSON.stringify(convertedThongSoList[key]);
      }

      // Gọi API lưu model và thông số kỹ thuật
      const req = await apiModelSave(null, dataModel);
      if (req?.status_code === 200) {
        const [res, thongso] = await Promise.all([
          apiSavePhienBan(req?.data, dataPhienBan),
          apiSaveThongSoKyThuat(req?.data, stringifiedThongSoList),
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
    setLoading(false);
  };

  const handleAddThongSo = () => {
    setThongSoKyThuatList([
      ...thongSoKyThuatList,
      {
        PhienBanXe: "",
        LoaiDongCo: "",
        LoaiHieuDong: "",
        MauSac: "",
        CongSuat: "",
        MoMenXoan: "",
        LoaiNhienLieu: "",
        KichThuoc: "",
        NhienLieuTieuThu100KM: "",
        HopSo: "",
        TuiKhi: "",
        TrongLuong: "",
      },
    ]);
  };

  // Hàm xoá object khỏi mảng thông số kỹ thuật
  const handleRemoveThongSo = (index) => {
    setThongSoKyThuatList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  useEffect(() => {
    props.registerFormSubmit(() => form.submit());
  }, [form, props]);

  return (
    <div>
      {loading && <Loading />}
      <Form {...formItemLayout} form={form} onFinish={handleFinishChange}>
        {thongSoKyThuatList.map((thongSo, index) => (
          <div key={index}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={() => handleRemoveThongSo(index)}
              >
                Xoá
              </Button>
            </div>
            <Form.Item
              label="Tên phiên bản"
              name={`PhienBanXe-${index}`}
              rules={[
                { required: true, message: "Vui lòng nhập tên phiên bản!" },
              ]}
            >
              <Input
                placeholder="Nhập Tên phiên bản, phân tách bằng dấu phẩy  "
                value={thongSo.PhienBanXe}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].PhienBanXe = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Loại động cơ"
              name={`LoaiDongCo-${index}`}
              rules={[
                { required: true, message: "Vui lòng nhập Loại động cơ!" },
              ]}
            >
              <Input
                placeholder="Nhập Loại động cơ, phân tách bằng dấu phẩy  "
                value={thongSo.LoaiDongCo}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].LoaiDongCo = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Loại hiệu động"
              name={`LoaiHieuDong-${index}`}
              rules={[
                { required: true, message: "Vui lòng nhập Loại hiệu động!" },
              ]}
            >
              <Input
                placeholder="Nhập Loại hiệu động, phân tách bằng dấu phẩy  "
                value={thongSo.LoaiHieuDong}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].LoaiHieuDong = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Màu sắc"
              name={`MauSac-${index}`}
              rules={[{ required: true, message: "Vui lòng nhập Màu sắc!" }]}
            >
              <Input
                placeholder="Nhập Màu sắc, phân tách bằng dấu phẩy  "
                value={thongSo.MauSac}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].MauSac = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Công suất"
              name={`CongSuat-${index}`}
              rules={[{ required: true, message: "Vui lòng nhập Công suất!" }]}
            >
              <Input
                placeholder="Nhập Công suất, phân tách bằng dấu phẩy  "
                value={thongSo.CongSuat}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].CongSuat = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Momen Xoắn"
              name={`MoMenXoan-${index}`}
              rules={[{ required: true, message: "Vui lòng nhập Momen Xoắn!" }]}
            >
              <Input
                placeholder="Nhập Momen Xoắn, phân tách bằng dấu phẩy  "
                value={thongSo.MoMenXoan}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].MoMenXoan = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Loại nhiên liệu"
              name={`LoaiNhienLieu-${index}`}
              rules={[
                { required: true, message: "Vui lòng nhập Loại nhiên liệu!" },
              ]}
            >
              <Input
                placeholder="Nhập Loại nhiên liệu, phân tách bằng dấu phẩy  "
                value={thongSo.LoaiNhienLieu}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].LoaiNhienLieu = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Kích thước"
              name={`KichThuoc-${index}`}
              rules={[{ required: true, message: "Vui lòng nhập Kích thước!" }]}
            >
              <Input
                placeholder="Nhập Kích thước, phân tách bằng dấu phẩy  "
                value={thongSo.KichThuoc}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].KichThuoc = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Nhi��n liệu tiêu thụ / 100km"
              name={`NhienLieuTieuThu100KM-${index}`}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Nhiên liệu tiêu thụ / 100km!",
                },
              ]}
            >
              <Input
                placeholder="Nhập Nhiên liệu tiêu thụ / 100km, phân tách bằng dấu phẩy  "
                value={thongSo.NhienLieuTieuThu100KM}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].NhienLieuTieuThu100KM = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Hộp số"
              name={`HopSo-${index}`}
              rules={[{ required: true, message: "Vui lòng nhập Hộp số!" }]}
            >
              <Input
                placeholder="Nhập Hộp số, phân tách bằng dấu phẩy  "
                value={thongSo.HopSo}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].HopSo = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Số túi khí"
              name={`TuiKhi-${index}`}
              rules={[{ required: true, message: "Vui lòng nhập Số túi khí!" }]}
            >
              <Input
                placeholder="Nhập Số túi khí, phân tách bằng dấu phẩy  "
                value={thongSo.TuiKhi}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].TuiKhi = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Trọng lượng xe"
              name={`TrongLuong-${index}`}
              rules={[
                { required: true, message: "Vui lòng nhập Trọng lượng xe!" },
              ]}
            >
              <Input
                placeholder="Nhập trọng lượng xe, phân tách bằng dấu phẩy  "
                value={thongSo.TrongLuong}
                onChange={(e) =>
                  setThongSoKyThuatList((prevList) => {
                    const newList = [...prevList];
                    newList[index].TrongLuong = e.target.value;
                    return newList;
                  })
                }
              />
            </Form.Item>
          </div>
        ))}
        <div
          style={{ marginTop: 10, display: "flex", justifyContent: "center" }}
        >
          <Button onClick={handleAddThongSo}>Thêm thông số kỹ thuật</Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateThongSoKyThuat;
