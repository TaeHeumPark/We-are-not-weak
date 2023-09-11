package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.Consulting;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor //기본 생성자
@Getter
@Setter
@Builder
public class ConsultingResDto {

    private Integer counselId;
    private String counselTitle;
    private String consulting;
    private LocalDate consultingDate;
    private Integer userId;
    private String userNickname;
    private String userEmail;
    private Integer clientId;
    private Integer consultingId;
    private Integer consultingState;

    public ConsultingResDto(Integer counselId, String counselTitle, String consulting, LocalDate consultingDate, Integer userId, String userNickname, String userEmail, Integer clientId, Integer consultingId, Integer consultingState) {
        this.counselId = counselId;
        this.counselTitle = counselTitle;
        this.consulting = consulting;
        this.consultingDate = consultingDate;
        this.userId = userId;
        this.userNickname = userNickname;
        this.userEmail = userEmail;
        this.clientId = clientId;
        this.consultingId = consultingId;
        this.consultingState = consultingState;
    }

}
