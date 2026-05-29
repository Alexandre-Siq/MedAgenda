package com.medagenda.repository;

import com.medagenda.entity.Paciente;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    Optional<Paciente> findByCpf(String cpf);
}
