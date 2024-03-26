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

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
public class PostController {

    private final PostRepository postRepository;

    public PostController(final PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping("/post/{user}")
    public Iterable<Post> getPostsByUser(@PathVariable("user") String userId) {
        Iterable<Post> postsByUser = this.postRepository.findByUserId(userId);
        return postsByUser;
    }

    @PostMapping("/post")
    public Post createNewPost(@RequestBody Post post) {
        post.setCreatedAt(new Date());
        Post newPost = this.postRepository.save(post);
        newPost.setUserKey(newPost.getUserKey() + Integer.toString(newPost.getId()));
        Post newPostEntry = this.postRepository.save(newPost);
        return newPostEntry;
    }

    @PutMapping("/post/{userKey}")
    public Post updatePost(@PathVariable("userKey") String userKey, @RequestBody Post post) {
        Post postToUpdate = this.postRepository.findByUserKey(userKey);
        if (postToUpdate != null) {
            if (post.getTitle() != null) {
                postToUpdate.setTitle(post.getTitle());
            }
            if (post.getSong() != null) {
                postToUpdate.setSong(post.getSong());
            }
            if (post.getArtist() != null) {
                postToUpdate.setArtist(post.getArtist());
            }
            if (post.getLastFmUrl() != null) {
                postToUpdate.setLastFmUrl(post.getLastFmUrl());
            }
            if (post.getBook() != null) {
                postToUpdate.setBook(post.getBook());
            }
            if (post.getAuthor() != null) {
                postToUpdate.setAuthor(post.getAuthor());
            }
            if (post.getGoogBooksUrl() != null) {
                postToUpdate.setGoogBooksUrl(post.getGoogBooksUrl());
            }
            if (post.getText() != null) {
                postToUpdate.setText(post.getText());
            }
            Post updatedPost = this.postRepository.save(postToUpdate);
            return updatedPost;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found");
        }
    }

    @DeleteMapping("/post/{userKey}")
    public Post deletePost(@PathVariable("userKey") String userKey) {
        Post postToDeleteOptional = this.postRepository.findByUserKey(userKey);
        if (postToDeleteOptional != null) {
            this.postRepository.delete(postToDeleteOptional);
            return postToDeleteOptional;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found");
        }
    }
}
