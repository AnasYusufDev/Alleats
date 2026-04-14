package com.example.alleats.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Hvornår ordren blev lavet
    private LocalDateTime createdAt;

    // Total pris
    private Double totalPrice;

    // Status på ordren
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    // Hvilken restaurant
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    public enum OrderStatus {
        PENDING,
        CONFIRMED,
        DELIVERED
    }
}