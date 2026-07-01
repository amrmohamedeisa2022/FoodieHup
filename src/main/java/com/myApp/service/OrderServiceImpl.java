package com.myApp.service;

import com.myApp.model.*;
import com.myApp.repository.*;
import com.myApp.request.OrderRequest;
import com.myApp.response.OrderItemResponse;
import com.myApp.response.OrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class OrderServiceImpl implements OrderService {


    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AddressRepositry addressRepositry;

    @Autowired
    private ResturentService resturentService;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;


    @Override
    public Order createOrder(OrderRequest order, User user) throws Exception {

        // ✅ 1. إنشاء Address جديد
        Address reqAddress = order.getDeliveryAddress();

        Address newAddress = new Address();
        newAddress.setCity(reqAddress.getCity());
        newAddress.setCountry(reqAddress.getCountry());
        newAddress.setPostalCode(reqAddress.getPostalCode());
        newAddress.setStreetAddress(reqAddress.getStreetAddress());

        Address savedAddress = addressRepositry.save(newAddress);

        if (!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }

        // ✅ 2. جيب المطعم
        Restaurant restaurant = resturentService.findRestaurantById(order.getRestaurantId());

        // ✅ 3. جيب الكارت
        Cart cart = cartService.findCartByUserId(user.getId());

        if (cart.getItem().isEmpty()) {
            throw new Exception("Cart is empty");
        }

        // ✅ 4. إنشاء الأوردر
        Order createdOrder = new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(LocalDateTime.now());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        // ✅ 5. تحويل CartItem → OrderItem
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getItem()) {

            OrderItem orderItem = new OrderItem();

            orderItem.setFood(cartItem.getFood());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            // 🔥 ربطه بالأوردر
            orderItem.setOrder(createdOrder);

            orderItems.add(orderItem);
        }

        // ✅ 6. حساب subtotal
        Long totalPrice = cartService.calculateCartTotals(cart);

        // ✅ حساب عدد العناصر
        int totalItems = cart.getItem().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        // ✅ 🔥 حساب النهائي (delivery + tax)
        Long delivery = 25L;
        Long tax = (long) (totalPrice * 0.14);
        Long finalTotal = totalPrice + delivery + tax;

        // ✅ set البيانات
        createdOrder.setItems(orderItems);
        createdOrder.setTotalPrice(totalPrice);   // subtotal
        createdOrder.setTotalItem(totalItems);
        createdOrder.setTotalAmount(finalTotal);  // 🔥 النهائي الصح

        // ✅ 7. حفظ الأوردر
        Order savedOrder = orderRepository.save(createdOrder);

        // ✅ 8. ربطه بالمطعم
        restaurant.getOrders().add(savedOrder);

        // ✅ 9. تفريغ الكارت
        cart.getItem().clear();
        cartRepository.save(cart);

        return savedOrder;
    }



    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
        Order order = findOrderById(orderId);

        if(orderStatus.equals("OUT_FOR_DELIVERY")
                || orderStatus.equals("DELIVERED")
                || orderStatus.equals("COMPLETED")
                || orderStatus.equals("PENDING")
                  ||orderStatus.equals("CANCELLED")
        ){
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }

        throw new Exception("Please select a valid order status");

    }









    @Override
    public List<Order> getUsersOrder(Long userId) throws Exception {
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantsOrder(Long restaurantId, String orderStatus) throws Exception {
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        if(orderStatus != null){
            orders = orders.stream().filter(order ->
                            order.getOrderStatus().equals(orderStatus))
                    .collect(Collectors.toList());
        }

        return orders;

    }



    @Override
    public Order findOrderById(Long orderId) throws Exception {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if(optionalOrder.isEmpty()){
            throw new Exception("order not found");
        }

        return optionalOrder.get();

    }

    @Override
    public List<OrderResponse> getOrdersByRestaurant(Long restaurantId) {
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        return orders.stream().map(order -> {

            OrderResponse res = new OrderResponse();
            res.setId(order.getId());
            res.setCustomerName(order.getCustomer().getFullName());
            res.setTotalPrice(order.getTotalPrice());
            res.setOrderStatus(order.getOrderStatus());

            List<OrderItemResponse> items = order.getItems().stream().map(item -> {
                OrderItemResponse i = new OrderItemResponse();
                i.setName(item.getFood().getName());
                i.setQuantity(item.getQuantity());
                i.setPrice(item.getTotalPrice());
                return i;
            }).toList();

            res.setItems(items);

            return res;

        }).toList();
    }

    @Override
    public void calcelOrderUser(Long orderId) throws Exception {
        Order order = findOrderById(orderId);

        if (order == null) {
            throw new Exception("Order not found");
        }

        order.setOrderStatus("CANCELLED");

        orderRepository.save(order);
    }
}
