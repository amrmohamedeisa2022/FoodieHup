package com.myApp.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum User_Role {
    ROLE_CUSTOMER,
    ROLE_ADMIN,
    ROLE_RESTAURANT_OWNER;

    @JsonCreator
    public static User_Role fromString(String value) {
        return User_Role.valueOf(value.toUpperCase());
    }
}
