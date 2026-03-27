package com.example.alleats.controller;

import com.example.alleats.model.User;
import com.example.alleats.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// @RestController = Denne fil modtager og svarer på requests fra appen
@RestController

// @RequestMapping = Alle endpoints starter med /auth
@RequestMapping("/auth")

@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // POST /auth/register - Opret ny bruger
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        User user = authService.registerWithEmail(
                request.name(),
                request.email(),
                request.password()
        );
        return ResponseEntity.ok(user);
    }

    // POST /auth/login - Log ind
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest request) {
        User user = authService.loginWithEmail(
                request.email(),
                request.password()
        );
        return ResponseEntity.ok(user);
    }

    // Hvad der sendes med ved registrering
    record RegisterRequest(String name, String email, String password) {}

    // Hvad der sendes med ved login
    record LoginRequest(String email, String password) {}
}