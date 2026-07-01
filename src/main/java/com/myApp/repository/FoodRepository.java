package com.myApp.repository;

import com.myApp.model.Food;
import com.myApp.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {

    List<Food> findByRestaurantId(Long restaurantId);

    @Query("SELECT f FROM Food f WHERE f.name LIKE %:keyword% OR f.category.name LIKE %:keyword%")
    List<Food> searchFood(@Param("keyword") String keyword);

    @Modifying
    @Transactional
    @Query("DELETE FROM Food f WHERE f.restaurant = :restaurant")
    void deleteByRestaurant(@Param("restaurant") Restaurant restaurant);

}
