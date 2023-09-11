package com.ssafy.cartel.dto;


import com.ssafy.cartel.domain.Comment;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
public class CommentResponse {

    private final Integer id;
    private final String content;
    private final Integer userId;
    private final String nickname;
    private final LocalDateTime date;



    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.userId = comment.getUser().getId();
        this.nickname = comment.getUser().getNickname();
        this.date = comment.getDate();
    }
}

