package com.myApp.service;

import com.myApp.model.Cart;
import com.myApp.model.CartItem;
import com.myApp.model.Food;
import com.myApp.model.User;
import com.myApp.repository.CartItemRepository;
import com.myApp.repository.CartRepository;
import com.myApp.repository.FoodRepository;
import com.myApp.repository.UserRepository;
import com.myApp.request.AddCartItemRequest;
import com.myApp.response.CartItemResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Food food = foodService.findFoodById(req.getFoodId());


        Cart cart = cartRepository.findByCustomerId(user.getId());


        if (cart == null) {
            cart = new Cart();
            cart.setCustomer(user);
            cart.setItem(new ArrayList<>());
            cart.setTotal(0L);

            cart = cartRepository.save(cart);
        }


        for (CartItem cartItem : cart.getItem()) {
            if (cartItem.getFood().getId().equals(food.getId())) {
                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                return updateCartItemQuantity(cartItem.getId(), newQuantity);
            }
        }


        CartItem newCartItem = new CartItem();
        newCartItem.setFood(food);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(req.getQuantity() * food.getPrice());

        CartItem savedCartItem = cartItemRepository.save(newCartItem);

        cart.getItem().add(savedCartItem);

        return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {

        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if(cartItemOptional.isEmpty()){
            throw new Exception("cart item not found");
        }

        CartItem item = cartItemOptional.get();
        item.setQuantity(quantity);
        item.setTotalPrice(item.getFood().getPrice() * quantity);

        return cartItemRepository.save(item);

    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartRepository.findByCustomerId(user.getId());

        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if(cartItemOptional.isEmpty()){
            throw new Exception("cart item not found");
        }

        CartItem item = cartItemOptional.get();

        cart.getItem().remove(item);

        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotals(Cart cart) throws Exception {
        Long total = 0L;

        for(CartItem cartItem : cart.getItem()){
            total += cartItem.getFood().getPrice() * cartItem.getQuantity();
        }

        return total;

    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> optionalCart = cartRepository.findById(id);

        if(optionalCart.isEmpty()){
            throw new Exception("cart not found with id " + id);
        }

        return optionalCart.get();

    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {

        Cart cart = cartRepository.findByCustomerId(userId);

        if (cart == null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new Exception("User not found"));

            cart = new Cart();
            cart.setCustomer(user);
            cart.setItem(new ArrayList<>());
            cart.setTotal(0L);

            cart = cartRepository.save(cart);
        }


        if (cart.getItem() == null) {
            cart.setItem(new ArrayList<>());
        }


        Long total = calculateCartTotals(cart);
        cart.setTotal(total);

        // (اختياري)
        cartRepository.save(cart);

        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {
       // User user = userService.findUserByJwtToken(jwt);
        Cart cart = findCartByUserId(userId);
        cart.getItem().clear();
        return cartRepository.save(cart);

    }

    @Override
    public List<CartItemResponse> mapCartItems(Cart cart) {
        return cart.getItem().stream().map(item -> {
            CartItemResponse dto = new CartItemResponse();
            dto.setId(item.getId());
            dto.setFoodId(item.getFood().getId());
            dto.setName(item.getFood().getName());
            dto.setPrice(item.getFood().getPrice());
            dto.setQuantity(item.getQuantity());

            dto.setRestaurantId(item.getFood().getRestaurant().getId());


            if (item.getFood().getImages() != null && !item.getFood().getImages().isEmpty()) {
                dto.setImage(item.getFood().getImages().get(0));
            }

            return dto;
        }).toList();
    }
}
