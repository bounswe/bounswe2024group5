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

    public Post createOnePost(PostCreateRequest newPostRequest) {
        Post post = new Post();
        User author = userService.getOneUserByUsername(newPostRequest.getAuthor());
        post.setAuthor(author);
        post.setText(newPostRequest.getText());
        post.setMedia_url(newPostRequest.getMedia_url());
        post.setTag(newPostRequest.getTag());
        return postRepository.save(post);
    }

}
