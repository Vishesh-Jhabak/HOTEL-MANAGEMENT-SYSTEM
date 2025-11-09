package com.meta.hotel.auth.controller;

import com.meta.hotel.auth.model.Role;
import com.meta.hotel.auth.service.AuthAppService;
import com.meta.hotel.common.dto.ApiResponse;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Validated
public class AuthController {

    private final AuthAppService authAppService;

    public AuthController(AuthAppService authAppService) {
        this.authAppService = authAppService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestParam("username") @NotBlank String username,
                                                     @RequestParam("password") @NotBlank String password) {
        // Demo: choose role by username prefix; replace with real user store
        return authAppService.login(username, password)
                .map(t -> ResponseEntity.ok(ApiResponse.ok(t)))
                .orElse(ResponseEntity.badRequest().body(ApiResponse.error("Invalid credentials")));
    }

    @PostMapping("/mfa/verify")
    public ResponseEntity<ApiResponse<Boolean>> verifyMfa(@RequestParam("code") @NotBlank String code) {
        return ResponseEntity.ok(ApiResponse.ok(Boolean.TRUE));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<String>> signup(@RequestParam("username") @NotBlank String username,
                                                      @RequestParam("password") @NotBlank String password,
                                                      @RequestParam(value = "role", required = false) Role role) {
        try {
            String token = authAppService.signup(username, password, role);
            return ResponseEntity.ok(ApiResponse.ok(token));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}


