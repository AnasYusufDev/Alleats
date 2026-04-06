package com.example.alleats.Service;

import com.example.alleats.model.Restaurant;
import com.example.alleats.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    // Hent alle restauranter
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    // Hent én restaurant via ID
    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant ikke fundet"));
    }

    // Opret ny restaurant
    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }
}