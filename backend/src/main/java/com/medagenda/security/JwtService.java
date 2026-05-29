package com.medagenda.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final String secret;
    private final Duration expiration;

    public JwtService(
        @Value("${app.security.jwt.secret}") String secret,
        @Value("${app.security.jwt.expiration-minutes:120}") long expirationMinutes
    ) {
        this.secret = secret;
        this.expiration = Duration.ofMinutes(expirationMinutes);
    }

    public String gerarToken(UserDetails userDetails) {
        Instant now = Instant.now();

        return Jwts.builder()
            .subject(userDetails.getUsername())
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plus(expiration)))
            .signWith(signingKey())
            .compact();
    }

    public String extrairEmail(String token) {
        return Jwts.parser()
            .verifyWith(signingKey())
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }

    public boolean tokenValido(String token, UserDetails userDetails) {
        return extrairEmail(token).equals(userDetails.getUsername());
    }

    public long expiracaoEmSegundos() {
        return expiration.toSeconds();
    }

    private SecretKey signingKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
