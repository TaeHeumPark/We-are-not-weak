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
public class Counsel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "counsel_id", updatable = false )
    private Integer id;

    @Column(name = "counsel_start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "counsel_end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "counsel_count", nullable = false)
    private Integer counselCount;

    @Column(name = "counsel_title", nullable = false)
    private String title;

    @Column(name = "counsel_state", nullable = false)
    private Integer state;

    @Column(name = "counsel_client_count", nullable = false)
    private Integer clientCount;

    @Column(name = "counsel_price", nullable = false)
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "counselor_id", nullable = false)
    private Counselor counselorId;

    @Column(name = "counsel_introduction", nullable = false)
    private String introduction;

    @Column(name = "counsel_week_count", nullable = false )
    private Integer weekCount;

    @Column(name = "counsel_min_client", nullable = false )
    private Integer minClient;

    @Column(name = "counsel_max_client", nullable = false )
    private Integer maxClient;

    @Builder
    public Counsel(Integer counselId, LocalDateTime startDate,LocalDateTime endDate, Integer counselCount, String title, Integer state, Integer clientCount, Integer price,Counselor counselorId, String introduction, Integer weekCount
    , Integer minClient, Integer maxClient) {
        this.id = counselId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.counselCount = counselCount;
        this.title = title;
        this.state = state;
        this.clientCount = clientCount;
        this.price = price;
        this.counselorId = counselorId;
        this.introduction = introduction;
        this.weekCount = weekCount;
        this.minClient = minClient;
        this.maxClient = maxClient;
    }
    public void updateState(Integer state){
        this.state = state;
    }

}
