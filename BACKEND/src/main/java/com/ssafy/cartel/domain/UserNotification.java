package com.ssafy.cartel.domain;

import jakarta.persistence.*;
import lombok.*;

import java.rmi.UnmarshalException;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_notification_id", updatable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client cliendId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notification_id")
    private Notification notificationId;

    @Builder
    public UserNotification(Client cliendId, Notification notificationId) {
        this.cliendId = cliendId;
        this.notificationId = notificationId;
    }
}
