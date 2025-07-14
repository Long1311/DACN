import React from "react";
import { Routes, Route } from "react-router-dom";
import TrangChu from "./components/trangchu";
import ProductDetail from "./components/product/ProductDetail";
import Cart from "./components/cart";
import Login from "./login_out/login";
import Register from "./login_out/register";
import Admin from "./admin/admin";
import ChangePassword from "./login_out/ChangePassword";
import FeaturedProducts from "./components/homepage/FeaturedProducts";
import ProductList from "./components/product/ProductList";
import DiscountPage from "./components/homepage/DiscountPage";
import SearchPage from "./components/search/SearchPage";
import ThanhToan from "./components/thanhtoan";
import Profile from "./components/common/profile";
import FaqPage from "./components/homepage/FaqPage";
import TinTuc from "./components/homepage/TinTuc";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/thanhtoan" element={<ThanhToan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/featured" element={<FeaturedProducts />} />
        <Route path="/danhmuc/:categoryId" element={<ProductList />} />
        <Route path="/discount" element={<DiscountPage />} />
        <Route path="/FaqPage" element={<FaqPage />} />
        <Route path="/TinTuc" element={<TinTuc />} />
        {/* Route 404 */}
        <Route path="*" element={<div>404 - Trang không tồn tại</div>} />
      </Routes>
    </div>
  );
}

export default App;