package com.meta.hotel.auth.config;

import com.meta.hotel.auth.model.Role;
import com.meta.hotel.auth.model.User;
import com.meta.hotel.auth.repo.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
    @Bean
    ApplicationRunner seedUsers(UserRepository users, PasswordEncoder encoder) {
        return args -> {
            seed(users, encoder, "admin1", Role.ADMIN);
            seed(users, encoder, "mgr1", Role.MANAGER);
            seed(users, encoder, "rec1", Role.RECEPTIONIST);
            seed(users, encoder, "hk1", Role.HOUSEKEEPING);
            seed(users, encoder, "guest1", Role.GUEST);
        };
    }

    private void seed(UserRepository users, PasswordEncoder encoder, String username, Role role) {
        users.findByUsername(username).ifPresentOrElse(u -> {}, () -> {
            User u = new User();
            u.setUsername(username);
            u.setPasswordHash(encoder.encode("password"));
            u.setRole(role);
            users.save(u);
        });
    }
}


