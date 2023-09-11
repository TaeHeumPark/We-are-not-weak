package com.ssafy.cartel.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Curriculum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "curriculum_id", updatable = false)
    private Integer id;

    @Column(name = "curriculum_title", nullable = false )
    private Integer title;

    @Column(name = "curriculum_content", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "counsel_id")
    private Counsel counselId;

    @Builder
    public Curriculum(Integer curriculumId, Integer title, String content, Counsel counselId) {
        this.id = curriculumId;
        this.title = title;
        this.content = content;
        this.counselId = counselId;
    }
    public void update(Integer title, String content) {
        this.title = title;
        this.content = content;
    }

}
