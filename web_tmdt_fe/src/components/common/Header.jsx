import React, { useState, useEffect } from "react";
import {
  Layout,
  Input,
  Badge,
  Avatar,
  Dropdown,
  Button,
  List,
  Spin,
  Popover,
} from "antd";
import {
  SearchOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

const { Header } = Layout;

const HeaderComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [cartCount, setCartCount] = useState(
    parseInt(localStorage.getItem("cartCount")) || 0
  );
  const navigate = useNavigate();

  const loadUser = () => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Lắng nghe sự kiện user-updated
  useEffect(() => {
    const handleUserUpdate = () => {
      loadUser();
    };

    window.addEventListener("user-updated", handleUserUpdate);
    return () => window.removeEventListener("user-updated", handleUserUpdate);
  }, []);

  const fetchCartCount = async () => {
    if (!user) {
      setCartCount(0);
      localStorage.setItem("cartCount", "0");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const items = res.data.cartItems || [];
      const count = items.length;
      setCartCount(count);
      localStorage.setItem("cartCount", count);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  const fetchCompletedOrders = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:8080/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const completedOrders = res.data.filter(
        (order) => order.status === "HOAN_THANH"
      );
      setNotificationCount(completedOrders.length);
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err);
    }
  };

  useEffect(() => {
    fetchCompletedOrders();
    fetchCartCount();
  }, [user]);

  useEffect(() => {
    window.addEventListener("cart-updated", fetchCartCount);
    return () => {
      window.removeEventListener("cart-updated", fetchCartCount);
    };
  }, [user]);

  const fetchSuggestions = debounce(async (query) => {
    if (!query) return setSuggestions([]);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/variants/search/keyword?keyword=${query}&size=5`
      );
      setSuggestions(response.data.content || []);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    } finally {
      setIsLoading(false);
    }
  }, 400);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    fetchSuggestions(value);
  };

  const handleSelectSuggestion = (id) => {
    setSuggestions([]);
    setSearchValue("");
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      navigate(`/search?query=${searchValue}`);
      setSuggestions([]);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  const userMenuItems = user
    ? [
      { key: "1", label: `Xin chào, ${user.name}`, disabled: true },
      {
        key: "2",
        label: "Đổi mật khẩu",
        onClick: () => navigate("/ChangePassword"),
      },
      {
        key: "3",
        label: "Thông tin cá nhân",
        onClick: () => navigate("/profile"),
      },
      { key: "4", label: "Đăng xuất", onClick: handleLogout },
    ]
    : [
      { key: "1", label: "Đăng nhập", onClick: () => navigate("/login") },
      { key: "2", label: "Đăng ký", onClick: () => navigate("/register") },
    ];

  const notificationContent = user ? (
    <div style={{ width: 250 }}>
      {notificationCount > 0 ? (
        <div>
          <p>✅ Bạn có {notificationCount} đơn hàng đã hoàn thành.</p>
          <Button
            type="link"
            onClick={() => {
              setNotificationCount(0);
              navigate("/orders");
            }}
          >
            Xem chi tiết
          </Button>
        </div>
      ) : (
        <p>🔔 Không có đơn hàng nào hoàn thành.</p>
      )}
    </div>
  ) : (
    <div style={{ width: 250 }}>
      <p>🔔 Vui lòng đăng nhập để xem thông báo.</p>
      <Button type="link" onClick={() => navigate("/login")}>
        Đăng nhập
      </Button>
    </div>
  );

  return (
    <Header className="bg-white shadow-sm flex items-center justify-between px-4 md:px-6 h-16 fixed w-full z-[1000]">
      <div className="flex items-center">
        <div
          className="text-2xl font-bold text-blue-600 cursor-pointer flex items-center whitespace-nowrap"
          onClick={() => navigate("/")}
        >
          LongStore
        </div>
      </div>

      <div className="relative flex-1 max-w-xl mx-4 z-[1001]">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchValue}
          onChange={handleChange}
          onPressEnter={handleSearchSubmit}
          size="large"
          className="rounded-full"
        />
        {searchValue && suggestions.length > 0 && (
          <div
            className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 border border-gray-200 max-h-80 overflow-auto"
            style={{ zIndex: 99999 }}
          >
            {isLoading ? (
              <div className="p-4 text-center">
                <Spin />
              </div>
            ) : (
              <List
                dataSource={suggestions}
                renderItem={(item) => (
                  <List.Item
                    className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    onClick={() => handleSelectSuggestion(item.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={`http://localhost:8080/images/products/${item.imageUrl}`}
                        alt={item.tensp}
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <div>
                        <div className="font-medium">{item.tensp}</div>
                        <div className="text-sm text-gray-500">
                          Màu: {item.color} | Dung lượng: {item.storage}
                        </div>
                        <div className="text-sm text-blue-600 font-semibold">
                          {item.gia?.toLocaleString("vi-VN")} ₫
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div className="cursor-pointer flex items-center">
            <Avatar
              src={user?.avatarUrl || null}
              icon={!user?.avatarUrl ? <UserOutlined /> : null}
              className="bg-blue-500"
            />
            <span className="ml-2">{user ? user.name : "Tài khoản"}</span>
          </div>
        </Dropdown>

        <Popover
          content={notificationContent}
          title="Thông báo"
          trigger={["hover", "click"]}
        >
          <Badge count={user ? notificationCount : 0} showZero={false}>
            <BellOutlined className="text-2xl cursor-pointer" />
          </Badge>
        </Popover>

        <Badge count={cartCount} showZero={false}>
          <ShoppingCartOutlined
            className="text-2xl cursor-pointer"
            onClick={handleCartClick}
          />
        </Badge>
      </div>
    </Header>
  );
};

export default HeaderComponent;
