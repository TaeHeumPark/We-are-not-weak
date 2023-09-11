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
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "evaluation_id", updatable = false)
    private Integer id;

    @Column(name = "evaluation_rate", nullable = false)
    private float rate;

    @Column(name = "evaluation_content", nullable = false)
    private String content;

    @Column(name = "evaluation_date", nullable = false)
    private LocalDateTime date;

    @Column(name = "evaluation_state", nullable = false)
    private Integer state;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client clientId;

    @ManyToOne
    @JoinColumn(name = "counselor_id")
    private Counselor counselorId;


    @Builder
    public Evaluation(float rate, String content, LocalDateTime date, Integer state, Client clientId, Counselor counselorId) {
        this.rate = rate;
        this.content = content;
        this.date = date;
        this.state = state;
        this.clientId = clientId;
        this.counselorId = counselorId;
    }

    public void update(String content, float rate) {
        this.content = content;
        this.rate = rate;
        this.date = LocalDateTime.now();
    }
}
