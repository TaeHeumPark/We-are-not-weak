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
public class Review { //소감문

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id", updatable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client clientId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curriculum_id")
    private Curriculum curriculumId;

    @Column(name = "review_state", nullable = false)
    private Integer state;

    @Column(name = "review_date", nullable = false)
    private LocalDateTime date;

    @Builder
    public Review(Counsel counselId, Client clientId, Curriculum curriculumId, Integer state, LocalDateTime date) {

        this.clientId = clientId;
        this.curriculumId = curriculumId;
        this.state = state;
        this.date = date;
    }
}
