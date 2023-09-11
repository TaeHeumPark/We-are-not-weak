package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.Curriculum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드값을 파라미터로 받는 생성자
@Getter
@Builder
public class CurriculumDto {

    private Integer curriculumId;
    private Integer title;
    private String content;
    private Integer counselId;

    public Curriculum toEntity(Counsel counsel){
        return Curriculum.builder()
                .curriculumId(curriculumId)
                .content(content)
                .title(0)
                .counselId(counsel)
                .build();
    }


}
