package com.aicookingassistant.backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class RecipeResponseDto {
    private List<RecipeItem> recipes;
}
