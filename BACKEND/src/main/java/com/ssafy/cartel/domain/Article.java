package com.ssafy.cartel.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.naming.Name;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity //Entity로 지정
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자 생성
public class Article {
    
    @Id //id필드가 기본키
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키를 자동으로 1씩 증가
    @Column(name = "post_id", updatable = false)
    private Integer id;

    @Column(name = "post_title", nullable = false)
    private String title;

    @Column(name = "post_content", nullable = false)
    private String content;

    @Column(name = "post_level", nullable = false)
    private Integer level;

    @Column(name = "post_views", nullable = false)
    private Integer views;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name ="post_type", nullable = false)
    private Integer type;

    @Column(name ="post_date", nullable = false)
    private LocalDateTime date;

    @Column(name = "post_status", nullable = false)
    private Integer status;

//    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
//    private List<Comment> comments = new ArrayList<>();

    @Builder
    public Article(String title, String content, Integer level, Integer views, User user, Integer type, LocalDateTime date, Integer status) {

        this.title = title;
        this.content = content;
        this.level = level;
        this.views = views;
        this.user = user;
        this.type = type;
        this.date = date;
        this.status = status;
    }

    public void update(String title, String content){
        this.title =title;
        this.content = content;
    }
    public void view(Integer views){
        this.views = views+1;
    }

//    public void comment(List<Comment> comments){
//        this.comments = comments;
//    }
}
