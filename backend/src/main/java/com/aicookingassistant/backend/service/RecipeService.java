package com.aicookingassistant.backend.service;

import org.springframework.stereotype.Service;

import com.aicookingassistant.backend.dto.RecipeRequestDto;
import com.aicookingassistant.backend.dto.RecipeResponseDto;
import com.aicookingassistant.backend.exception.InvalidIngredientException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
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

        Return exactly 7 dishes strictly in this JSON format.
        The recipes array must contain exactly 7 recipe objects.
        Do not return 3, 5, or any other count.

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
        - Keep shortRecipe detailed and provide clear step-by-step instructions for making the dish.
        - The recipe instructions should be sufficiently detailed for the user to prepare the dish without needing additional instructions.
        - Include approximately 6-8 clear and practical steps for each recipe.

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
            RecipeResponseDto response = mapper.readValue(aiResponse, RecipeResponseDto.class);
            return normalizeToSevenRecipes(response, request);

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse AI response", e);
        }
    }

    private RecipeResponseDto normalizeToSevenRecipes(RecipeResponseDto response, RecipeRequestDto request) {
        if (response == null) {
            response = new RecipeResponseDto();
        }

        List<com.aicookingassistant.backend.dto.RecipeItem> recipes =
                response.getRecipes() == null ? new ArrayList<>() : new ArrayList<>(response.getRecipes());

        if (recipes.size() > 7) {
            recipes = new ArrayList<>(recipes.subList(0, 7));
        }

        while (recipes.size() < 7) {
            com.aicookingassistant.backend.dto.RecipeItem recipe = new com.aicookingassistant.backend.dto.RecipeItem();
            int id = recipes.size() + 1;
            String cuisine = request.getCuisine() == null ? "Chef" : request.getCuisine();
            String foodType = request.getFoodType() == null ? "dish" : request.getFoodType();
            String difficulty = request.getDifficulty() == null ? "Easy" : request.getDifficulty();
            String ingredients = request.getIngredients() == null || request.getIngredients().isEmpty()
                    ? "fresh vegetables"
                    : String.join(", ", request.getIngredients());

            recipe.setName(cuisine + " " + foodType + " Variation " + id);
            recipe.setDifficulty(difficulty);
            recipe.setCookingTime((20 + id * 10) + " minutes");
            recipe.setShortRecipe("Healthy " + foodType.toLowerCase() + " made with " + ingredients + ". Cook with balanced seasoning, moderate heat, and fresh ingredients for a light finish.");
            recipe.setMissingIngredients(List.of("onion", "garlic", "tomato"));
            recipes.add(recipe);
        }

        response.setRecipes(recipes);
        return response;
    }
}