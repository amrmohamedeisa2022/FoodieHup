package com.myApp.service;

import com.myApp.dto.ResturentDto;
import com.myApp.model.Address;
import com.myApp.model.Restaurant;
import com.myApp.model.User;
import com.myApp.repository.*;
import com.myApp.request.ResturentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ResturentServiceImpl implements ResturentService {

    @Autowired
    private ResturentRepositry resturentRepositry;
    @Autowired
    private AddressRepositry addressRepositry;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public Restaurant createRestaurent(ResturentRequest req, User user) throws Exception {

        Restaurant existing = resturentRepositry.findByOwnerId(user.getId());
        if(existing != null){
            throw new Exception("Restaurant already exists for this owner");
        }
        Address address=addressRepositry.save(req.getAddress());

        Restaurant restaurant=new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);

        return resturentRepositry.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurent(Long resturentId, ResturentRequest updatedResturent) throws Exception {

        Restaurant restaurant=findRestaurantById(resturentId);

        if(restaurant.getCuisineType()!=null){
            restaurant.setCuisineType(updatedResturent.getCuisineType());
        }
        if(restaurant.getDescription()!=null){
            restaurant.setDescription(updatedResturent.getDescription());
        }
        if(restaurant.getName()!=null){
            restaurant.setName(updatedResturent.getName());
        }
        return resturentRepositry.save(restaurant);

    }

    @Transactional
    @Override
    public void deleteRestaurant(long restaurantId) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        // 🔥 1. cart items
        cartItemRepository.deleteByRestaurant(restaurant);

        // 🔥 2. order items (الجديد)
        orderItemRepository.deleteByRestaurant(restaurant);

        // 🔥 3. orders
        orderRepository.deleteByRestaurant(restaurant);

        // 🔥 4. foods
        foodRepository.deleteByRestaurant(restaurant);

        // 🔥 5. categories
        categoryRepository.deleteByRestaurant(restaurant);

        // 🔥 6. restaurant
        resturentRepositry.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurant() {
       return resturentRepositry.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return resturentRepositry.findBysearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(long id) throws Exception {
       Optional<Restaurant> opt=resturentRepositry.findById(id);
       if(opt.isEmpty()){
           throw new Exception("Resturent not found with this id" + id);
       }
       return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(long id) {

        Restaurant restaurant = resturentRepositry.findByOwnerIdWithImages(id);

        if (restaurant == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found");
        }

        return restaurant;
    }

    @Override
    public ResturentDto addToFavorites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant=findRestaurantById(restaurantId);

        ResturentDto dto=new ResturentDto();
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        boolean isFavorited = false;

        List<ResturentDto> favorites = user.getFavourites();

        for (ResturentDto favorite : favorites) {
            if (favorite.getId().equals(restaurantId)) {
                isFavorited = true;
                break;
            }
        }

        if (isFavorited) {
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        } else {
            favorites.add(dto);
        }



        userRepository.save(user);
        return dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {
        Restaurant restaurant=findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return resturentRepositry.save(restaurant);
    }
}
