package com.tmdt.ecommerce.repository;

import com.tmdt.ecommerce.model.CartItems;
import com.tmdt.ecommerce.model.Carts;
import com.tmdt.ecommerce.model.SanPhamVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemsRepository extends JpaRepository<CartItems, Long> {
    Optional<CartItems> findByCartAndVariant(Carts cart, SanPhamVariant variant);

    List<CartItems> findByCart_User_IdAndSelected(Long userId, Boolean selected);

    @Query("SELECT COALESCE(SUM(ci.soluong), 0) " +
            "FROM CartItems ci " +
            "WHERE ci.cart.user.id = :userId AND ci.variant.id = :variantId")
    int sumSoLuongByUserAndVariant(@Param("userId") Long userId, @Param("variantId") Long variantId);
    @Query("SELECT ci FROM CartItems ci JOIN FETCH ci.cart c JOIN FETCH c.user WHERE c.user.id = :userId")
    List<CartItems> findByCart_User_Id(@Param("userId") Long userId);
}
