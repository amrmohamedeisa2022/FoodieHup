package com.myApp.service;

import com.myApp.model.Category;
import com.myApp.model.Food;
import com.myApp.model.Restaurant;
import com.myApp.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantsFood(
            Long restaurantId,
            boolean isVegitarain,
            boolean isNonveg,
            boolean isSeasonal,
            String foodCategory
    );

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailibilityStatus(Long foodId) throws Exception;

}
