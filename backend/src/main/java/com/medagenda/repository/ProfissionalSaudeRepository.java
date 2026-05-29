package com.medagenda.repository;

import com.medagenda.entity.ProfissionalSaude;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfissionalSaudeRepository extends JpaRepository<ProfissionalSaude, Long> {

    Optional<ProfissionalSaude> findByRegistroConselho(String registroConselho);
}
