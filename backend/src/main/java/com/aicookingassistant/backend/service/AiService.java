package com.aicookingassistant.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AiService {

    private final RestTemplate restTemplate;

    public String generateRecipes(String prompt){

        return "Tomato Rice, Biriyani, Fried Rice";
    }

}
