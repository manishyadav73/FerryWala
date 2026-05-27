package backend.controller;

import backend.dto.LoginRequest;
import backend.dto.RegisterRequest;

import backend.model.User;

import backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api/users")

@CrossOrigin("*")

public class UserController {

    @Autowired
    private UserService userService;

    // REGISTER

    @PostMapping("/register")

    public User registerUser(

            @RequestBody RegisterRequest request
    ) {

        return userService.registerUser(request);
    }

    // LOGIN

    @PostMapping("/login")

    public Object loginUser(

            @RequestBody LoginRequest request
    ) {

        String token =
                userService.loginUser(request);

        // INVALID LOGIN

        if (token == null) {

            return "INVALID_CREDENTIALS";
        }

        // SUCCESS LOGIN

        return token;
    }
}