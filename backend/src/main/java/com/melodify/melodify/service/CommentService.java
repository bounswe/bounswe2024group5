package com.melodify.melodify.service;

import com.melodify.melodify.model.Comment;
import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.User;
import com.melodify.melodify.model.request.CommentCreateRequest;
import com.melodify.melodify.model.response.CommentResponse;
import com.melodify.melodify.repository.CommentRepository;
import com.melodify.melodify.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    public CommentResponse getCommentById(Long id) {
        return new CommentResponse(commentRepository.findById(id).orElse(null));
    }

    public void deleteComment(String authorUsername ,Long id) {
        User author = userService.getOneUserByUsername(authorUsername);
        if (!commentRepository.existsById(id)) {
            throw new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Comment not found");
        }
        else{
            Optional<Comment> comment = commentRepository.findById(id);
            if (!comment.get().getAuthor().equals(author))
                throw new ResponseStatusException(org.springframework.http.HttpStatus.FORBIDDEN, "You are not the author of this comment");
            else
                commentRepository.deleteById(id);
        }
    }

    public CommentResponse addComment(long postID, String text, String authorUsername) {
        User author = userService.getOneUserByUsername(authorUsername);
        Post post = postRepository.findById(postID).orElse(null);
        Comment comment = new Comment(text, author, post);
        commentRepository.save(comment);
        return new CommentResponse(comment);
    }

    public List<CommentResponse> getCommentsByPostId(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        return commentRepository.findByPost(post).stream().map(CommentResponse::new).collect(Collectors.toList());
    }

}
