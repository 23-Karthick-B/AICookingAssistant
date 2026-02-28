package com.aicookingassistant.backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class RecipeRequestDto {
    private List<String> ingredients;
    private String cuisine;

}
