package com.aicookingassistant.backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class RecipeItem {
    private String name;
    private String shortRecipe;
    private String difficulty;
    private String cookingTime; 
    private List<String> missingIngredients;
}
