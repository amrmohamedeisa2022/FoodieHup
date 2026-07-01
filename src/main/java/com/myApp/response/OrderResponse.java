package com.myApp.response;
import lombok.Data;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private String customerName;

    private Long totalPrice;   // subtotal
    private Long totalAmount;  // 🔥 النهائي

    private String orderStatus;
    private List<OrderItemResponse> items;
}
