package com.example.alleats.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Navn på retten
    private String name;

    // Beskrivelse af retten
    private String description;

    // Pris i kroner
    private Double price;

    // Billede URL
    private String imageUrl;

    // Kategori (fx Burger, Drink, Dessert)
    private String category;

    // Hvilken restaurant retten tilhører
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
}