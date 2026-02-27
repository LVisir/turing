package com.rubrica.turing.config;

import com.rubrica.turing.dto.ApiError;
import com.rubrica.turing.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleGeneric(Exception ex) {
        ApiError error = new ApiError(
                "Server internal error",
                HttpStatus.INTERNAL_SERVER_ERROR.value()
        );

        ApiResponse<?> response = new ApiResponse<>();
        response.setError(error);
        response.setSuccess(false);
        response.setBody(null);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
