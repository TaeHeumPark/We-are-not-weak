package com.ssafy.cartel.dto;


import lombok.Getter;

import java.util.List;

@Getter
public class ConsultingRequest {

    private Integer curriculumId;
    private List<ConsultingReq> consultings;


}
