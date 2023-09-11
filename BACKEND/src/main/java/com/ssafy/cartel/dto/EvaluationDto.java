package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Client;
import com.ssafy.cartel.domain.Counselor;
import com.ssafy.cartel.domain.Evaluation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor //기본 생성자
@AllArgsConstructor //모든 필드값을 파라미터로 받는 생성자
@Getter
@Builder
public class EvaluationDto {

    private float rate;
    private String content;
    private LocalDateTime date;
    private Integer state;
    private Integer clientId;
    private Integer counselorId;

    public Evaluation toEntity(Counselor counselor, Client client){
        return Evaluation.builder()
                .rate(rate)
                .content(content)
                .date(LocalDateTime.now())
                .state(0)
                .clientId(client)
                .counselorId(counselor)
                .build();
    }

}
