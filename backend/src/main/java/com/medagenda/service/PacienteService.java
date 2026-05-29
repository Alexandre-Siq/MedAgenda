package com.medagenda.service;

import com.medagenda.entity.Paciente;
import com.medagenda.repository.PacienteRepository;
import java.time.LocalDate;
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
            .orElseThrow(() -> new RecursoNaoEncontradoException("Paciente não encontrado"));
    }

    @Transactional
    public Paciente criar(Paciente paciente) {
        prepararDados(paciente);
        validarDados(paciente);
        validarCpfDisponivel(paciente.getCpf(), null);

        return pacienteRepository.save(paciente);
    }

    @Transactional
    public Paciente atualizar(Long id, Paciente dadosAtualizados) {
        Paciente paciente = buscarPorId(id);
        prepararDados(dadosAtualizados);
        validarDados(dadosAtualizados);
        validarCpfDisponivel(dadosAtualizados.getCpf(), id);

        paciente.setNome(dadosAtualizados.getNome());
        paciente.setEmail(dadosAtualizados.getEmail());
        paciente.setTelefone(dadosAtualizados.getTelefone());
        paciente.setCpf(dadosAtualizados.getCpf());
        paciente.setDataNascimento(dadosAtualizados.getDataNascimento());

        return pacienteRepository.save(paciente);
    }

    private void prepararDados(Paciente paciente) {
        paciente.setNome(normalizarTextoObrigatorio(paciente.getNome()));
        paciente.setEmail(normalizarTextoOpcional(paciente.getEmail()));
        paciente.setTelefone(normalizarTextoOpcional(paciente.getTelefone()));
        paciente.setCpf(normalizarCpf(paciente.getCpf()));
    }

    private void validarDados(Paciente paciente) {
        if (paciente.getDataNascimento() != null && paciente.getDataNascimento().isAfter(LocalDate.now())) {
            throw new RegraNegocioException("A data de nascimento não pode estar no futuro");
        }

        if (paciente.getCpf() != null && !cpfValido(paciente.getCpf())) {
            throw new RegraNegocioException("CPF inválido");
        }
    }

    private void validarCpfDisponivel(String cpf, Long pacienteIdAtual) {
        if (cpf == null) {
            return;
        }

        boolean cpfEmUso = pacienteRepository.findByCpf(cpf)
            .filter(paciente -> !paciente.getId().equals(pacienteIdAtual))
            .isPresent();

        if (cpfEmUso) {
            throw new RegraNegocioException("Já existe paciente cadastrado com este CPF");
        }
    }

    private String normalizarTextoObrigatorio(String value) {
        return value == null ? null : value.trim();
    }

    private String normalizarTextoOpcional(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }

    private String normalizarCpf(String cpf) {
        if (cpf == null || cpf.isBlank()) {
            return null;
        }

        return cpf.replaceAll("\\D", "");
    }

    private boolean cpfValido(String cpf) {
        if (!cpf.matches("\\d{11}") || cpf.chars().distinct().count() == 1) {
            return false;
        }

        int primeiroDigito = calcularDigito(cpf, 9);
        int segundoDigito = calcularDigito(cpf, 10);

        return Character.getNumericValue(cpf.charAt(9)) == primeiroDigito
            && Character.getNumericValue(cpf.charAt(10)) == segundoDigito;
    }

    private int calcularDigito(String cpf, int tamanho) {
        int soma = 0;

        for (int index = 0; index < tamanho; index++) {
            soma += Character.getNumericValue(cpf.charAt(index)) * (tamanho + 1 - index);
        }

        int resto = (soma * 10) % 11;
        return resto == 10 ? 0 : resto;
    }
}
