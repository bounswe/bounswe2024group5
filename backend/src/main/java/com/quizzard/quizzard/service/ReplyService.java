package com.quizzard.quizzard.service;

import com.quizzard.quizzard.exception.InvalidRequestException;
import com.quizzard.quizzard.exception.ResourceNotFoundException;
import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.Reply;
import com.quizzard.quizzard.model.User;
import com.quizzard.quizzard.model.request.ReplyRequest;
import com.quizzard.quizzard.model.response.ReplyResponse;
import com.quizzard.quizzard.repository.PostRepository;
import com.quizzard.quizzard.repository.ReplyRepository;
import com.quizzard.quizzard.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReplyService {


    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private JwtUtils jwtUtils;

    private List<ReplyResponse> mapToReplyResponse(List<Reply> replies){
        return replies.stream().map(ReplyResponse::new).toList();
    }

    public ReplyResponse createReply(String jwtToken, Long postId, ReplyRequest replyRequest) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        Post post = postRepository.findById(postId).orElseThrow( () -> new ResourceNotFoundException("Post not found"));
        if(replyRequest.getContent() == null)
            throw new InvalidRequestException("content is required");
        if(replyRequest.getContent().length() == 0)
            throw new InvalidRequestException("Reply content cannot be empty");
        Reply reply = new Reply();
        reply.setContent(replyRequest.getContent());
        reply.setPost(post);
        reply.setUser(user);
        replyRepository.save(reply);
        return new ReplyResponse(reply);
    }

    public List<ReplyResponse> getRepliesByPostId(Long postId) {
        return mapToReplyResponse(replyRepository.findByPostId(postId));
    }

    public List<ReplyResponse> getRepliesByUserId(Optional<Long> userId) {
        if(userId.isEmpty())
            return mapToReplyResponse(replyRepository.findAll());
        else
            return mapToReplyResponse(replyRepository.findByUserId(userId.get()));
    }

    public ReplyResponse getReplyById(Long replyId) {
        return new ReplyResponse(replyRepository.findById(replyId).orElseThrow( () -> new ResourceNotFoundException("Reply not found")));
    }

    public void deleteReplyById(String jwtToken, Long replyId) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        Reply reply = replyRepository.findById(replyId).orElseThrow( () -> new ResourceNotFoundException("Reply not found"));
        if(!reply.getUser().getId().equals(user.getId()))
            throw new InvalidRequestException("You are not authorized to delete this reply");
        replyRepository.delete(reply);
    }

    public ReplyResponse updateReply(String jwtToken, Long replyId, ReplyRequest replyRequest) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken.substring(7));
        User user = userService.getOneUserByUsername(username);
        Reply reply = replyRepository.findById(replyId).orElseThrow( () -> new ResourceNotFoundException("Reply not found"));
        if(!reply.getUser().getId().equals(user.getId()))
            throw new InvalidRequestException("You are not authorized to update this reply");
        if(replyRequest.getContent() == null)
            throw new InvalidRequestException("content is required");
        if(replyRequest.getContent().length() == 0)
            throw new InvalidRequestException("Reply content cannot be empty");
        reply.setContent(replyRequest.getContent());
        replyRepository.save(reply);
        return new ReplyResponse(reply);
    }
}
