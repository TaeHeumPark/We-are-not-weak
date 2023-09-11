package com.ssafy.cartel.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateEvaluationRequest {
    private String content;
    private float rate;

}
