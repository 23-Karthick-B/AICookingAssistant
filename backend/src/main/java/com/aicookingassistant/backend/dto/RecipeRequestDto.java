package com.aicookingassistant.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeRequestDto {
    private List<String> ingredients;
    private String cuisine;
    private String foodType;
    private String dietType;     
    private boolean healthier; 

}
