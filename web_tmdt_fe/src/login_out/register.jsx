import React from "react";
import { Form, Input, Button, Checkbox, message, Layout } from "antd";
import {
  IdcardOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const Register = () => {
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/auth/register", {
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone,
        address: values.address,
        password: values.password,
        repeatPassword: values.repeatPassword,
      });
      message.success("Đăng ký thành công! Vui lòng đăng nhập.");
      registerForm.resetFields();
      navigate("/login");
    } catch (error) {
      message.error("Đăng ký thất bại. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Content
        className="flex items-center justify-center p-4 bg-gray-50"
        style={{ minHeight: "1024px" }}
      >
        <div className="relative w-full max-w-5xl">
          <div className="grid grid-cols-1 bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  LONG STORE
                </h2>
                <p className="text-gray-600">Đăng ký để bắt đầu</p>
              </div>

              <Form
                form={registerForm}
                name="register"
                onFinish={handleRegister}
                layout="vertical"
                size="large"
                className="mt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ tên!" },
                    ]}
                  >
                    <Input
                      prefix={<IdcardOutlined />}
                      placeholder="Họ và tên"
                      className="h-12"
                    />
                  </Form.Item>

                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập!",
                      },
                      {
                        min: 4,
                        max: 20,
                        message: "Tên đăng nhập phải từ 4 đến 20 ký tự!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Tên đăng nhập"
                      className="h-12"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    className="h-12"
                  />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Số điện thoại"
                      className="h-12"
                    />
                  </Form.Item>

                  <Form.Item
                    name="address"
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ!" },
                    ]}
                  >
                    <Input
                      prefix={<HomeOutlined />}
                      placeholder="Địa chỉ"
                      className="h-12"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                    { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className="h-12"
                  />
                </Form.Item>

                <Form.Item
                  name="repeatPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu xác nhận không khớp!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Xác nhận mật khẩu"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className="h-12"
                  />
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(
                                "Bạn cần đồng ý với điều khoản dịch vụ!"
                              )
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    Tôi đồng ý với{" "}
                    <a className="text-blue-600 hover:text-blue-800">
                      Điều khoản dịch vụ
                    </a>{" "}
                    và{" "}
                    <a className="text-blue-600 hover:text-blue-800">
                      Chính sách bảo mật
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                    loading={loading}
                  >
                    Đăng Ký
                  </Button>
                </Form.Item>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Đã có tài khoản?
                    <a
                      className="text-blue-600 hover:text-blue-800 ml-1 font-medium cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      Đăng nhập
                    </a>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Register;
