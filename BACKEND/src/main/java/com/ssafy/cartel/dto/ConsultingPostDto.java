package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Client;
import com.ssafy.cartel.domain.Consulting;
import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.Curriculum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드값을 파라미터로 받는 생성자
@Getter
@Builder
public class ConsultingPostDto {

    private Integer counselId;
    private List<ConsultingData> consultingData;

    // getters and setters

    public static class ConsultingData {
        private String nickname;
        private String content;
        private Integer state;
        private Long curriculumId;

        // getters and setters
    }

    public Consulting toEntity(Counsel counsel){
        return Consulting.builder()
                
                .build();

    }
}
