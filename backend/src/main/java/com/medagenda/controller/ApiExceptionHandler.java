package com.medagenda.controller;

import com.medagenda.service.RecursoNaoEncontradoException;
import com.medagenda.service.RegraNegocioException;
import java.time.Instant;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleRecursoNaoEncontrado(RecursoNaoEncontradoException exception) {
        return ErrorResponse.of(exception.getMessage());
    }

    @ExceptionHandler(RegraNegocioException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorResponse handleRegraNegocio(RegraNegocioException exception) {
        return ErrorResponse.of(exception.getMessage());
    }


    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleAuthentication(AuthenticationException exception) {
        return ErrorResponse.of("Credenciais invalidas");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException exception) {
        List<String> errors = exception.getBindingResult().getFieldErrors().stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .toList();

        return new ErrorResponse(Instant.now(), errors);
    }

    public record ErrorResponse(Instant timestamp, List<String> errors) {
        static ErrorResponse of(String message) {
            return new ErrorResponse(Instant.now(), List.of(message));
        }
    }
}
