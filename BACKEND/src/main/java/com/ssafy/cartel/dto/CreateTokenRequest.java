package com.ssafy.cartel.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
public class CreateTokenRequest {
    private String refreshToken;
}
