package com.aicookingassistant.backend.service;

import org.springframework.stereotype.Service;

import com.aicookingassistant.backend.dto.RecipeRequestDto;
import com.aicookingassistant.backend.dto.RecipeResponseDto;
import com.aicookingassistant.backend.exception.InvalidIngredientException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final AiService aiService;

    private final IngredientService ingredientService;

    public RecipeResponseDto suggestRecipes(RecipeRequestDto request) {

        List<String> cleanedIngredients =
                ingredientService.cleanIngredients(request.getIngredients());

        if (cleanedIngredients.isEmpty()) {
            throw new InvalidIngredientException(
                "No valid ingredients provided. Please enter real ingredient names."
            );
        }

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
        - If the ingredients are not real just some random letter return "Your ingredients are not valid"
        - All dishes must match the requested difficulty.
        - difficulty must be exactly: Easy, Medium, or Hard.
        - cookingTime must be realistic (e.g., "25 minutes").
        - If diet is veg, do not include meat or egg.
        - If healthier is true, reduce oil and suggest healthier cooking methods.
        - Keep shortRecipe concise (4-5 steps).

        STRICT RULES FOR missingIngredients:
        - Each item must be a real food ingredient.
        - Must be full words only.
        - Must not contain single letters.
        - Must not contain numbers.
        - Must not contain abbreviations.
        - Minimum 3 characters.
        - If no missing ingredients are required, return an empty array [].

        Return ONLY valid JSON.
        """.formatted(
                String.join(", ", cleanedIngredients),
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