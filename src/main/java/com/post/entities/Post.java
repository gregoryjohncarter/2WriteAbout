package com.post.entities;
import com.user.entities.User;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException; 

@Entity
@Table(name = "POSTS")
public class Post {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String song;

    private String lastFmUrl;

    private String artist;

    private String book;

    private String author;

    private String googBooksUrl;

    @Column(name="text",columnDefinition="LONGTEXT")
    private String text;

    private Date createdAt;

    // @ManyToOne
    // @JoinColumn(name = "userId", nullable = false)
    // private User user;

    private Integer userId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSong() {
        return song;
    }

    public void setSong(String song) {
        this.song = song;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getLastFmUrl() {
        return lastFmUrl;
    }

    public void setLastFmUrl(String lastFmUrl) {
        this.lastFmUrl = lastFmUrl;
    }

    public String getBook() {
        return book;
    }

    public void setBook(String book) {
        this.book = book;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGoogBooksUrl() {
        return googBooksUrl;
    }

    public void setGoogBooksUrl(String googBooksUrl) {
        this.googBooksUrl = googBooksUrl;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getUserId() { 
        return userId;
    }

    public void setUserId(Integer userId) { 
        this.userId = userId; 
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
            Date date = sdf.parse(sdf.format(createdAt));
            this.createdAt = date;
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}