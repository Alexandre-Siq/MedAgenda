package com.medagenda.service;

import java.time.Instant;
import org.springframework.stereotype.Service;

@Service
public class HealthService {

    public HealthStatus currentStatus() {
        return new HealthStatus("MedAgenda API", "UP", Instant.now());
    }

    public record HealthStatus(String service, String status, Instant checkedAt) {
    }
}
