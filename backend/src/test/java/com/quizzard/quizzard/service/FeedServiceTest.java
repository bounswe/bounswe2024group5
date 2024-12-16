package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.English;
import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.PostTag;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.repository.PostRepository;
import com.quizzard.quizzard.repository.PostTagRepository;
import com.quizzard.quizzard.repository.UpvoteRepository;
import com.quizzard.quizzard.repository.ReplyRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class FeedServiceTest {

    @InjectMocks
    private FeedService feedService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private PostTagRepository postTagRepository;

    @Mock
    private UpvoteRepository upvoteRepository;

    @Mock
    private ReplyRepository replyRepository;

    @Mock
    private UserService userService;

    public FeedServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetFeed() {
        // Mock data
        Post post1 = new Post();
        post1.setId(1L);
        post1.setCreatedAt(new Date());
        post1.setTitle("Post Title 1");
        post1.setContent("Post Content 1");
        User user1 = mock(User.class);  // Mock User
        when(user1.getUsername()).thenReturn("user1");
        post1.setUser(user1);  // Set the mock user in the post

        Post post2 = new Post();
        post2.setId(2L);
        post2.setCreatedAt(new Date());
        post2.setTitle("Post Title 2");
        post2.setContent("Post Content 2");
        User user2 = mock(User.class);  // Mock User
        when(user2.getUsername()).thenReturn("user2");
        post2.setUser(user2);  // Set the mock user in the post

        List<Post> postList = Arrays.asList(post1, post2);

        Page<Post> postPage = new PageImpl<>(postList);
        when(postRepository.findAllByOrderByCreatedAtDesc(any(Pageable.class))).thenReturn(postPage);

        when(upvoteRepository.countByPostId(post1.getId())).thenReturn(5L);
        when(upvoteRepository.countByPostId(post2.getId())).thenReturn(3L);

        when(replyRepository.countByPostId(post1.getId())).thenReturn(2L);
        when(replyRepository.countByPostId(post2.getId())).thenReturn(4L);

        // Mock PostTag for post1
        PostTag postTag1 = mock(PostTag.class);
        when(postTag1.getEnglish()).thenReturn(mock(English.class));
        when(postTag1.getPost()).thenReturn(post1);

        // Mock PostTag for post2
        PostTag postTag2 = mock(PostTag.class);
        when(postTag2.getEnglish()).thenReturn(mock(English.class));
        when(postTag2.getPost()).thenReturn(post2);

        // Mock postTagRepository calls
        when(postTagRepository.findByPostId(post1.getId())).thenReturn(Arrays.asList(postTag1));
        when(postTagRepository.findByPostId(post2.getId())).thenReturn(Arrays.asList(postTag2));

        // Call the method under test
        List<PostResponse> feed = feedService.getFeed(user1.getUsername(),Pageable.unpaged());

        // Assertions
        assertEquals(2, feed.size());

        PostResponse postResponse1 = feed.get(0);
        assertEquals(5, postResponse1.getNoUpvote());
        assertEquals(2, postResponse1.getNoReplies());
        assertEquals(1, postResponse1.getTags().size());

        PostResponse postResponse2 = feed.get(1);
        assertEquals(3, postResponse2.getNoUpvote());
        assertEquals(4, postResponse2.getNoReplies());
        assertEquals(1, postResponse2.getTags().size());

        // Verify interactions
        verify(postRepository, times(1)).findAllByOrderByCreatedAtDesc(any(Pageable.class));
        verify(upvoteRepository, times(2)).countByPostId(anyLong());
        verify(replyRepository, times(2)).countByPostId(anyLong());
        verify(postTagRepository, times(2)).findByPostId(anyLong());
    }


}
