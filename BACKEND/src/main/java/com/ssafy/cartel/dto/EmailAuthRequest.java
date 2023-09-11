package com.ssafy.cartel.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class EmailAuthRequest {

    @NotBlank(message = "인증코드를 입력해주세요.")
    private String authCode;

    @Email
    private String email;
}