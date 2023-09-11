package com.ssafy.cartel.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private String email;
    private String password;
    private String nickname;
    private String name;
    private String phone;
    private String point;
    private String profileUrl;
    private Integer state;
    private Integer type;
    private String refreshToken;
}
