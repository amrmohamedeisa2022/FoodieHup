package com.myApp.controller;

import com.myApp.model.Category;
import com.myApp.model.User;
import com.myApp.service.CategoryService;
import com.myApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/category")
public class CatrgoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;



    @PostMapping
    public ResponseEntity<Category> createCategory(
            @RequestBody Category category,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Category createdCategory =
                categoryService.createCategory(category.getName(), user.getId());

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/restaurant")
    public ResponseEntity<List<Category>> getRestaurantCategory(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        System.out.println("USER ID: " + user.getId());

        List<Category> categories =
                categoryService.findCategoryByRestaurantId(user.getId());

        System.out.println("CATEGORIES: " + categories);

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

}