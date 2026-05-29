package com.medagenda.controller;

import com.medagenda.entity.PapelUsuario;
import com.medagenda.service.AuthService;
import com.medagenda.service.AuthService.AuthResult;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResult registrar(@Valid @RequestBody RegistroRequest request) {
        return authService.registrar(
            request.nome(),
            request.email(),
            request.senha(),
            request.papel()
        );
    }

    @PostMapping("/login")
    public AuthResult login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request.email(), request.senha());
    }

    public record RegistroRequest(
        @NotBlank @Size(max = 120) String nome,
        @NotBlank @Email @Size(max = 160) String email,
        @NotBlank @Size(min = 8, max = 120) String senha,
        PapelUsuario papel
    ) {
    }

    public record LoginRequest(
        @NotBlank @Email @Size(max = 160) String email,
        @NotBlank @Size(max = 120) String senha
    ) {
    }
}
