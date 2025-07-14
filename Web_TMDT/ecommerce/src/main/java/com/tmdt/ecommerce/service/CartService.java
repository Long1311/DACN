package com.tmdt.ecommerce.service;

import com.tmdt.ecommerce.model.CartItems;
import com.tmdt.ecommerce.model.Carts;
import com.tmdt.ecommerce.model.SanPhamVariant;
import com.tmdt.ecommerce.model.User;
import com.tmdt.ecommerce.repository.CartItemsRepository;
import com.tmdt.ecommerce.repository.CartsRepository;
import com.tmdt.ecommerce.repository.SanPhamVariantRepository;
import com.tmdt.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private SanPhamVariantRepository sanPhamVariantRepository;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Autowired
    private CartsRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CartItems> getCartItems(Long userId) {
        return cartItemsRepository.findByCart_User_Id(userId);
    }

    public void addVariantToCart(User user, SanPhamVariant variant, int soLuongThem) {
        Carts cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Carts newCart = new Carts(user);
                    return cartRepository.save(newCart);
                });

        CartItems existingItem = cartItemsRepository.findByCartAndVariant(cart, variant).orElse(null);

        if (existingItem != null) {
            existingItem.setSoluong(existingItem.getSoluong() + soLuongThem);
            cartItemsRepository.save(existingItem);
        } else {
            CartItems newItem = new CartItems();
            newItem.setCart(cart);
            newItem.setVariant(variant);
            newItem.setSoluong(soLuongThem);
            newItem.setSelected(true);
            cart.getCartItems().add(newItem);
            cartItemsRepository.save(newItem);
        }
    }

    public Carts getCartByUser(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Carts newCart = new Carts(user);
                    return cartRepository.save(newCart); // ✅ tự động tạo mới nếu chưa có
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

        cartItemsRepository.delete(item); //XÓA KHỎI DB
        System.out.println("XÓA: " + cartItemId);
    }

    public void saveCart(Carts cart) {
        cartRepository.save(cart);
    }

    @Transactional
    public void clearCart(Long userId) {
        List<CartItems> cartItems = cartItemsRepository.findByCart_User_Id(userId);
        cartItemsRepository.deleteAll(cartItems);
    }

    @Transactional
    public void updateCartItem(Long cartItemId, Integer soluong, Boolean selected) {
        CartItems cartItem = cartItemsRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mục giỏ hàng"));

        if (soluong != null) cartItem.setSoluong(soluong);
        if (selected != null) cartItem.setSelected(selected);

        cartItemsRepository.save(cartItem);
    }

    @Transactional
    public void checkout(Long userId, String paymentMethod) {
        // Tìm người dùng
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại: " + userId));

        // Tìm giỏ hàng tương ứng với người dùng
        Carts cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Giỏ hàng không tồn tại cho người dùng: " + userId));

        // Tìm các mục đã chọn để thanh toán
        List<CartItems> selectedItems = cartItemsRepository.findByCartAndSelected(cart, true);

        if (selectedItems.isEmpty()) {
            throw new IllegalStateException("Không có sản phẩm nào được chọn để thanh toán");
        }

        // Xoá các mục đã thanh toán khỏi giỏ hàng
        selectedItems.forEach(cartItemsRepository::delete);
    }

    public SanPhamVariant getVariantById(Long id) {
        return sanPhamVariantRepository.findById(id).orElse(null);
    }

}
