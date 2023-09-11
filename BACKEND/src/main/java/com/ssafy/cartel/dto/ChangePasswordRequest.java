package com.ssafy.cartel.dto;
import lombok.Data;
import lombok.Getter;

@Data
public class ChangePasswordRequest {
    private Integer id;
    private String password;
}
