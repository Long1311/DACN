package com.tmdt.ecommerce.repository;

import com.tmdt.ecommerce.model.CartItems;
import com.tmdt.ecommerce.model.Carts;
import com.tmdt.ecommerce.model.SanPhamVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemsRepository extends JpaRepository<CartItems, Long> {
    Optional<CartItems> findByCartAndVariant(Carts cart, SanPhamVariant variant);
    List<CartItems> findByCartAndSelected(Carts cart, Boolean selected);
    List<CartItems> findByCart_User_Id(Long userId);
}
