package com.example.alleats.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

// @Service = Denne fil håndterer JWT tokens
@Service
public class JwtService {

    // Hemmelig nøgle til at signere tokens - skal holdes hemmelig!
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Token holder i 24 timer
    private final long EXPIRATION = 86400000;

    // Lav en ny token til en bruger
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(secretKey)
                .compact();
    }

    // Hent email ud fra en token
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Tjek om en token er gyldig
    public boolean isTokenValid(String token) {
        try {
            getEmailFromToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}