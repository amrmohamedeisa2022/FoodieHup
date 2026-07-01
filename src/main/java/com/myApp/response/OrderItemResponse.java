package com.myApp.response;

import lombok.Data;

@Data
public class OrderItemResponse {

    private String name;
    private int quantity;
    private Long price;
}
