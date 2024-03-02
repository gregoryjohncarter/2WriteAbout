package com.post.controllers;
import com.post.entities.Post;
import com.post.repositories.PostRepository;
import com.user.repositories.UserRepository;

import java.lang.Iterable;
import java.util.Optional;
import java.util.List;
import java.util.Date;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class PostController {

    private final PostRepository postRepository;

    public PostController(final PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping("/post/{id}")
    public Iterable<Post> getPostsByUser(@PathVariable("id") Integer id) {
        Iterable<Post> postsByUser = this.postRepository.findByUserId(id);
        return postsByUser;
    }

    @PostMapping("/post")
    public Post createNewPost(@RequestBody Post post) {
        post.setCreatedAt(new Date());
        Post newPost = this.postRepository.save(post);
        return newPost;
    }
}
