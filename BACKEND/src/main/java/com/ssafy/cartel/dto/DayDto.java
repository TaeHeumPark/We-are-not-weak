package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Day;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드값을 파라미터로 받는 생성자
@Getter
@Builder
public class DayDto {

    private Integer day;

    public Day toEntity(){
        return Day.builder()
                .day(day)
                .build();
    }

}
