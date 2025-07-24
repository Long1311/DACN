package com.tmdt.ecommerce.service;

import com.tmdt.ecommerce.model.CartItems;
import com.tmdt.ecommerce.model.Carts;
import com.tmdt.ecommerce.model.SanPhamVariant;
import com.tmdt.ecommerce.model.User;
import com.tmdt.ecommerce.repository.CartItemsRepository;
import com.tmdt.ecommerce.repository.CartsRepository;
import com.tmdt.ecommerce.repository.SanPhamVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private SanPhamVariantRepository sanPhamVariantRepository;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Autowired
    private CartsRepository cartRepository;

    @Transactional
    public void clearCart(Long userId) {
        System.out.println(">>> clearCart CALLED for userId: " + userId);
        List<CartItems> selectedItems = cartItemsRepository.findByCart_User_IdAndSelected(userId, true);
        System.out.println(">>> Số mục đã chọn để xóa: " + selectedItems.size() + ", Danh sách ID: " + selectedItems.stream().map(CartItems::getId).collect(Collectors.toList()));
        if (selectedItems.isEmpty()) {
            System.out.println(">>> Không tìm thấy mục nào với selected = true cho userId: " + userId);
            List<CartItems> allItems = cartItemsRepository.findByCart_User_Id(userId);
            System.out.println(">>> Tất cả các mục cho userId: " + userId + ", Danh sách: " + allItems.stream().map(ci -> "ID: " + ci.getId() + ", Cart User ID: " + (ci.getCart() != null && ci.getCart().getUser() != null ? ci.getCart().getUser().getId() : "null") + ", Selected: " + ci.getSelected()).collect(Collectors.toList()));
        } else {
            try {
                cartItemsRepository.deleteAll(selectedItems);
                System.out.println(">>> Đã xóa " + selectedItems.size() + " mục trong giỏ hàng của userId: " + userId);
            } catch (Exception e) {
                System.out.println(">>> Lỗi khi xóa: " + e.getMessage());
            }
        }
    }

    public void addVariantToCart(User user, SanPhamVariant variant, int soLuongThem) {
        Carts cart = cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(new Carts(user)));

        int soLuongConLai = getSoLuongConLaiChoUser(variant.getId(), user.getId());

        if (soLuongThem > soLuongConLai) {
            throw new RuntimeException("Số lượng yêu cầu vượt quá số lượng tồn kho còn lại. Chỉ còn lại: " + soLuongConLai);
        }

        CartItems existingItem = cartItemsRepository.findByCartAndVariant(cart, variant).orElse(null);

        if (existingItem != null) {
            existingItem.setSoluong(existingItem.getSoluong() + soLuongThem);
            cartItemsRepository.save(existingItem);
        } else {
            CartItems newItem = new CartItems();
            newItem.setCart(cart);
            newItem.setVariant(variant);
            newItem.setSoluong(soLuongThem);
            newItem.setSelected(false);
            cart.getCartItems().add(newItem);
            cartItemsRepository.save(newItem);
        }
    }

    public Carts getCartByUser(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Carts newCart = new Carts(user);
                    return cartRepository.save(newCart);
                });
    }

    @Transactional
    public void removeCartItem(Long cartItemId, String username) {
        CartItems item = cartItemsRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm trong giỏ hàng"));

        if (!item.getCart().getUser().getUsername().equals(username)) {
            throw new RuntimeException("Không có quyền xóa sản phẩm này");
        }

        Carts cart = item.getCart();
        cart.getCartItems().remove(item);

        cartItemsRepository.delete(item);
        System.out.println("XÓA: " + cartItemId);
    }

    public int getSoLuongConLaiChoUser(Long variantId, Long userId) {
        SanPhamVariant variant = sanPhamVariantRepository.findById(variantId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        int trongGioUser = cartItemsRepository.sumSoLuongByUserAndVariant(userId, variantId);
        return variant.getSoluong() - trongGioUser;
    }

    @Transactional
    public void updateCartItem(Long cartItemId, Integer soluong, Boolean selected) {
        CartItems cartItem = cartItemsRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mục giỏ hàng"));

        if (soluong != null) {
            Long userId = cartItem.getCart().getUser().getId();
            Long variantId = cartItem.getVariant().getId();
            int tongTrongGio = cartItemsRepository.sumSoLuongByUserAndVariant(userId, variantId);
            int hienTaiTrongMucNay = cartItem.getSoluong();
            int soLuongConLai = cartItem.getVariant().getSoluong() - (tongTrongGio - hienTaiTrongMucNay);

            if (soluong > soLuongConLai) {
                throw new RuntimeException("Số lượng yêu cầu vượt quá tồn kho. Tối đa có thể mua: " + soLuongConLai);
            }
            cartItem.setSoluong(soluong);
        }
        if (selected != null) {
            cartItem.setSelected(selected);
        }
        cartItemsRepository.save(cartItem);
    }

    public SanPhamVariant getVariantById(Long id) {
        return sanPhamVariantRepository.findById(id).orElse(null);
    }

}
