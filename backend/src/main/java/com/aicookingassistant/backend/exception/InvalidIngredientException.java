package com.aicookingassistant.backend.exception;

public class InvalidIngredientException extends RuntimeException {

    public InvalidIngredientException(String message) {
        super(message);
    }
}