package com.myApp.service;


import com.myApp.model.Order;
import com.myApp.model.User;
import com.myApp.request.OrderRequest;
import com.myApp.response.OrderResponse;

import java.util.List;

public interface OrderService {

    public Order createOrder(OrderRequest order, User user) throws Exception;

    public Order updateOrder(Long orderId, String orderStatus) throws Exception;


    public List<Order> getUsersOrder(Long userId) throws Exception;

    public List<Order> getRestaurantsOrder(Long restaurantId, String orderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;

    public List<OrderResponse> getOrdersByRestaurant(Long restaurantId);

    public void calcelOrderUser(Long orderId) throws Exception;
}
