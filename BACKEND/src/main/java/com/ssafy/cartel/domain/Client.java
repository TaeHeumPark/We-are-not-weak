package com.ssafy.cartel.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id", updatable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn (name = "user_id", nullable = false)
    private User userId;

    @ManyToOne
    @JoinColumn(name = "counsel_id", nullable = false)
    private Counsel counselId;

    @Column(name = "client_attendance", nullable = false)
    private Integer attendance;

    @Column(name = "client_state")
    private Integer state;

    @Builder
    public Client(User userId, Counsel counselId, Integer attendance, Integer state) {
        this.userId = userId;
        this.counselId = counselId;
        this.attendance = attendance;
        this.state = state;
    }

    public void update(Integer attendance, Integer state) {
        this.attendance = attendance;
        this.state = state;
    }
}