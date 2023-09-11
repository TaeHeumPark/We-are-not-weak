package com.ssafy.cartel.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_answer_id",updatable = false)
    private Integer id;

    @Column(name = "review_answer", nullable = false)
    private String answer;

    @Column(name = "review_date", nullable = false)
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_question_id", nullable = false)
    private ReviewQuestion reviewQuestion;


    @Builder
    public ReviewAnswer(String answer, LocalDateTime date, ReviewQuestion reviewQuestion) {
        this.answer = answer;
        this.date = date;
        this.reviewQuestion = reviewQuestion;
    }
}
