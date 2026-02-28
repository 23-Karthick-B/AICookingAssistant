package com.aicookingassistant.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class RecipeRequestDto {

    @NotEmpty(message = "Ingredients cannot be empty")
    private List<String> ingredients;

    @NotNull(message = "Cuisine is required")
    private String cuisine;

    @NotNull(message = "Food type is required")
    private String foodType;

    @NotNull(message = "Diet type is required")
    private String dietType;

    private boolean healthier;
    private String difficulty;
}