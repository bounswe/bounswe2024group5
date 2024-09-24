package com.melodify.melodify.service;

import com.melodify.melodify.model.*;
import com.melodify.melodify.model.request.PostCreateRequest;
import com.melodify.melodify.model.response.PostResponse;
import com.melodify.melodify.repository.PostRepository;
import com.melodify.melodify.repository.PostSearchRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.request.PostCreateRequest;
import com.melodify.melodify.service.PostService;
import com.melodify.melodify.service.UserService;
import com.melodify.melodify.service.TagService;
import com.melodify.melodify.repository.PostRepository;
import com.melodify.melodify.repository.PostSearchRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PostServiceTest {

    @InjectMocks
    PostService postService;

    @Mock
    UserService userService;

    @Mock
    TagService tagService;

    @Mock
    PostLikeService postLikeService;

    @Mock
    PostRepository postRepository;

    @Mock
    PostSearchRepository postSearchRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void convertToResponseWithValidPost() {
        // Given
        User user = new User();
        Post post = new Post("text", user, "media_url");
        post.setId(1L);
        when(tagService.getTagsByPost(any(Post.class))).thenReturn(Arrays.asList(new Tag("tag1", post), new Tag("tag2", post)));
        when(postLikeService.numberOfLikes(any(Long.class))).thenReturn(5);
        // When
        PostResponse postResponse = postService.convertToResponse(post);
        // Then
        assertEquals(1L, postResponse.getId());
        assertEquals(2, postResponse.getTags().size());
        assertEquals(5, postResponse.getLikes());
    }

    @Test
    void convertToResponseWithPostHavingNoTags() {
        // Given
        User user = new User();
        Post post = new Post("text", user, "media_url");
        post.setId(1L);
        when(tagService.getTagsByPost(any(Post.class))).thenReturn(Collections.emptyList());
        when(postLikeService.numberOfLikes(any(Long.class))).thenReturn(5);

        // When
        PostResponse postResponse = postService.convertToResponse(post);
        // Then
        assertEquals(1L, postResponse.getId());
        assertTrue(postResponse.getTags().isEmpty());
        assertEquals(5, postResponse.getLikes());
    }

    @Test
    void convertToResponseWithPostHavingNoLikes() {
        // Given
        User user = new User();
        Post post = new Post("text", user, "media_url");
        post.setId(1L);
        when(tagService.getTagsByPost(any(Post.class))).thenReturn(Arrays.asList(new Tag("tag1", post), new Tag("tag2", post)));
        when(postLikeService.numberOfLikes(any(Long.class))).thenReturn(0);

        // When
        PostResponse postResponse = postService.convertToResponse(post);

        // Then
        assertEquals(1L, postResponse.getId());
        assertEquals(2, postResponse.getTags().size());
        assertEquals(0, postResponse.getLikes());
    }

    @Test
    void deleteOnePostByIdWithValidIdAndAuthor() {
        String authorUsername = "testUser";
        Long postId = 1L;
        User author = new User();
        author.setUsername(authorUsername);
        Post post = new Post("text", author, "media_url");
        post.setId(postId);
        PostSearch postSearch = new PostSearch(postId.intValue(), "text", authorUsername);
        postRepository.save(post);
        postSearchRepository.save(postSearch);
        when(postRepository.findById(any(Long.class))).thenReturn(Optional.of(post));
        when(postSearchRepository.findById(any(Integer.class))).thenReturn(Optional.of(postSearch));

        postService.deleteOnePostById(authorUsername, postId);

        verify(postRepository, times(1)).delete(any(Post.class));
        verify(postSearchRepository, times(1)).delete(any(PostSearch.class));
    }
}