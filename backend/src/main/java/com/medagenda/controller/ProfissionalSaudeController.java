package com.medagenda.controller;

import com.medagenda.entity.ProfissionalSaude;
import com.medagenda.service.ProfissionalSaudeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profissionais-saude")
public class ProfissionalSaudeController {

    private final ProfissionalSaudeService profissionalSaudeService;

    public ProfissionalSaudeController(ProfissionalSaudeService profissionalSaudeService) {
        this.profissionalSaudeService = profissionalSaudeService;
    }

    @GetMapping
    public List<ProfissionalSaudeResponse> listar() {
        return profissionalSaudeService.listar().stream()
            .map(ProfissionalSaudeResponse::fromEntity)
            .toList();
    }

    @GetMapping("/{id}")
    public ProfissionalSaudeResponse buscarPorId(@PathVariable Long id) {
        return ProfissionalSaudeResponse.fromEntity(profissionalSaudeService.buscarPorId(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProfissionalSaudeResponse criar(@Valid @RequestBody ProfissionalSaudeRequest request) {
        ProfissionalSaude profissionalSaude = new ProfissionalSaude(
            request.nome(),
            request.email(),
            request.telefone(),
            request.registroConselho(),
            request.especialidade()
        );

        return ProfissionalSaudeResponse.fromEntity(profissionalSaudeService.criar(profissionalSaude));
    }

    public record ProfissionalSaudeRequest(
        @NotBlank @Size(max = 120) String nome,
        @Email @Size(max = 160) String email,
        @Size(max = 20) String telefone,
        @NotBlank @Size(max = 30) String registroConselho,
        @NotBlank @Size(max = 80) String especialidade
    ) {
    }

    public record ProfissionalSaudeResponse(
        Long id,
        String nome,
        String email,
        String telefone,
        String registroConselho,
        String especialidade,
        Instant criadoEm,
        Instant atualizadoEm
    ) {
        static ProfissionalSaudeResponse fromEntity(ProfissionalSaude profissionalSaude) {
            return new ProfissionalSaudeResponse(
                profissionalSaude.getId(),
                profissionalSaude.getNome(),
                profissionalSaude.getEmail(),
                profissionalSaude.getTelefone(),
                profissionalSaude.getRegistroConselho(),
                profissionalSaude.getEspecialidade(),
                profissionalSaude.getCriadoEm(),
                profissionalSaude.getAtualizadoEm()
            );
        }
    }
}
