package com.aicookingassistant.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiService {

    private final RestTemplate restTemplate;

    @Value("${ai.openrouter.url}")
    private String apiUrl;

    @Value("${ai.api.key:}")
    private String apiToken;

    public String generateRecipes(String prompt) {
        if (apiToken == null || apiToken.isBlank()) {
            return buildFallbackRecipes(prompt);
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(apiToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> body = Map.of(
                    "model", "openai/gpt-3.5-turbo",
                    "messages", List.of(
                            Map.of("role", "user", "content", prompt)
                    )
            );

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(apiUrl, entity, Map.class);

            if (response == null || response.getBody() == null || !response.getBody().containsKey("choices")) {
                return buildFallbackRecipes(prompt);
            }

            Map choice = (Map) ((List) response.getBody().get("choices")).get(0);
            Map message = (Map) choice.get("message");

            if (message == null || message.get("content") == null) {
                return buildFallbackRecipes(prompt);
            }

            return message.get("content").toString();
        } catch (Exception ex) {
            return buildFallbackRecipes(prompt);
        }
    }

    private String buildFallbackRecipes(String prompt) {
        String ingredients = extractValue(prompt, "The user has these ingredients:");
        if (ingredients == null || ingredients.isBlank()) {
            ingredients = "fresh vegetables";
        }

        String cuisine = extractValue(prompt, "Cuisine preference:");
        if (cuisine == null || cuisine.isBlank()) {
            cuisine = "Chef";
        }

        String mealType = extractValue(prompt, "Meal type:");
        if (mealType == null || mealType.isBlank()) {
            mealType = "Dish";
        }

        String difficulty = extractValue(prompt, "Requested difficulty level:");
        if (difficulty == null || difficulty.isBlank()) {
            difficulty = "Easy";
        }

        StringBuilder json = new StringBuilder();
        json.append("{\"recipes\":[");

        String[] fallbackNames = {
                "Quick " + cuisine + " " + mealType + " Bowl",
                "Healthy " + cuisine + " Skillet",
                "Golden " + cuisine + " Stir Fry",
                "Comfort " + cuisine + " Wrap",
                "Fresh " + cuisine + " Salad",
                "Warm " + cuisine + " Curry",
                "Classic " + cuisine + " Sauté"
        };

        for (int i = 0; i < fallbackNames.length; i++) {
            if (i > 0) {
                json.append(",");
            }

            json.append("{\"name\":\"")
                    .append(fallbackNames[i])
                    .append("\",\"difficulty\":\"")
                    .append(difficulty)
                    .append("\",\"cookingTime\":\"")
                    .append((20 + (i + 1) * 10))
                    .append(" minutes\",\"shortRecipe\":\"A delicious ")
                    .append(mealType.toLowerCase())
                    .append(" made with ")
                    .append(ingredients)
                    .append(". It is balanced, flavorful, and cooked with simple home-style techniques.\",\"missingIngredients\":[\"onion\",\"garlic\",\"tomato\"]}");
        }

        json.append("]}");
        return json.toString();
    }

    private String extractValue(String prompt, String label) {
        if (prompt == null || label == null) {
            return "";
        }

        int index = prompt.indexOf(label);
        if (index < 0) {
            return "";
        }

        String remainder = prompt.substring(index + label.length()).trim();
        int newlineIndex = remainder.indexOf('\n');
        int periodIndex = remainder.indexOf('.');
        int endIndex = newlineIndex > -1 ? Math.min(newlineIndex, periodIndex > -1 ? periodIndex : remainder.length()) : (periodIndex > -1 ? periodIndex : remainder.length());

        return remainder.substring(0, endIndex).trim();
    }
}