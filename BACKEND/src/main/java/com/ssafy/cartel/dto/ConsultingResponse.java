package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Consulting;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ConsultingResponse {

    private String nickname;
    private String content;
    private LocalDateTime date;

    public ConsultingResponse(Consulting consulting) {
        this.nickname = consulting.getClientId().getUserId().getNickname();
        this.content = consulting.getConsulting();
        this.date = consulting.getDate();
    }
}
