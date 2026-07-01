package com.myApp.repository;

import com.myApp.model.Order;
import com.myApp.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    public List<Order> findByCustomerId(Long userId);

    public List<Order> findByRestaurantId(Long restaurantId);
    void deleteByRestaurant(Restaurant restaurant);

}
