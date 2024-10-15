package com.quizzard.quizzard.service;

import com.quizzard.quizzard.model.Post;
import com.quizzard.quizzard.model.Tag;
import com.quizzard.quizzard.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> getTagsByPost(Post post) {
        return tagRepository.findByPost(post);
    }

    public List<Post> getPostsByTag(String tag) {
        return tagRepository.findByTag(tag).stream().map(Tag::getPost).collect(Collectors.toList());
    }

    public void createOneTag(String tag, Post post) {
        Tag newTag = new Tag(tag, post);
        tagRepository.save(newTag);
    }

}
