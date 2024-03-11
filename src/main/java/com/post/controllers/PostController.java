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

    @PutMapping("/post/{id}")
    public Post updatePost(@PathVariable("id") Integer id, @RequestBody Post post) {
        Optional<Post> postToUpdateOptional = this.postRepository.findById(id);
        if (!postToUpdateOptional.isPresent()) {
            return null;
        }
        Post postToUpdate = postToUpdateOptional.get();
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
    }

    @DeleteMapping("/post/{id}")
    public Post deletePost(@PathVariable("id") Integer id) {
        Optional<Post> postToDeleteOptional = this.postRepository.findById(id);
        if (!postToDeleteOptional.isPresent()) {
            return null;
        }
        Post postToDelete = postToDeleteOptional.get();
        this.postRepository.delete(postToDelete);
        return postToDelete;
    }
}
