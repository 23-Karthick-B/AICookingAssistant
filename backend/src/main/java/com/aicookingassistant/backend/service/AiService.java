package com.aicookingassistant.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiService {

    private final RestTemplate restTemplate;

    @Value("${ai.openrouter.url}")
    private String apiUrl;

    @Value("${ai.openrouter.token}")
    private String apiToken;
        
    public String generateRecipes(String prompt) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "model", "openai/gpt-3.5-turbo",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(apiUrl, entity, Map.class);

        Map choice = (Map)((List)response.getBody().get("choices")).get(0);
        Map message = (Map) choice.get("message");

        return message.get("content").toString();
    }
}