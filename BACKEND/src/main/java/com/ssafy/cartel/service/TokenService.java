package com.ssafy.cartel.service;

import com.ssafy.cartel.config.jwt.TokenProvider;
import com.ssafy.cartel.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Calendar;
import java.util.Date;

@RequiredArgsConstructor
@Service
public class TokenService { //refresh토큰 확인해서 access토큰 발급 받는거
    private final TokenProvider tokenProvider;
    private final UserService userService;

    //refresh token을 전달받아서 새로운 엑세스 토큰 생성
    public HttpHeaders createNewAccessToken(String token){

        //토큰 유효성 검사
        if(!tokenProvider.validToken(token)){// refresh토큰 확인하기!!
            throw new IllegalArgumentException("unexpected refreshtoken"); //에러로 로그아웃 처리
        }

        //유효한 리프레시 토큰!
        //사용자 찾기
        User user = userService.findbyRefreshToken(token);
        //새로운 access 토큰 만들기
        String newToken = tokenProvider.generateToken(user, Duration.ofHours(2));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer"+ newToken);
        headers.add("userId",user.getId().toString());
        return headers;

    }
}
