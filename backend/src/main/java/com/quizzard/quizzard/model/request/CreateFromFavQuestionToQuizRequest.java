package com.quizzard.quizzard.model.request;


import lombok.Data;

@Data
public class CreateFromFavQuestionToQuizRequest {


    private Integer count;
    private String title;

    @Override
    public String toString() {
        return "CreateFromFavQuestionToQuizRequest{" +
                "count=" + count +
                ", title='" + title + '\'' +
                '}';
    }

}
