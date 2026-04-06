package com.example.alleats.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Restaurantens navn
    private String name;

    // Beskrivelse af restauranten
    private String description;

    // Adresse
    private String address;

    // Billede URL
    private String imageUrl;

    // Er restauranten åben?
    private boolean open;

    // Hvilken madkategori (fx Pizza, Burger, Sushi)
    private String category;
}