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
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id",updatable = false)
    private Integer id;

    @Column(name = "notification_message", nullable = false)
    private String message;

    @Column(name = "notification_send_type", nullable = false)
    private Integer type;

    @Column(name = "notification_time", nullable = false)
    private LocalDateTime time;

    @Builder
    public Notification(String message, Integer type, LocalDateTime time) {
        this.message = message;
        this.type = type;
        this.time = time;
    }
}
