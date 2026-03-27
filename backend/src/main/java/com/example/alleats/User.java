package com.example.alleats.model;


import jakarta.persistence.*;
import lombok.Data;

// @Data = Lombok laver automatisk getters og setters
@Data

// @Entity = Denne klasse er en databasetabel i MySQL
@Entity

// @Table = Tabellen hedder "users" i databasen
@Table(name = "users")
public class User {

    // Unikt ID som gives automatisk (1, 2, 3...)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Brugerens fulde navn
    private String name;

    // Email skal være unik
    @Column(unique = true)
    private String email;

    // Password - kun brugt ved email/password login
    // Er null hvis brugeren logger ind med Google
    private String password;

    // Google bruger ID - kun brugt ved Google login
    // Er null hvis brugeren logger ind med email/password
    private String googleId;

    // Hvilken login metode brugeren bruger
    @Enumerated(EnumType.STRING)
    private LoginType loginType;

    // Rolle i appen
    @Enumerated(EnumType.STRING)
    private Role role;

    // De 2 login metoder
    public enum LoginType {
        EMAIL,   // Logger ind med email og password
        GOOGLE   // Logger ind med Google konto
    }

    // De 3 mulige roller
    public enum Role {
        KUNDE,       // Bestiller mad
        RESTAURANT,  // Modtager og laver mad
        BUD          // Leverer maden
    }
}