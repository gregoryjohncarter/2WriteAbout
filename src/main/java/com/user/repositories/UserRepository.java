package com.user.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.user.entities.User;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByEmail(String email);
}