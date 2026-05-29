package com.medagenda.controller;

import com.medagenda.entity.Consulta;
import com.medagenda.entity.StatusConsulta;
import com.medagenda.service.ConsultaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDateTime;
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
@RequestMapping("/api/consultas")
public class ConsultaController {

    private final ConsultaService consultaService;

    public ConsultaController(ConsultaService consultaService) {
        this.consultaService = consultaService;
    }

    @GetMapping
    public List<ConsultaResponse> listar() {
        return consultaService.listar().stream()
            .map(ConsultaResponse::fromEntity)
            .toList();
    }

    @GetMapping("/{id}")
    public ConsultaResponse buscarPorId(@PathVariable Long id) {
        return ConsultaResponse.fromEntity(consultaService.buscarPorId(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ConsultaResponse criar(@Valid @RequestBody ConsultaRequest request) {
        Consulta consulta = consultaService.criar(
            request.pacienteId(),
            request.profissionalSaudeId(),
            request.inicioEm(),
            request.fimEm(),
            request.observacoes()
        );

        return ConsultaResponse.fromEntity(consulta);
    }

    public record ConsultaRequest(
        @NotNull Long pacienteId,
        @NotNull Long profissionalSaudeId,
        @NotNull @Future LocalDateTime inicioEm,
        @NotNull LocalDateTime fimEm,
        @Size(max = 500) String observacoes
    ) {
    }

    public record ConsultaResponse(
        Long id,
        Long pacienteId,
        String pacienteNome,
        Long profissionalSaudeId,
        String profissionalSaudeNome,
        LocalDateTime inicioEm,
        LocalDateTime fimEm,
        StatusConsulta status,
        String observacoes,
        Instant criadoEm,
        Instant atualizadoEm
    ) {
        static ConsultaResponse fromEntity(Consulta consulta) {
            return new ConsultaResponse(
                consulta.getId(),
                consulta.getPaciente().getId(),
                consulta.getPaciente().getNome(),
                consulta.getProfissionalSaude().getId(),
                consulta.getProfissionalSaude().getNome(),
                consulta.getInicioEm(),
                consulta.getFimEm(),
                consulta.getStatus(),
                consulta.getObservacoes(),
                consulta.getCriadoEm(),
                consulta.getAtualizadoEm()
            );
        }
    }
}
