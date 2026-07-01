package com.myApp.repository;

import com.myApp.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResturentRepositry extends JpaRepository<Restaurant,Long> {

    @Query("SELECT r FROM Restaurant r WHERE Lower(r.name) LIKE Lower(concat('%',:query, '%')) " +
            "OR Lower(r.cuisineType) LIKE Lower(concat('%', :query, '%'))")
    List<Restaurant> findBysearchQuery (String query);

    Restaurant findByOwnerId(Long userId);

    @Query("SELECT r FROM Restaurant r LEFT JOIN FETCH r.images WHERE r.owner.id = :userId")
    Restaurant findByOwnerIdWithImages(@Param("userId") Long userId);



}
