package com.myApp.controller;

import com.myApp.model.Order;
import com.myApp.model.User;
import com.myApp.request.OrderRequest;
import com.myApp.response.OrderResponse;
import com.myApp.service.OrderService;
import com.myApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<Order>> getOrderHistory(
            @PathVariable Long id,
            @RequestParam(required = false) String order_status,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getRestaurantsOrder(id, order_status);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/order/{id}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @PathVariable String orderStatus,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Order orders = orderService.updateOrder(id, orderStatus);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/order/restaurant/{id}/simple")
    public ResponseEntity<List<OrderResponse>> getRestaurantOrdersSimple(
            @PathVariable Long id) {

        List<OrderResponse> orders = orderService.getOrdersByRestaurant(id);

        return ResponseEntity.ok(orders);
    }

    @DeleteMapping("/order/{id}/cancel")
    public ResponseEntity<Order> cancelOrderAdmin(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception {

        userService.findUserByJwtToken(jwt);

        orderService.calcelOrderUser(id); // reuse نفس الميثود

        Order order = orderService.findOrderById(id);

        return ResponseEntity.ok(order);
    }



}
