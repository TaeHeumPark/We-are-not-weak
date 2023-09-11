package com.ssafy.cartel.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.scheduling.support.SimpleTriggerContext;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Consulting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consulting_id", updatable = false)
    private Integer id;

    @Column(name = "consulting", nullable = false)
    private String consulting;

    @Column(name = "consulting_date", nullable = false)
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curriculum_id")
    private Curriculum curriculumId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client clientId;

    @Column(name = "consulting_state", nullable = false)
    private Integer state;


    @Builder
    public Consulting(Integer consultingId, String consulting, LocalDateTime date, Curriculum curriculumId, Client clientId, Integer state) {
        this.id = consultingId;
        this.consulting = consulting;
        this.date = date;
        this.curriculumId = curriculumId;
        this.clientId = clientId;
        this.state = state;
    }
}