package com.aicookingassistant.backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class RecipeItem {
    private String name;
    private String shortRecipe;
    private List<String> missingIngredients;
}
