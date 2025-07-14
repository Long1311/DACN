import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Modal,
  Layout,
  Dropdown,
  Avatar,
  Spin,
  Menu,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Header, Content } = Layout;

const Login = () => {
  const [loginForm] = Form.useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    try {
      if (
        token &&
        savedUser &&
        savedUser !== "undefined" &&
        savedUser !== "null"
      ) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Lỗi khi parse user từ localStorage:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: values.username,
          password: values.password,
        }
      );

      const { token, userResponse } = response.data;

      // Lưu vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userResponse));
      // localStorage.removeItem("token");

      setUser(userResponse);
      message.success("Đăng nhập thành công!");
      if (
  (userResponse.roles &&
    Array.isArray(userResponse.roles) &&
    userResponse.roles.includes("ROLE_ADMIN")) ||
  userResponse.quyentruycap === "admin"
) {
  navigate("/admin");
} else {
  navigate("/");
}

    } catch (error) {
      message.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Modal.confirm({
      title: "Xác nhận đăng xuất",
      content: "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?",
      okText: "Đăng xuất",
      cancelText: "Hủy",
      onOk: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // ⬅ xóa thêm user
        setUser(null);
        message.success("Đăng xuất thành công!");
      },
    });
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <UserOutlined /> Thông tin cá nhân
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Đang tải..." fullscreen />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header className="flex items-center justify-between px-6 bg-white shadow">
        <div
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          LONG STORE
        </div>
        {user && (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer">
              <Avatar icon={<UserOutlined />} className="bg-blue-500" />
              <span className="ml-2 mr-1 text-gray-800">
                {user?.name || "User"}
              </span>
              <DownOutlined className="text-xs text-gray-600" />
            </div>
          </Dropdown>
        )}
      </Header>

      <Content className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng Nhập</h2>
            <p className="text-gray-500">Chào mừng bạn trở lại!</p>
          </div>

          <Form
            form={loginForm}
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Tên đăng nhập hoặc Email"
                className="rounded-md h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="rounded-md h-12"
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-4">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <a className="text-blue-600 hover:text-blue-800 text-sm" href="#">
                Quên mật khẩu?
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium rounded-md"
                loading={loading}
              >
                Đăng Nhập
              </Button>
            </Form.Item>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">
                Hoặc đăng nhập với
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="flex justify-between gap-4">
              <Button className="w-1/2 h-12 border border-gray-300 hover:bg-gray-50 flex items-center justify-center rounded-md">
                <i className="fab fa-google text-red-500 mr-2"></i> Google
              </Button>
              <Button className="w-1/2 h-12 border border-gray-300 hover:bg-gray-50 flex items-center justify-center rounded-md">
                <i className="fab fa-facebook-f text-blue-600 mr-2"></i>{" "}
                Facebook
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Chưa có tài khoản?
                <a
                  className="text-blue-600 hover:text-blue-800 ml-1 font-medium cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Đăng ký ngay
                </a>
              </p>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
