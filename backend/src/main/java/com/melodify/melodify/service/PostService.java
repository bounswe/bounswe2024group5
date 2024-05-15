package com.melodify.melodify.service;

import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.User;
import com.melodify.melodify.model.Tag;
import com.melodify.melodify.model.request.PostCreateRequest;
import com.melodify.melodify.model.request.PostUpdateRequest;
import com.melodify.melodify.model.response.PostResponse;
import com.melodify.melodify.model.PostSearch;
import com.melodify.melodify.repository.PostRepository;
import com.melodify.melodify.repository.PostSearchRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private TagService tagService;

    @Autowired
    private PostSearchRepository postSearchRepository;

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

    public long createOnePost(String authorUsername, PostCreateRequest newPostRequest) {
        User author = userService.getOneUserByUsername(authorUsername);
        if (newPostRequest.getText() == null)
            throw new IllegalArgumentException("text is required");
        Post post = new Post(newPostRequest.getText(), author, newPostRequest.getMedia_url());
        int id = postRepository.save(post).getId().intValue();
        PostSearch postSearch = new PostSearch(id, newPostRequest.getText(), authorUsername);
        postSearchRepository.save(postSearch);
        try {
            for (String tag : newPostRequest.getTags()) {
                tagService.createOneTag(tag, post);
            }
        } catch (Exception e) {
            postRepository.delete(post);
            throw new IllegalArgumentException(e.getMessage());
        }
        return id;
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

    public PostResponse updateOnePostById(String authorUsername, Long postId, PostUpdateRequest updatePost) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        if (!post.getAuthor().getUsername().equals(authorUsername))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        String text = updatePost.getText();
        String media_url = updatePost.getMedia_url();
        if (text == null && media_url == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "text or media_url is required");
        if (text != null)
            post.setText(text);
        if (media_url != null)
            post.setMedia_url(media_url);
        postRepository.save(post);
        PostSearch postSearch = new PostSearch(postId.intValue(), text, authorUsername);
        postSearchRepository.save(postSearch);
        return convertToResponse(post);
    }

    public void deleteOnePostById(String authorUsername, Long postId)  {
        Post post = postRepository.findById(postId).orElse(null);
        PostSearch postSearch = postSearchRepository.findById(postId.intValue()).orElse(null);
        if (post == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        if (!post.getAuthor().getUsername().equals(authorUsername))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        postRepository.delete(post);
        if(postSearch != null)
            postSearchRepository.delete(postSearch);
    }

}
