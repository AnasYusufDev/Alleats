package com.example.alleats.Service;

import org.springframework.stereotype.Service;


import com.example.alleats.model.User;
import com.example.alleats.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// @Service = Denne fil håndterer al login og registrering logik
@Service

// @RequiredArgsConstructor = Lombok laver automatisk constructor
@RequiredArgsConstructor
public class AuthService {

    // Bruges til at gemme og hente brugere fra databasen
    private final UserRepository userRepository;

    // Bruges til at kryptere passwords
    private final PasswordEncoder passwordEncoder;

    // Registrer en ny bruger med email og password
    public User registerWithEmail(String name, String email, String password) {

        // Tjek om email allerede er i brug
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email er allerede i brug");
        }

        // Lav en ny bruger
        User user = new User();
        user.setName(name);
        user.setEmail(email);

        // Krypter password før det gemmes i databasen
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(User.Role.KUNDE);
        user.setLoginType(User.LoginType.EMAIL);

        // Gem brugeren i databasen
        return userRepository.save(user);
    }

    // Login med email og password
    public User loginWithEmail(String email, String password) {

        // Find brugeren via email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Bruger ikke fundet"));

        // Tjek om password er korrekt
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Forkert password");
        }

        return user;
    }

    private final JwtService jwtService;
}