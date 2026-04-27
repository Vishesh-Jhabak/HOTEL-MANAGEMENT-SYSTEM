package com.meta.hotel.auth.service;

import com.meta.hotel.auth.model.Role;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    private final Key key;
    private final long expirationSeconds;

    public JwtService(@Value("${security.jwt.secret}") String secret,
                      @Value("${security.jwt.expirationSeconds}") long expirationSeconds) {
        // Derive a 256-bit key from the provided secret to satisfy HS256 requirements
        byte[] secretBytes = secret.getBytes();
        try {
            java.security.MessageDigest sha256 = java.security.MessageDigest.getInstance("SHA-256");
            byte[] keyBytes = sha256.digest(secretBytes); // 32 bytes
            this.key = Keys.hmacShaKeyFor(keyBytes);
        } catch (Exception e) {
            throw new IllegalStateException("Unable to initialize JWT key", e);
        }
        this.expirationSeconds = expirationSeconds;
    }

    public String generateToken(com.meta.hotel.auth.model.User user) {
        Instant now = Instant.now();
        java.util.Map<String, Object> claims = new java.util.HashMap<>();
        claims.put("role", user.getRole().name());
        if (user.getStaffId() != null) claims.put("staffId", user.getStaffId());
        if (user.getCustomerId() != null) claims.put("customerId", user.getCustomerId());
        
        return Jwts.builder()
                .setSubject(user.getUsername())
                .addClaims(claims)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(expirationSeconds)))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}


