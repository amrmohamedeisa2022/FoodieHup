package com.myApp.service;

import com.myApp.model.Order;
import com.myApp.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    public PaymentResponse createPayment(Order order) throws StripeException;


}
