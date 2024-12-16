package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.PostTag;
import com.quizzard.quizzard.model.response.PostResponse;
import com.quizzard.quizzard.repository.PostRepository;
import com.quizzard.quizzard.repository.PostTagRepository;
import com.quizzard.quizzard.repository.UpvoteRepository;
import com.quizzard.quizzard.repository.ReplyRepository;

import java.util.List;

@Service
public class FeedService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostTagRepository postTagRepository;

    @Autowired
    private UpvoteRepository upvoteRepository;

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private UserService userService;

    private PostResponse mapToPostResponse(Post post){
        int noUpvote = (int) upvoteRepository.countByPostId(post.getId());
        int NoReplies = (int) replyRepository.countByPostId(post.getId());
        List<PostTag> postTags = postTagRepository.findByPostId(post.getId());
        return new PostResponse(post, postTags, noUpvote, NoReplies);
    }

    private List<PostResponse> mapToPostResponse(Page<Post> posts){
        return posts.map(this::mapToPostResponse).toList();
    }

    public List<PostResponse> getFeed(String username, Pageable pageable) {
        User user = userService.getOneUserByUsername(username);
        //return mapToPostResponse(postRepository.findAllByOrderByCreatedAtDesc(pageable));
        return mapToPostResponse((postRepository.findRelevantAndOtherPosts(user.getId(), pageable)));
    }

}
