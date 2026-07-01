package com.myApp.service;

import com.myApp.model.Food;
import com.myApp.repository.FoodRepository;
import com.myApp.response.NutritionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URL;

@Service
@RequiredArgsConstructor
public class NutritionService {
    private final FoodRepository foodRepository;

    public NutritionResponse analyzeFood(Long foodId) throws Exception {

        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        String imageUrl = food.getImages().get(0);

        URL url = new URL(imageUrl);

        byte[] imageBytes = url.openStream().readAllBytes();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        ByteArrayResource resource = new ByteArrayResource(imageBytes) {
            @Override
            public String getFilename() {
                return "food.jpg";
            }
        };

        body.add("image", resource);

        HttpEntity<MultiValueMap<String, Object>> request =
                new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<NutritionResponse> response =
                restTemplate.postForEntity(
                        "https://a7mad00-foodie-hub-api.hf.space/predict",
                        request,
                        NutritionResponse.class
                );

        return response.getBody();
    }
}
