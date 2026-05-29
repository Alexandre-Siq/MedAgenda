package com.medagenda.config;

import com.medagenda.entity.Consulta;
import com.medagenda.entity.Paciente;
import com.medagenda.entity.PapelUsuario;
import com.medagenda.entity.ProfissionalSaude;
import com.medagenda.entity.StatusConsulta;
import com.medagenda.entity.Usuario;
import com.medagenda.repository.ConsultaRepository;
import com.medagenda.repository.PacienteRepository;
import com.medagenda.repository.ProfissionalSaudeRepository;
import com.medagenda.repository.UsuarioRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DemoDataConfig {

    @Bean
    @ConditionalOnProperty(prefix = "app.demo.seed", name = "enabled", havingValue = "true")
    ApplicationRunner seedDemoData(
        UsuarioRepository usuarioRepository,
        PacienteRepository pacienteRepository,
        ProfissionalSaudeRepository profissionalSaudeRepository,
        ConsultaRepository consultaRepository,
        PasswordEncoder passwordEncoder
    ) {
        return args -> {
            criarUsuarioDemo(usuarioRepository, passwordEncoder);

            if (pacienteRepository.count() > 0 || profissionalSaudeRepository.count() > 0) {
                return;
            }

            List<Paciente> pacientes = pacienteRepository.saveAll(List.of(
                new Paciente("Mariana Alves", "mariana.alves@email.com", "(11) 98888-2201", "12345678901", LocalDate.of(1992, 4, 12)),
                new Paciente("Carlos Mendes", "carlos.mendes@email.com", "(11) 97777-1902", "23456789012", LocalDate.of(1985, 8, 23)),
                new Paciente("Helena Costa", "helena.costa@email.com", "(21) 96666-4410", "34567890123", LocalDate.of(1978, 1, 30))
            ));

            ProfissionalSaude profissional = profissionalSaudeRepository.save(
                new ProfissionalSaude(
                    "Dr. Ricardo Lima",
                    "dr.ricardo@medagenda.local",
                    "(11) 3333-4444",
                    "CRM-SP 123456",
                    "Cardiologia"
                )
            );

            LocalDateTime amanha = LocalDateTime.now().plusDays(1).withHour(9).withMinute(0).withSecond(0).withNano(0);
            Consulta consultaConfirmada = new Consulta(
                pacientes.get(0),
                profissional,
                amanha,
                amanha.plusMinutes(30),
                "Consulta inicial de demonstração"
            );
            consultaConfirmada.setStatus(StatusConsulta.CONFIRMADA);

            LocalDateTime depoisDeAmanha = amanha.plusDays(1).withHour(10);
            Consulta consultaAgendada = new Consulta(
                pacientes.get(1),
                profissional,
                depoisDeAmanha,
                depoisDeAmanha.plusMinutes(30),
                "Retorno cardiológico"
            );

            LocalDateTime terceiraConsulta = amanha.plusDays(2).withHour(14);
            Consulta teleconsulta = new Consulta(
                pacientes.get(2),
                profissional,
                terceiraConsulta,
                terceiraConsulta.plusMinutes(45),
                "Teleconsulta de acompanhamento"
            );
            teleconsulta.setStatus(StatusConsulta.CONFIRMADA);

            consultaRepository.saveAll(List.of(consultaConfirmada, consultaAgendada, teleconsulta));
        };
    }

    private void criarUsuarioDemo(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        if (usuarioRepository.existsByEmail("dr.ricardo@medagenda.local")) {
            return;
        }

        usuarioRepository.save(new Usuario(
            "Dr. Ricardo Lima",
            "dr.ricardo@medagenda.local",
            passwordEncoder.encode("medagenda123"),
            PapelUsuario.PROFISSIONAL
        ));
    }
}
