package com.example.alleats.Controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*") // Gør det muligt for din app at kalde backend
@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/users")
    public List<String> getUsers() {
        return List.of("Anas", "Mikkel", "Sara");
    }
}
