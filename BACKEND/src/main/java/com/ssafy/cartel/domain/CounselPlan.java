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
public class CounselPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "counsel_plan_id", updatable = false)
    private Integer id;

    @Column(name = "counsel_start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "counsel_end_time", nullable = false)
    private LocalDateTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "counsel_id")
    private Counsel counselId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "day_id")
    private Day dayId;

    @Builder
    public CounselPlan(Integer counselPlanId, LocalDateTime startTime, LocalDateTime endTime, Counsel counselId, Day dayId) {
        this.id = counselPlanId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.counselId = counselId;
        this.dayId = dayId;
    }
}
