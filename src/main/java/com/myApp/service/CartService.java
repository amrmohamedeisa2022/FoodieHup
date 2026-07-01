package com.myApp.service;

import com.myApp.model.Cart;
import com.myApp.model.CartItem;
import com.myApp.request.AddCartItemRequest;
import com.myApp.response.CartItemResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {

public CartItem addItemToCart(AddCartItemRequest req, String jwt)throws Exception;

    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception;

    public Long calculateCartTotals(Cart cart) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws Exception;

    public Cart clearCart(Long userId) throws Exception;

    public List<CartItemResponse> mapCartItems(Cart cart);


}
