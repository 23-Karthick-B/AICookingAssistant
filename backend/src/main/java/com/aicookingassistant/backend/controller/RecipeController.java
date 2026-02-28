package com.aicookingassistant.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aicookingassistant.backend.dto.RecipeRequestDto;
import com.aicookingassistant.backend.dto.RecipeResponseDto;
import com.aicookingassistant.backend.service.RecipeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping("/suggest")
    public RecipeResponseDto suggestRecipes(@Valid @RequestBody RecipeRequestDto request) {
        return recipeService.suggestRecipes(request);
    }
    
}
