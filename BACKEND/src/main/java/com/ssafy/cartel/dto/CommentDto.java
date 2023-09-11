package com.ssafy.cartel.dto;


import com.ssafy.cartel.domain.Article;
import com.ssafy.cartel.domain.Comment;
import com.ssafy.cartel.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CommentDto {

    private String content;
    private Integer userId;
    private LocalDateTime date;
    private Integer state;
    private Integer postId;

    public Comment toEntity(User user, Article article){

        return Comment.builder()
                .content(content)
                .user(user)
                .date(LocalDateTime.now())
                .state(0)
                .article(article)
                .build();
    }

}
