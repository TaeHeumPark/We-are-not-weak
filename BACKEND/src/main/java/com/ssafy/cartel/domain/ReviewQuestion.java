package com.ssafy.cartel.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_question_id", updatable = false)
    private Integer id;

    @Column(name = "review_question",nullable = false)
    private String question;

    @Column(name = "review_question_type", nullable = false)
    private Integer type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name = "review_id", nullable = false)
    private Review review;

    @Builder
    public ReviewQuestion(String question, Integer type, Review reviewId) {
        this.question = question;
        this.type = type;
        this.review = review;
    }
}
