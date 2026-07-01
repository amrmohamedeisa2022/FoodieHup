package com.myApp.service;

import com.myApp.model.Category;
import com.myApp.model.Restaurant;
import com.myApp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ResturentService resturentService;



    @Override
    public Category createCategory(String name, Long userId) throws Exception {
        Restaurant restaurant = resturentService.getRestaurantByUserId(userId);

        Category category = new Category();
        category.setName(name);
        category.setRestaurant(restaurant);

        return categoryRepository.save(category);

    }

    @Override
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception {
        Restaurant restaurant = resturentService.getRestaurantByUserId(id);

        if (restaurant == null) {
            throw new Exception("Restaurant not found for this user ❌");
        }

        return categoryRepository.findByRestaurantId(restaurant.getId());
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {
        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if(optionalCategory.isEmpty()){
            throw new Exception("category not found");
        }

        return optionalCategory.get();
    }
}
