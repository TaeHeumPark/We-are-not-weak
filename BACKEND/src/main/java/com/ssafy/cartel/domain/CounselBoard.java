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
public class CounselBoard {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "counsel_board_id", updatable = false)
        private Integer id;

        @Column(name = "counsel_board_title", nullable = false)
        private String title;

        @Column(name = "counsel_board_content", nullable = false)
        private String content;

        @Column(name = "counsel_board_date", nullable = false)
        private LocalDateTime date;

        @Column(name = "counsel_board_state", nullable = false)
        private Integer state;

        @Column(name = "counsel_board_type", nullable = false)
        private Integer type;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id")
        private User userId;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "counsel_id")
        private Counsel counselId;


        @Builder
        public CounselBoard(String title, String content, LocalDateTime date, Integer state, Integer type, User userId, Counsel counselId) {
                this.title = title;
                this.content = content;
                this.date = date;
                this.state = state;
                this.type = type;
                this.userId = userId;
                this.counselId = counselId;
        }
}

