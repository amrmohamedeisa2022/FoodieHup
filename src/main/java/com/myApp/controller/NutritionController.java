package com.myApp.controller;

import com.myApp.response.NutritionResponse;
import com.myApp.service.NutritionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nutrition")
@RequiredArgsConstructor
public class NutritionController {

    private final NutritionService nutritionService;

    @GetMapping("/{foodId}")
    public NutritionResponse getNutrition(
            @PathVariable Long foodId) throws Exception {

        return nutritionService.analyzeFood(foodId);
    }
}
