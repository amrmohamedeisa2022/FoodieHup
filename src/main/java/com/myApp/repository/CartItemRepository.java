package com.myApp.repository;

import com.myApp.model.Cart;
import com.myApp.model.CartItem;
import com.myApp.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem c WHERE c.food.restaurant = :restaurant")
    void deleteByRestaurant(@Param("restaurant") Restaurant restaurant);
}
