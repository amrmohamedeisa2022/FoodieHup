package com.myApp.response;

import lombok.Data;

@Data
public class NutritionResponse {

    private String food_name;
    private String healthy;
    private String calories;
    private String protein;
    private String carbs;
    private String fat;
    private String warning;
    private String status;

}
