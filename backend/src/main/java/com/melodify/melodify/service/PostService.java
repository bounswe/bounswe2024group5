package com.melodify.melodify.service;

import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.User;
import com.melodify.melodify.model.request.PostCreateRequest;
import com.melodify.melodify.model.response.PostResponse;
import com.melodify.melodify.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;

    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream().map(PostResponse::new).collect(Collectors.toList());
    }

    public boolean createOnePost(PostCreateRequest newPostRequest) {
        User author = userService.getOneUserByUsername(newPostRequest.getAuthor());
        if (author == null) {
            throw new IllegalArgumentException("Author not found");
        }
        Post post = new Post(newPostRequest.getText(), author, newPostRequest.getMedia_url(), newPostRequest.getTag());
        postRepository.save(post);
        return true;
    }

}
