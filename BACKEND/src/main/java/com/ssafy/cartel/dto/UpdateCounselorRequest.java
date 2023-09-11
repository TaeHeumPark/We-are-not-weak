package com.ssafy.cartel.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateCounselorRequest {

    private String registImg;
    private String licenceImg;
    private String school;
    private String company;
    private String introduction;
}
