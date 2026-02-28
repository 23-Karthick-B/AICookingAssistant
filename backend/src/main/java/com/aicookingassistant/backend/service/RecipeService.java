package com.aicookingassistant.backend.service;

import java.util.Arrays;

import org.springframework.stereotype.Service;

import com.aicookingassistant.backend.dto.RecipeRequestDto;
import com.aicookingassistant.backend.dto.RecipeResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final AiService aiService;

    public RecipeResponseDto suggestRecipes(RecipeRequestDto request){
        String prompt = "Suggest the best 5 dishes in "+ request.getCusine() 
        + "with the following ingredients"+ String.join(",",request.getIngredients());

        String aiResponse = aiService.generateRecipes(prompt);
        RecipeResponseDto response = new RecipeResponseDto();
        response.setRecipe(Arrays.asList(aiResponse.split(",")));

        return response;
    }   

}
