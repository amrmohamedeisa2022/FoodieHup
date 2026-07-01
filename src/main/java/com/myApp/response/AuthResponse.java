package com.myApp.response;

import com.myApp.model.User_Role;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String jwt;
    private String message;
    private User_Role role;
    private boolean hasRestaurant;
    private String fullName;
    private Long restaurantId;
}
