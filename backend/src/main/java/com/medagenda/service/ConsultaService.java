package com.medagenda.service;

import com.medagenda.entity.Consulta;
import com.medagenda.entity.Paciente;
import com.medagenda.entity.ProfissionalSaude;
import com.medagenda.repository.ConsultaRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ConsultaService {

    private final ConsultaRepository consultaRepository;
    private final PacienteService pacienteService;
    private final ProfissionalSaudeService profissionalSaudeService;

    public ConsultaService(
        ConsultaRepository consultaRepository,
        PacienteService pacienteService,
        ProfissionalSaudeService profissionalSaudeService
    ) {
        this.consultaRepository = consultaRepository;
        this.pacienteService = pacienteService;
        this.profissionalSaudeService = profissionalSaudeService;
    }

    @Transactional(readOnly = true)
    public List<Consulta> listar() {
        return consultaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Consulta buscarPorId(Long id) {
        return consultaRepository.findById(id)
            .orElseThrow(() -> new RecursoNaoEncontradoException("Consulta não encontrada"));
    }

    @Transactional
    public Consulta criar(Long pacienteId, Long profissionalSaudeId, LocalDateTime inicioEm, LocalDateTime fimEm, String observacoes) {
        validarPeriodo(inicioEm, fimEm);

        Paciente paciente = pacienteService.buscarPorId(pacienteId);
        ProfissionalSaude profissionalSaude = profissionalSaudeService.buscarPorId(profissionalSaudeId);
        Consulta consulta = new Consulta(paciente, profissionalSaude, inicioEm, fimEm, observacoes);

        return consultaRepository.save(consulta);
    }

    private void validarPeriodo(LocalDateTime inicioEm, LocalDateTime fimEm) {
        if (!fimEm.isAfter(inicioEm)) {
            throw new RegraNegocioException("O fim da consulta deve ser posterior ao início");
        }
    }
}
