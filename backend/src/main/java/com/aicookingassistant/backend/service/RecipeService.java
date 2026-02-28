package com.aicookingassistant.backend.service;

import org.springframework.stereotype.Service;

import com.aicookingassistant.backend.dto.RecipeRequestDto;
import com.aicookingassistant.backend.dto.RecipeResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final AiService aiService;

    public RecipeResponseDto suggestRecipes(RecipeRequestDto request) {

    String prompt = """
    You are a professional chef.

    The user has these ingredients: %s.
    Cuisine preference: %s.
    Meal type: %s.
    Diet preference: %s.
    Make it healthier: %s.

    Suggest exactly 3 dishes.

    Return strictly in JSON format:

    {
    "recipes": [
        {
        "name": "",
        "shortRecipe": "",
        "missingIngredients": []
        }
    ]
    }

    Rules:
    - If diet is veg, do not include meat or egg.
    - If healthier is true, reduce oil, suggest baking/steaming/grilling.
    - Keep shortRecipe concise (4-5 steps).
    - missingIngredients should improve taste or nutrition.
    - Return ONLY JSON.
    """.formatted(
            String.join(", ", request.getIngredients()),
            request.getCuisine(),
            request.getFoodType(),
            request.getDietType(),
            request.isHealthier()
    );

    String aiResponse = aiService.generateRecipes(prompt);

    try {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(aiResponse, RecipeResponseDto.class);

    } catch (JsonProcessingException e) {
        throw new RuntimeException("Failed to parse AI response", e);
    }
}
}
