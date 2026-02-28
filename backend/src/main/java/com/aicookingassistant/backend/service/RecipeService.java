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

        Return exactly 3 dishes in JSON format like this:

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
        - Keep shortRecipe concise (4-5 steps).
        - missingIngredients should be realistic and home friendly.
        - Return ONLY JSON. No explanation.
        """.formatted(
            String.join(", ", request.getIngredients()),
            request.getCuisine(),
            request.getFoodType()
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
