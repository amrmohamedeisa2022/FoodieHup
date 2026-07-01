package com.myApp.controller;

import com.myApp.dto.ResturentDto;
import com.myApp.model.Restaurant;
import com.myApp.model.User;
import com.myApp.service.ResturentService;
import com.myApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurentController {

    @Autowired
    private ResturentService restaurantService;
    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestHeader("Authorization") String jwt,
                                                              @RequestParam String keyword) throws Exception {

        User user=userService.findUserByJwtToken(jwt);
        List<Restaurant> restaurant =restaurantService.searchRestaurant(keyword);
        return new ResponseEntity<>(restaurant,HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllResturents() {

        List<Restaurant> restaurant = restaurantService.getAllRestaurant();
        return new ResponseEntity<>(restaurant,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findResturentById(@RequestHeader("Authorization") String jwt,
                                                        @PathVariable Long id) throws Exception {

        User user=userService.findUserByJwtToken(jwt);
        Restaurant restaurant =restaurantService.findRestaurantById(id);
        return new ResponseEntity<>(restaurant,HttpStatus.OK);

    }

    @PutMapping("/{id}/add-favourites")
    public ResponseEntity<ResturentDto> addToFavourites(@RequestHeader("Authorization") String jwt,
                                                        @PathVariable Long id) throws Exception {

        User user=userService.findUserByJwtToken(jwt);
        ResturentDto resturent =restaurantService.addToFavorites(id,user);
        return new ResponseEntity<>(resturent,HttpStatus.OK);

    }


}