package com.tmdt.ecommerce.repository;

import com.tmdt.ecommerce.model.Carts;
import com.tmdt.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartsRepository extends JpaRepository<Carts, Long> {
    Optional<Carts> findByUser(User user);
}
