package com.medagenda.repository;

import com.medagenda.entity.Consulta;
import com.medagenda.entity.ProfissionalSaude;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    @Override
    @EntityGraph(attributePaths = {"paciente", "profissionalSaude"})
    List<Consulta> findAll();

    @Override
    @EntityGraph(attributePaths = {"paciente", "profissionalSaude"})
    Optional<Consulta> findById(Long id);

    List<Consulta> findByProfissionalSaudeAndInicioEmBetween(
        ProfissionalSaude profissionalSaude,
        LocalDateTime inicio,
        LocalDateTime fim
    );
}
