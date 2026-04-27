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
            seed(users, encoder, "admin1", Role.ADMIN, 1L, null);
            seed(users, encoder, "mgr1", Role.MANAGER, 2L, null);
            seed(users, encoder, "rec1", Role.RECEPTIONIST, 3L, null);
            seed(users, encoder, "hk1", Role.HOUSEKEEPING, 4L, null);
            seed(users, encoder, "guest1", Role.GUEST, null, 1L);
        };
    }

    private void seed(UserRepository users, PasswordEncoder encoder, String username, Role role, Long staffId, Long customerId) {
        users.findByUsername(username).ifPresentOrElse(u -> {
            boolean updated = false;
            if (u.getStaffId() == null && staffId != null) { u.setStaffId(staffId); updated = true; }
            if (u.getCustomerId() == null && customerId != null) { u.setCustomerId(customerId); updated = true; }
            if (updated) users.save(u);
        }, () -> {
            User u = new User();
            u.setUsername(username);
            u.setPasswordHash(encoder.encode("password"));
            u.setRole(role);
            u.setStaffId(staffId);
            u.setCustomerId(customerId);
            users.save(u);
        });
    }
}


