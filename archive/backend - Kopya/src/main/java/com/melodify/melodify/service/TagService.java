package com.melodify.melodify.service;

import com.melodify.melodify.model.Post;
import com.melodify.melodify.model.Tag;
import com.melodify.melodify.repository.TagRepository;
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
