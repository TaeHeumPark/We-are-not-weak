package com.ssafy.cartel.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CounselorDto {

    private Integer id;
    private String registImg;
    private String licenseImg;
    private String school;
    private String company;
    private Integer rateSum;
    private Integer userId;
    private String introduction;


}
