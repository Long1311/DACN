package com.tmdt.ecommerce.repository;

import com.tmdt.ecommerce.model.Orders;
import com.tmdt.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByUser(User user);

    long countByNgaydatBetween(Date start, Date end);

    List<Orders> findByNgaydatBetween(Date start, Date end);

    long countByTrangthaiAndNgaydatBetween(String trangthai, Date start, Date end);
}
