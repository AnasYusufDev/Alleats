package com.example.alleats.Service;

import com.example.alleats.model.MenuItem;
import com.example.alleats.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Menuservice {

    private final MenuItemRepository menuItemRepository;

    // Hent alle menu items for en restaurant
    public List<MenuItem> getMenuByRestaurantId(Long restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId);
    }

    // Opret nyt menu item
    public MenuItem createMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }
}