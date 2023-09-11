package com.ssafy.cartel.dto;

import com.ssafy.cartel.domain.User;
import lombok.Getter;

@Getter
public class UserResponse {

        private final String email;
        private final String nickname;
        private final String name;
        private final String phone;
        private final Integer point;
        private final String profileUrl;
        private final Integer state;
        private final Integer type;


    public UserResponse(User user) {
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.point = user.getPoint();
        this.profileUrl = user.getProfileUrl();
        this.state = user.getState();
        this.type = user.getType();

    }
}
