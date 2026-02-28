package com.aicookingassistant.backend.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntime(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "error", "AI processing failed",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {

        var bindingResult = ex.getBindingResult();

        var fieldError = bindingResult.getFieldError();
        var globalError = bindingResult.getGlobalError();

        String message;

        if (fieldError != null) {
            message = fieldError.getDefaultMessage();
        } else if (globalError != null) {
            message = globalError.getDefaultMessage();
        } else {
            message = "Invalid request";
        }

        return ResponseEntity
                .badRequest()
                .body(Map.of("error", message));
    }

}
