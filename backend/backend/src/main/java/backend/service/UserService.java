package backend.service;

import backend.security.JwtUtil;

import backend.dto.LoginRequest;
import backend.dto.RegisterRequest;

import backend.model.User;

import backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER USER

    public User registerUser(
            RegisterRequest request
    ) {

        User user = new User();

        user.setName(
                request.getName()
        );

        user.setEmail(
                request.getEmail()
        );

        // ENCRYPT PASSWORD

        user.setPassword(

                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        return userRepository.save(user);
    }

    // LOGIN USER

    public String loginUser(

            LoginRequest request
    ) {

        User user = userRepository

                .findByEmail(
                        request.getEmail()
                )

                .orElse(null);

        // USER NOT FOUND

        if (user == null) {

            return null;
        }

        // PASSWORD CHECK

        if (

                !passwordEncoder.matches(

                        request.getPassword(),

                        user.getPassword()
                )
        ) {

            return null;
        }

        // SUCCESS LOGIN

        return JwtUtil.generateToken(
                user.getEmail()
        );
    }
}