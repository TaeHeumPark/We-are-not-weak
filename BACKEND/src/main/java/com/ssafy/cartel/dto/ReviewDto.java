package com.ssafy.cartel.dto;

import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
public class ReviewDto {

    private String nickname;
    private String content;
    private Integer curriculumId;
}
