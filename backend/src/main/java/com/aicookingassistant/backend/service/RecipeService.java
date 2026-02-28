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
        Requested difficulty level: %s.

        Return exactly 3 dishes strictly in this JSON format:

        {
        "recipes": [
            {
            "name": "",
            "difficulty": "",
            "cookingTime": "",
            "shortRecipe": "",
            "missingIngredients": []
            }
        ]
        }

        Rules:
        - All dishes must match the requested difficulty.
        - difficulty must be exactly: Easy, Medium, or Hard.
        - cookingTime must be realistic (e.g., "25 minutes").
        - If diet is veg, do not include meat or egg.
        - If healthier is true, reduce oil and suggest healthier cooking methods.
        - Keep shortRecipe concise (4-5 steps).
        - Return ONLY JSON.
        """.formatted(
                String.join(", ", request.getIngredients()),
                request.getCuisine(),
                request.getFoodType(),
                request.getDietType(),
                request.isHealthier(),
                request.getDifficulty()
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
