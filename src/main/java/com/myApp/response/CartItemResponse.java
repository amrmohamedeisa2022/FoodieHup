package com.myApp.response;

import lombok.Data;

@Data
public class CartItemResponse {
    private Long id;
    private Long foodId;
    private String name;
    private Long price;
    private int quantity;
    private Long restaurantId;
    private String image;
}