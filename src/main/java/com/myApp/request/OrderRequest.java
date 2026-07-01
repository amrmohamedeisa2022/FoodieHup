package com.myApp.request;

import com.myApp.model.Address;
import lombok.Data;

@Data
public class OrderRequest {
    private Long restaurantId;

    private Address deliveryAddress;
}
