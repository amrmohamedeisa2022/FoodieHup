package com.myApp.service;

import com.myApp.dto.ResturentDto;
import com.myApp.model.Restaurant;
import com.myApp.model.User;
import com.myApp.request.ResturentRequest;

import java.util.List;

public interface ResturentService {

    public Restaurant createRestaurent(ResturentRequest req, User user) throws Exception;
    public Restaurant updateRestaurent(Long resturentId, ResturentRequest updatedResturent )throws Exception;


    public void deleteRestaurant(long restaurantId) throws Exception;
    public List<Restaurant> getAllRestaurant();

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(long id) throws Exception;
    public Restaurant getRestaurantByUserId(long id) throws Exception;


    public ResturentDto addToFavorites(Long restaurantId, User user)throws Exception;

    public Restaurant updateRestaurantStatus (Long id) throws Exception;

}
