package com.melodify.melodify.service;

import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.User;
import com.melodify.melodify.model.Tag;
import com.melodify.melodify.model.request.PostCreateRequest;
import com.melodify.melodify.model.request.PostUpdateRequest;
import com.melodify.melodify.model.response.PostResponse;
import com.melodify.melodify.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;
    private final TagService tagService;

    public PostService(PostRepository postRepository, UserService userService, TagService tagService) {
        this.postRepository = postRepository;
        this.userService = userService;
        this.tagService = tagService;
    }

    private List<PostResponse> mapper(List<Post> posts) {
        return posts.stream().map(post -> {
            List<String> tags = tagService.getTagsByPost(post).stream().map(Tag::getTag).collect(Collectors.toList());
            return new PostResponse(post, tags);
        }).collect(Collectors.toList());
    }

    public List<PostResponse> getAllPosts() {
        return mapper(postRepository.findAll());
    }

    public List<PostResponse> getPostsByAuthorAndTag(String author, String tag) {
        List<PostResponse> temp = getPostsByAuthor(author);
        return temp.stream().filter(post -> post.getTags().contains(tag)).collect(Collectors.toList());
    }

    public List<PostResponse> getPostsByAuthor(String author) {
        User user = userService.getOneUserByUsername(author);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return mapper(postRepository.findByAuthor(user));
    }

    public List<PostResponse> getPostsByTag(String tag) {
        return mapper(tagService.getPostsByTag(tag));
    }

    public boolean createOnePost(PostCreateRequest newPostRequest) {
        User author = userService.getOneUserByUsername(newPostRequest.getAuthor());
        if (author == null) {
            throw new IllegalArgumentException("Author not found");
        }
        Post post = new Post(newPostRequest.getText(), author, newPostRequest.getMedia_url());
        postRepository.save(post);
        for (String tag : newPostRequest.getTags()) {
            tagService.createOneTag(tag, post);
        }
        return true;
    }

    private PostResponse convertToResponse(Post post) {
        List<String> tags = tagService.getTagsByPost(post).stream().map(Tag::getTag).collect(Collectors.toList());
        return new PostResponse(post, tags);
    }

    public PostResponse getOnePostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with ID: " + postId));
        return convertToResponse(post);
    }

    public PostResponse updateOnePostById(Long postId, PostUpdateRequest updatePost) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            throw new IllegalArgumentException("Post not found");
        }
        String text = updatePost.getText();
        String media_url = updatePost.getMedia_url();
        if (text == null && media_url == null)
            throw new IllegalArgumentException("Nothing to update");
        if (text != null)
            post.setText(text);
        if (media_url != null)
            post.setMedia_url(media_url);
        postRepository.save(post);
        return convertToResponse(post);
    }

    public void deleteOnePostById(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            throw new IllegalArgumentException("Post not found");
        }
        postRepository.delete(post);
    }

}
