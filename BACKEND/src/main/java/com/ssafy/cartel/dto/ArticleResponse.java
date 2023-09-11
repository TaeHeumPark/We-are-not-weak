package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Article;
import com.ssafy.cartel.domain.Comment;
import com.ssafy.cartel.domain.User;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ArticleResponse {

    private final Integer id;
    private final String title;
    private final String content;
    private final Integer level;
    private final Integer views;
    private final Integer userId;
    private final String nickname;
    private final Integer type;
    private final LocalDateTime date;
    private final Integer status;
   // private final List<Comment> comments;


    public ArticleResponse(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.level = article.getLevel();
        this.views = article.getViews();
        this.userId = article.getUser().getId();
        this.nickname = article.getUser().getNickname();
        this.type = article.getType();
        this.date = article.getDate();
        this.status = article.getStatus();
        //this.comments = article.getComments();
    }
}
