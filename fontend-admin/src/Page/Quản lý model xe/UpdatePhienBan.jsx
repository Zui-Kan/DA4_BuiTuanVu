import React, { useEffect } from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiGetModelXe, apiSavePhienBan } from "../../services/ModelXe.service";
import "./UpdatePhienBan.css";
import { phienBanState } from "../../constant/recoil";
import { useRecoilState } from "recoil";

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const UpdatePhienBan = (props) => {
  const [form] = Form.useForm();
  const [dataPhienBan, setDataPhienBan] = useRecoilState(phienBanState);

  const loadDataUpdate = async (id) => {
    const res = await apiGetModelXe(id);
    if (res?.status_code === 200) {
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    form.resetFields();
    if (props.maModelXe) {
      loadDataUpdate(props.maModelXe);
    } else {
      // Thêm logic mặc định
      form.setFieldsValue({
        phienBans: [
          {
            TenPhienBan: "",
            mauNgoaiThats: [
              {
                TenMauNgoaiThat: "",
                HinhAnhMauNgoaiThat: null,
                mauNoiThats: [
                  {
                    TenMauNoiThat: "",
                    SoLuong: "",
                    HinhAnhMauNoiThat: null,
                  },
                ],
              },
            ],
          },
        ],
      });
    }
  }, [props.maModelXe]);

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData(); // Tạo một FormData mới

      values.phienBans.forEach((phienBan, phienBanIndex) => {
        formData.append(
          `phienBans[${phienBanIndex}][TenPhienBan]`,
          phienBan.TenPhienBan
        );

        phienBan.mauNgoaiThats.forEach((mauNgoaiThat, ngoaiThatIndex) => {
          formData.append(
            `phienBans[${phienBanIndex}][mauNgoaiThats][${ngoaiThatIndex}][TenMauNgoaiThat]`,
            mauNgoaiThat.TenMauNgoaiThat
          );

          if (mauNgoaiThat.HinhAnhMauNgoaiThat.file instanceof File) {
            formData.append(
              `phienBans[${phienBanIndex}][mauNgoaiThats][${ngoaiThatIndex}][HinhAnhMauNgoaiThat]`,
              mauNgoaiThat.HinhAnhMauNgoaiThat.file
            );
          }

          mauNgoaiThat.mauNoiThats.forEach((mauNoiThat, noiThatIndex) => {
            formData.append(
              `phienBans[${phienBanIndex}][mauNgoaiThats][${ngoaiThatIndex}][mauNoiThats][${noiThatIndex}][TenMauNoiThat]`,
              mauNoiThat.TenMauNoiThat
            );
            formData.append(
              `phienBans[${phienBanIndex}][mauNgoaiThats][${ngoaiThatIndex}][mauNoiThats][${noiThatIndex}][SoLuong]`,
              mauNoiThat.SoLuong
            );

            if (mauNoiThat.HinhAnhMauNoiThat.file instanceof File) {
              formData.append(
                `phienBans[${phienBanIndex}][mauNgoaiThats][${ngoaiThatIndex}][mauNoiThats][${noiThatIndex}][HinhAnhMauNoiThat]`,
                mauNoiThat.HinhAnhMauNoiThat.file
              );
            }
          });
        });
      });

      // Kiểm tra dữ liệu FormData trước khi gửi
      for (let [key, value] of formData.entries()) {
        console.log(key, value); // Xem các giá trị của FormData
      }

      setDataPhienBan(formData);
      props.nextPhu();
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  useEffect(() => {
    props.registerFormSubmit(form.submit);
  }, [form]);

  return (
    <Form {...formItemLayout} form={form} onFinish={handleFormSubmit}>
      <Form.List name="phienBans">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} className="phien-ban">
                <div className="header-phienban">
                  Phiên bản {key + 1}
                  <Button
                    type="text"
                    danger
                    onClick={() => remove(name)}
                    className="remove-btn"
                  >
                    X
                  </Button>
                </div>
                <Form.Item
                  {...restField}
                  label="Tên phiên bản"
                  name={[name, "TenPhienBan"]}
                  fieldKey={[fieldKey, "TenPhienBan"]}
                  rules={[
                    { required: true, message: "Vui lòng nhập tên phiên bản!" },
                  ]}
                >
                  <Input placeholder="Tên phiên bản" />
                </Form.Item>

                <Form.List name={[name, "mauNgoaiThats"]}>
                  {(fields, { add, remove }) => (
                    <div className="khungmaungoaithat">
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <div key={key} className="mau-ngoai-that">
                          <div className="header-maungoaithat">
                            Màu ngoại thất {key + 1}
                            <Button
                              type="text"
                              danger
                              onClick={() => remove(name)}
                              className="remove-btn"
                            >
                              X
                            </Button>
                          </div>
                          <Form.Item
                            {...restField}
                            label="Tên ngoại thất"
                            name={[name, "TenMauNgoaiThat"]}
                            fieldKey={[fieldKey, "TenMauNgoaiThat"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên màu ngoại thất!",
                              },
                            ]}
                          >
                            <Input placeholder="Tên màu ngoại thất" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label="Ảnh màu"
                            name={[name, "HinhAnhMauNgoaiThat"]}
                            fieldKey={[fieldKey, "HinhAnhMauNgoaiThat"]}
                            rules={[
                              { required: true, message: "Vui chọn hình ảnh!" },
                            ]}
                          >
                            <Upload
                              beforeUpload={() => false}
                              listType="picture"
                              maxCount={1}
                            >
                              <Button icon={<UploadOutlined />}>
                                Tải lên hình ảnh
                              </Button>
                            </Upload>
                          </Form.Item>
                          <div className="khung-mau-noi-that">
                            <Form.List name={[name, "mauNoiThats"]}>
                              {(fields, { add, remove }) => (
                                <>
                                  {fields.map(
                                    ({ key, name, fieldKey, ...restField }) => (
                                      <div key={key} className="mau-noi-that">
                                        <div className="header-maunoithat">
                                          Màu nội thất {key + 1}
                                          <Button
                                            type="text"
                                            danger
                                            onClick={() => remove(name)}
                                            className="remove-btn"
                                          >
                                            X
                                          </Button>
                                        </div>
                                        <Form.Item
                                          {...restField}
                                          label="Tên nội thất"
                                          name={[name, "TenMauNoiThat"]}
                                          fieldKey={[fieldKey, "TenMauNoiThat"]}
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Vui lòng nhập tên màu nội thất!",
                                            },
                                          ]}
                                        >
                                          <Input placeholder="Tên màu nội thất" />
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          label="Số lượng"
                                          name={[name, "SoLuong"]}
                                          fieldKey={[fieldKey, "SoLuong"]}
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Vui lòng nhập số lượng!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            type="number"
                                            placeholder="Số lượng"
                                          />
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          label="Ảnh màu"
                                          name={[name, "HinhAnhMauNoiThat"]}
                                          fieldKey={[
                                            fieldKey,
                                            "HinhAnhMauNoiThat",
                                          ]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "Vui chọn hình ảnh!",
                                            },
                                          ]}
                                        >
                                          <Upload
                                            beforeUpload={() => false}
                                            listType="picture"
                                            maxCount={1}
                                          >
                                            <Button icon={<UploadOutlined />}>
                                              Tải lên hình ảnh
                                            </Button>
                                          </Upload>
                                        </Form.Item>
                                      </div>
                                    )
                                  )}
                                  <div className="btn-themmaungoaithat">
                                    <Button type="text" onClick={() => add()}>
                                      Thêm màu nội thất
                                    </Button>
                                  </div>
                                </>
                              )}
                            </Form.List>
                          </div>
                        </div>
                      ))}
                      <div className="btn-themmaungoaithat">
                        <Button
                          type="link"
                          onClick={() =>
                            add({
                              TenMauNgoaiThat: "",
                              HinhAnhMauNgoaiThat: null,
                              mauNoiThats: [
                                {
                                  TenMauNoiThat: "",
                                  SoLuong: "",
                                  HinhAnhMauNoiThat: null,
                                },
                              ],
                            })
                          } // Thêm logic mặc định cho màu nội thất
                        >
                          Thêm màu ngoại thất
                        </Button>
                      </div>
                    </div>
                  )}
                </Form.List>
              </div>
            ))}
            <div className="btn-themmaungoaithat">
              <Button
                onClick={() =>
                  add({
                    TenPhienBan: "",
                    mauNgoaiThats: [
                      {
                        TenMauNgoaiThat: "",
                        HinhAnhMauNgoaiThat: null,
                        mauNoiThats: [
                          {
                            TenMauNoiThat: "",
                            SoLuong: "",
                            HinhAnhMauNoiThat: null,
                          },
                        ],
                      },
                    ],
                  })
                } // Thêm logic mặc định cho màu ngoại thất và màu nội thất khi thêm phiên bản
              >
                Thêm phiên bản
              </Button>
            </div>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default UpdatePhienBan;
