package com.medagenda.service;

import com.medagenda.entity.ProfissionalSaude;
import com.medagenda.repository.ProfissionalSaudeRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfissionalSaudeService {

    private final ProfissionalSaudeRepository profissionalSaudeRepository;

    public ProfissionalSaudeService(ProfissionalSaudeRepository profissionalSaudeRepository) {
        this.profissionalSaudeRepository = profissionalSaudeRepository;
    }

    @Transactional(readOnly = true)
    public List<ProfissionalSaude> listar() {
        return profissionalSaudeRepository.findAll();
    }

    @Transactional(readOnly = true)
    public ProfissionalSaude buscarPorId(Long id) {
        return profissionalSaudeRepository.findById(id)
            .orElseThrow(() -> new RecursoNaoEncontradoException("Profissional de saúde não encontrado"));
    }

    @Transactional
    public ProfissionalSaude criar(ProfissionalSaude profissionalSaude) {
        boolean registroEmUso = profissionalSaudeRepository
            .findByRegistroConselho(profissionalSaude.getRegistroConselho())
            .isPresent();

        if (registroEmUso) {
            throw new RegraNegocioException("Já existe profissional cadastrado com este registro");
        }

        return profissionalSaudeRepository.save(profissionalSaude);
    }
}
