package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.CounselPlan;
import com.ssafy.cartel.domain.Day;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드값을 파라미터로 받는 생성자
@Getter
@Builder
public class CounselPlanDto {

    private Integer counselPlanId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer counselId;
    private Integer dayId;

    public CounselPlan toEntity(Counsel counsel, Day day){
        return CounselPlan.builder()
                .counselPlanId(counselPlanId)
                .startTime(startTime)
                .endTime(endTime)
                .counselId(counsel)
                .dayId(day)
                .build();
    }
}
