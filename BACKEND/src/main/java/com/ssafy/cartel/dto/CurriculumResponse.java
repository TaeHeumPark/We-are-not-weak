package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Curriculum;
import lombok.Getter;

import javax.swing.text.AbstractDocument;

@Getter
public class CurriculumResponse {
    private final Integer id;
    private final String content;

    public CurriculumResponse(Curriculum curriculum) {
        this.id = curriculum.getId();
        this.content = curriculum.getContent();
    }
}
