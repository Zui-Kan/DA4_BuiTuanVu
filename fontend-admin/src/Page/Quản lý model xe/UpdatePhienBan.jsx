import React, { useEffect } from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiGetModelXe } from "../../services/ModelXe.service";
import "./UpdatePhienBan.css";
import { modelState } from "../../constant/recoil";
import { useRecoilState } from "recoil";

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const UpdatePhienBan = (props) => {
  const [form] = Form.useForm();
  const [dataModel, setDataModel] = useRecoilState(modelState);

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
    // Giải nén file từ thành phần tải lên
    const modifiedValues = await { ...values };
    modifiedValues.phienBans.forEach((phienBan) => {
      phienBan.mauNgoaiThats.forEach((mauNgoaiThat) => {
        mauNgoaiThat.HinhAnhMauNgoaiThat =
          mauNgoaiThat.HinhAnhMauNgoaiThat.file;
        mauNgoaiThat.mauNoiThats.forEach((mauNoiThat) => {
          mauNoiThat.HinhAnhMauNoiThat = mauNoiThat.HinhAnhMauNoiThat.file;
        });
      });
    });

    await setDataModel((prevDataModel) => ({
      ...prevDataModel,
      ...modifiedValues,
    }));
    props.nextPhu();
  };

  useEffect(() => {
    props.registerFormSubmit(form.submit);
  }, [form]);
  console.log(dataModel);

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
      {/* <hr />
      <div className="khung-btn_xacnhan">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </div> */}
    </Form>
  );
};

export default UpdatePhienBan;
