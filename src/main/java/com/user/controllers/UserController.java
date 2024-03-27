package com.user.controllers;
import com.user.entities.User;
import com.user.repositories.UserRepository;

import java.lang.Iterable;
import java.util.Optional;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.net.http.HttpResponse;
import java.net.http.HttpRequest;
import java.net.http.HttpClient;
import java.net.URI;
import java.net.http.HttpResponse.BodyHandlers;

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // @GetMapping("/user")
    // public Iterable<User> getAllUsers() {
    //     return this.userRepository.findAll();
    // }

    @PostMapping("/user")
    public User createNewUser(@RequestBody User user) {
        User userLogin = this.userRepository.findByEmail(user.getEmail());
        if (userLogin != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user with this email already");
        }
        user.setPassword(user.hashPassword(user.getPassword()));
        User newUser = this.userRepository.save(user);
        return newUser;
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        if (user.getEmail() != null) {
            String userEmail = user.getEmail();
            User userLogin = this.userRepository.findByEmail(userEmail);
            if (userLogin != null) {
                if (userLogin.checkPass(user.getPassword(), userLogin.getPassword())) {
                    return userLogin;
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "incorrect password");
                }
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found");
        }
    }

    @PostMapping("/logout/{id}")
    public User logoutUser(@PathVariable("id") Integer id) {
        Optional<User> userLogin = this.userRepository.findById(id);
        if (userLogin.isPresent()) {
            return userLogin.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found");
        }
    }

    @GetMapping("/searchAPI/**")
    public String searchLastFm(HttpServletRequest request1) throws Exception {
        String baseUrl = request1.getRequestURL().toString();
        String queryString = request1.getQueryString().toString();
        String fullUrl = baseUrl + "?" + queryString;
        String url = fullUrl.split("/searchAPI/")[1];
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
          .header("Content-Type", "application/json")
          .header("Accept", "application/json")
          .header("User-Agent", "mkvistrf2write")
          .uri(URI.create(url))
          .build();
        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        return response.body();
    }
}




