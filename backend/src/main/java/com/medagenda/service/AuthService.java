package com.medagenda.service;

import com.medagenda.entity.PapelUsuario;
import com.medagenda.entity.Usuario;
import com.medagenda.repository.UsuarioRepository;
import com.medagenda.security.JwtService;
import com.medagenda.security.UsuarioDetailsService;
import java.time.Instant;
import java.util.Locale;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UsuarioDetailsService usuarioDetailsService;
    private final JwtService jwtService;

    public AuthService(
        UsuarioRepository usuarioRepository,
        PasswordEncoder passwordEncoder,
        AuthenticationManager authenticationManager,
        UsuarioDetailsService usuarioDetailsService,
        JwtService jwtService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.usuarioDetailsService = usuarioDetailsService;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResult registrar(String nome, String email, String senha, PapelUsuario papel) {
        String emailNormalizado = normalizarEmail(email);

        if (usuarioRepository.existsByEmail(emailNormalizado)) {
            throw new RegraNegocioException("Ja existe usuario cadastrado com este e-mail");
        }

        Usuario usuario = new Usuario(
            nome,
            emailNormalizado,
            passwordEncoder.encode(senha),
            papel
        );

        usuarioRepository.save(usuario);

        return gerarResposta(usuario);
    }

    @Transactional(readOnly = true)
    public AuthResult login(String email, String senha) {
        String emailNormalizado = normalizarEmail(email);

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(emailNormalizado, senha)
        );

        Usuario usuario = usuarioRepository.findByEmail(emailNormalizado)
            .orElseThrow(() -> new RecursoNaoEncontradoException("Usuario nao encontrado"));

        return gerarResposta(usuario);
    }

    private AuthResult gerarResposta(Usuario usuario) {
        UserDetails userDetails = usuarioDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtService.gerarToken(userDetails);

        return new AuthResult(
            token,
            "Bearer",
            jwtService.expiracaoEmSegundos(),
            new UsuarioAutenticado(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getPapel(),
                usuario.getCriadoEm()
            )
        );
    }

    private String normalizarEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }

    public record AuthResult(
        String accessToken,
        String tokenType,
        long expiresIn,
        UsuarioAutenticado usuario
    ) {
    }

    public record UsuarioAutenticado(
        Long id,
        String nome,
        String email,
        PapelUsuario papel,
        Instant criadoEm
    ) {
    }
}
