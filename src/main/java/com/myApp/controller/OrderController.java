package com.myApp.controller;

import com.myApp.model.Order;
import com.myApp.model.User;
import com.myApp.request.OrderRequest;
import com.myApp.response.PaymentResponse;
import com.myApp.service.OrderService;
import com.myApp.service.PaymentService;
import com.myApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @PostMapping("/payments/{orderId}")
    public ResponseEntity<PaymentResponse> createPayment(
            @PathVariable Long orderId)
            throws Exception {

        Order order = orderService.findOrderById(orderId);

        PaymentResponse response =
                paymentService.createPayment(order);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest req,
                                             @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req, user);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @DeleteMapping("/order/{id}/cancel")
    public ResponseEntity<String> cancelOrderUser(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Order order = orderService.findOrderById(id);
        if (order.getCustomer().getId() != user.getId()) {
            throw new Exception("Unauthorized");
        }

        orderService.calcelOrderUser(id);

        return ResponseEntity.ok("Order cancelled successfully");
    }

}
