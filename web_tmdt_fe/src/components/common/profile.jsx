import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const Profile = () => {
  const [profileImage, setProfileImage] = useState("/default-avatar.jpg");
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    avatarUrl: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/users/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setUser(data);
        setPersonalInfo({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          address: data.address || "",
          avatarUrl: data.avatarUrl || "/default-avatar.jpg",
        });

        if (data.avatarUrl) {
          console.log("Avatar URL:", data.avatarUrl);
          setProfileImage(data.avatarUrl);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUser();
  }, []);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        const response = await axios.post(
          "http://localhost:8080/api/users/upload-avatar",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const imageUrl = response.data;
        setProfileImage(imageUrl);
        setPersonalInfo((prev) => ({
          ...prev,
          avatarUrl: imageUrl,
        }));
      } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
        alert("Không thể tải ảnh lên.");
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const updatedInfo = {
        name: personalInfo.name,
        phone: personalInfo.phone,
        gender: personalInfo.gender,
        address: personalInfo.address,
        avatarUrl: personalInfo.avatarUrl,
      };

      await axios.put("http://localhost:8080/api/users/profile", updatedInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = { ...user, ...updatedInfo };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("user-updated"));

      setIsEditing(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Có lỗi xảy ra khi lưu thay đổi.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="pb-5 border-b border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Thông tin cá nhân
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Quản lý thông tin cá nhân để bảo mật tài khoản
            </p>
          </div>

          {showSuccessMessage && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm text-green-700">
                Thông tin đã được cập nhật thành công!
              </p>
            </div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 border">
                    <img
                      src={profileImage}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-avatar.jpg";
                      }}
                    />
                  </div>
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <label
                        htmlFor="profile-image"
                        className="cursor-pointer bg-white rounded-full p-2 shadow-md border"
                      >
                        <i className="fas fa-camera text-gray-600"></i>
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  {isEditing
                    ? "Nhấp vào máy ảnh để đổi ảnh"
                    : "Ảnh đại diện của bạn"}
                </p>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    disabled
                    className="mt-1 block w-full border-gray-300 rounded-md bg-gray-50 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email không thể thay đổi
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Giới tính
                  </label>
                  <select
                    name="gender"
                    value={personalInfo.gender}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white mr-3"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Lưu thay đổi
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Chỉnh sửa thông tin
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;
