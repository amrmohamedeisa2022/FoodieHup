package com.myApp.repository;

import com.myApp.model.Category;
import com.myApp.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByRestaurantId(Long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Category c WHERE c.restaurant = :restaurant")
    void deleteByRestaurant(@Param("restaurant") Restaurant restaurant);

}

