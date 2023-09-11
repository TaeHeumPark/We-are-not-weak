package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.Counselor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드값을 파라미터로 받는 생성자
@Getter
@Builder
public class CounselDto {

    private Integer counselId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer counselCount;
    private String title;
    private Integer state;
    private Integer clientCount;
    private Integer price;
    private Integer counselorId;
    private String introduction;
    private Integer weekCount;
    private Integer minClient;
    private Integer maxClient;


    public Counsel toEntity(Counselor counselor){
        return Counsel.builder()
                .counselId(counselId)
                .startDate(startDate)
                .endDate(endDate)
                .title(title)
                .introduction(introduction)
                .weekCount(weekCount)
                .price(price)
                .clientCount(clientCount)
                .state(state)
                .counselorId(counselor)
                .counselCount(counselCount)
                .minClient(minClient)
                .maxClient(maxClient)
                .build();
    }
}
