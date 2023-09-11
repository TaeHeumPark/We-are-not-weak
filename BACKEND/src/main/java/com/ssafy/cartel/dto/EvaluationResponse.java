package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Client;
import com.ssafy.cartel.domain.Counselor;
import com.ssafy.cartel.domain.Evaluation;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor //모든 필드값을 파라미터로 받는 생성자
@Getter
public class EvaluationResponse {
    private final float rate;
    private final String content;
    private final LocalDateTime date;
    private final Integer state;
    private final Counselor counselor;
    private final Client client;


    public EvaluationResponse(Evaluation evaluation) {
        this.rate = evaluation.getRate();
        this.content = evaluation.getContent();
        this.date = evaluation.getDate();
        this.state = evaluation.getState();
        this.counselor = evaluation.getCounselorId();
        this.client = evaluation.getClientId();
    }
}
