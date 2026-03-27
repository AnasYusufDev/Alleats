
package com.example.alleats.repository;

import com.example.alleats.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

// @Repository = Denne fil håndterer databasekald
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find en bruger via email - bruges ved login
    Optional<User> findByEmail(String email);

    // Find en bruger via Google ID - bruges ved Google login
    Optional<User> findByGoogleId(String googleId);

    // Tjek om en email allerede er i brug - bruges ved registrering
    boolean existsByEmail(String email);
}