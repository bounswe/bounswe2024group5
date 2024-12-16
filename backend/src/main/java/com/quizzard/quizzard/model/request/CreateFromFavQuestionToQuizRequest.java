package com.quizzard.quizzard.model.request;


import lombok.Data;

@Data
public class CreateFromFavQuestionToQuizRequest {


    private Integer count;
    private String title;
    private String description;
    private String image;

    @Override
    public String toString() {
        return "CreateFromFavQuestionToQuizRequest{" +
                "count=" + count +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                '}';
    }

}
