package com.medagenda.controller;

import com.medagenda.entity.Paciente;
import com.medagenda.service.PacienteService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDate;
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
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping
    public List<PacienteResponse> listar() {
        return pacienteService.listar().stream()
            .map(PacienteResponse::fromEntity)
            .toList();
    }

    @GetMapping("/{id}")
    public PacienteResponse buscarPorId(@PathVariable Long id) {
        return PacienteResponse.fromEntity(pacienteService.buscarPorId(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PacienteResponse criar(@Valid @RequestBody PacienteRequest request) {
        Paciente paciente = new Paciente(
            request.nome(),
            request.email(),
            request.telefone(),
            request.cpf(),
            request.dataNascimento()
        );

        return PacienteResponse.fromEntity(pacienteService.criar(paciente));
    }

    public record PacienteRequest(
        @NotBlank @Size(max = 120) String nome,
        @Email @Size(max = 160) String email,
        @Size(max = 20) String telefone,
        @Size(max = 14) String cpf,
        LocalDate dataNascimento
    ) {
    }

    public record PacienteResponse(
        Long id,
        String nome,
        String email,
        String telefone,
        String cpf,
        LocalDate dataNascimento,
        Instant criadoEm,
        Instant atualizadoEm
    ) {
        static PacienteResponse fromEntity(Paciente paciente) {
            return new PacienteResponse(
                paciente.getId(),
                paciente.getNome(),
                paciente.getEmail(),
                paciente.getTelefone(),
                paciente.getCpf(),
                paciente.getDataNascimento(),
                paciente.getCriadoEm(),
                paciente.getAtualizadoEm()
            );
        }
    }
}
