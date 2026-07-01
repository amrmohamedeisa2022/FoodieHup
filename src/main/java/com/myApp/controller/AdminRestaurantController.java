package com.myApp.controller;


import com.myApp.model.Restaurant;
import com.myApp.model.User;
import com.myApp.request.ResturentRequest;
import com.myApp.response.MessageResponse;
import com.myApp.service.ResturentService;
import com.myApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

    @Autowired
    private ResturentService restaurantService;
    @Autowired
    private UserService userService;

    @PostMapping()
   public ResponseEntity<Restaurant> createRestaurant
           (@RequestBody ResturentRequest req,
            @RequestHeader ("Authorization")String jwt) throws Exception{

       User user=userService.findUserByJwtToken(jwt);
       Restaurant restaurant=restaurantService.createRestaurent(req,user);
       return new ResponseEntity<>(restaurant,HttpStatus.CREATED);
   }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant
            (@RequestBody ResturentRequest req,
             @RequestHeader ("Authorization")String jwt,
             @PathVariable Long id) throws Exception{

        User user=userService.findUserByJwtToken(jwt);
        Restaurant restaurant=restaurantService.updateRestaurent(id,req);
        return new ResponseEntity<>(restaurant,HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteRestaurant
            (@RequestHeader ("Authorization")String jwt,
             @PathVariable Long id) throws Exception{

        restaurantService.deleteRestaurant(id);
        MessageResponse msg=new MessageResponse();
        msg.setMessage("Resturent Deleted Successfully");
        return new ResponseEntity<>(msg,HttpStatus.OK);

    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus
            (@RequestHeader ("Authorization")String jwt,
             @PathVariable Long id) throws Exception{

        Restaurant restaurant=restaurantService.updateRestaurantStatus(id);
        return new ResponseEntity<>(restaurant,HttpStatus.OK);

    }



    @GetMapping("/user")
    public ResponseEntity<Restaurant> getUserRestaurant(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }







}
