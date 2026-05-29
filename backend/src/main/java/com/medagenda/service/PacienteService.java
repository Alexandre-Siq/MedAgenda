package com.medagenda.service;

import com.medagenda.entity.Paciente;
import com.medagenda.repository.PacienteRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Transactional(readOnly = true)
    public List<Paciente> listar() {
        return pacienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Paciente buscarPorId(Long id) {
        return pacienteRepository.findById(id)
            .orElseThrow(() -> new RecursoNaoEncontradoException("Paciente nao encontrado"));
    }

    @Transactional
    public Paciente criar(Paciente paciente) {
        if (paciente.getCpf() != null && pacienteRepository.findByCpf(paciente.getCpf()).isPresent()) {
            throw new RegraNegocioException("Ja existe paciente cadastrado com este CPF");
        }

        return pacienteRepository.save(paciente);
    }
}
