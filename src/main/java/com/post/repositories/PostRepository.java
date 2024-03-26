package com.post.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.post.entities.Post;

public interface PostRepository extends CrudRepository<Post, Integer> {
    List<Post> findByUserId(String userId);
    Post findByUserKey(String userKey);
}