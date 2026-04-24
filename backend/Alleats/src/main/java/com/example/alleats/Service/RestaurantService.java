public Restaurant updateRestaurant(Long id, Restaurant updated) {
    Restaurant existing = restaurantRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Restaurant ikke fundet"));
    existing.setName(updated.getName());
    existing.setDescription(updated.getDescription());
    existing.setAddress(updated.getAddress());
    existing.setImageUrl(updated.getImageUrl());
    existing.setCategory(updated.getCategory());
    existing.setOpen(updated.isOpen());
    return restaurantRepository.save(existing);
}