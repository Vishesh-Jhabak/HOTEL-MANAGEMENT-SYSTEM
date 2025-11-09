package com.meta.hotel.auth.service;

import com.meta.hotel.auth.model.Role;
import com.meta.hotel.auth.model.User;
import com.meta.hotel.auth.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthAppService {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthAppService(UserRepository users, PasswordEncoder encoder, JwtService jwtService) {
        this.users = users;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public String signup(String username, String password, Role role) {
        users.findByUsername(username).ifPresent(u -> { throw new IllegalStateException("Username already exists"); });
        User u = new User();
        u.setUsername(username);
        u.setPasswordHash(encoder.encode(password));
        u.setRole(role == null ? Role.GUEST : role);
        users.save(u);
        return jwtService.generateToken(u.getUsername(), u.getRole());
    }

    public Optional<String> login(String username, String password) {
        return users.findByUsername(username)
                .filter(u -> encoder.matches(password, u.getPasswordHash()))
                .map(u -> jwtService.generateToken(u.getUsername(), u.getRole()));
    }
}


