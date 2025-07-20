import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ onCancel, onSuccess }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedDanhMucId, setSelectedDanhMucId] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    originalPrice: "",
    quantity: "",
  });

  const categories = [
    { id: 1, name: "iPhone" },
    { id: 2, name: "Samsung" },
    { id: 3, name: "Phụ kiện" },
  ];

  const colors = [
    { value: "Đen", label: "Đen" },
    { value: "Trắng", label: "Trắng" },
    { value: "Hồng", label: "Hồng" },
    { value: "Xanh Dương", label: "Xanh Dương" },
    { value: "Đỏ", label: "Đỏ" },
    { value: "Vàng", label: "Vàng" },
    { value: "Tím", label: "Tím" },
    { value: "Xanh Rêu", label: "Xanh Rêu" },
  ];

  const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = async (files) => {
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          "http://localhost:8080/api/upload/image",
          formData
        );
        uploadedUrls.push(res.data);
      } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
        alert("Upload ảnh thất bại");
      }
    }

    setUploadedImages((prev) => [...prev, ...uploadedUrls]);
  };

  const removeImage = (index) => {
    const updated = [...uploadedImages];
    updated.splice(index, 1);
    setUploadedImages(updated);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.productName ||
      !selectedColor ||
      !selectedStorage ||
      !selectedDanhMucId ||
      !formData.originalPrice ||
      !formData.quantity ||
      uploadedImages.length === 0
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    try {
      const payload = {
        tensp: formData.productName,
        color: selectedColor,
        storages: [selectedStorage],
        imageUrl: uploadedImages[0],
        originalPrice: parseFloat(formData.originalPrice),
        gia: formData.price
          ? parseFloat(formData.price)
          : parseFloat(formData.originalPrice),
        soLuong: parseInt(formData.quantity),
        danhMucId: parseInt(selectedDanhMucId),
      };

      await axios.post("http://localhost:8080/api/variants/add", payload);
      alert("Thêm sản phẩm thành công!");
      if (onSuccess) onSuccess(); // Gọi callback từ cha
      onCancel(); // Đóng form
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi thêm sản phẩm.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thêm Sản Phẩm Mới
          </h1>
          <p className="text-gray-600">
            Điền đầy đủ thông tin sản phẩm bên dưới
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload ảnh */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Hình Ảnh Sản Phẩm
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="text-gray-400">
                      <i className="fas fa-cloud-upload-alt text-4xl"></i>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2">
                        Kéo thả hình ảnh vào đây hoặc
                      </p>
                      <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                        <i className="fas fa-plus mr-2"></i>
                        Chọn File
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileSelect}
                          multiple
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF tối đa 10MB
                    </p>
                  </div>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Uploaded ${index}`}
                          className="w-full h-40 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center transition-opacity cursor-pointer"
                        >
                          <i className="fas fa-times text-xs"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Sản Phẩm *
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) =>
                    handleInputChange("productName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh Mục *
                </label>
                <select
                  value={selectedDanhMucId}
                  onChange={(e) => setSelectedDanhMucId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu Sắc *
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="">Chọn màu sắc</option>
                  {colors.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dung Lượng Bộ Nhớ *
                </label>
                <select
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="">Chọn dung lượng</option>
                  {storageOptions.map((storage) => (
                    <option key={storage} value={storage}>
                      {storage}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá Gốc *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      handleInputChange("originalPrice", e.target.value)
                    }
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="0"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 text-sm">VNĐ</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá Khuyến Mãi (nếu có)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="0 (để trống nếu không có khuyến mãi)"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 text-sm">VNĐ</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số Lượng *
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i className="fas fa-times mr-2"></i>
              Hủy
            </button>

            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-save mr-2"></i>
              Lưu Sản Phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
