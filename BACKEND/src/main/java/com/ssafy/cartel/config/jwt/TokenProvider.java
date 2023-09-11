package com.ssafy.cartel.config.jwt;


import com.ssafy.cartel.domain.Day;
import com.ssafy.cartel.domain.User;


import com.ssafy.cartel.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;
import java.util.Date;
import java.util.Set;

// 유효성 검사, 토큰에서 필요한 정보 가져오기
@RequiredArgsConstructor
@Service
public class TokenProvider { //토큰 생성

    private final JwtProperties jwtProperties;
    private final UserService userService;

    public String generateToken(User user, Duration expired){
        Date now = new Date();

        //최초 로그인으로 refreshtoken 필요
        if(user.getRefreshToken()==null) {
            String newrefresh = makeRefreshToken(new Date(now.getTime() + Duration.ofDays(7).toMillis()), user);
            userService.tokenUpdate(user,newrefresh);
        }

        return makeAccessToken(new Date(now.getTime() + expired.toMillis()), user);
    }

    //jwt 토큰 생성하기
    private String makeAccessToken(Date expired, User user) {

        Date now = new Date(); //지금
        String type = "user";
        if(user.getType()==1)
            type = "client";
        else if(user.getType()==2)
            type = "counselor";
        else if(user.getType()==3)
            type = "admin";

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(now)
                .setExpiration(expired) //만료 시간
                .setSubject(user.getEmail())
                .claim("type",type)
                .claim("id", user.getId())
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
                .compact(); //jwt
    }
    //refresh토큰 만들기
    public String makeRefreshToken(Date expired, User user){
        Date now = new Date();

        return  Jwts.builder()
                .setSubject(user.getEmail())
                .setExpiration(expired)
                .setIssuedAt(now)
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
                .compact();
    }

    //유효성 검증
    public boolean validToken(String token){ //검증
        try{
            Jwts.parser()
                    .setSigningKey(jwtProperties.getSecretKey()) // 비밀값으로 복호화
                    .parseClaimsJws(token);
            return true;
        }catch (Exception e){// 복호화 했는데 유효하지 않으면 에러
            return false;
        }
    }

    //토큰 기반으로 인증 정보 가져오기
    public Authentication getAuthentication(String token){
        Claims claims = getClaims(token);// 클레임, 내용과 관련된 정보

        //사용자 권한을 나타내기
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(claims.get("type", String.class)));

        //사용자 정보 생성 - security의 username~~~ 객체를 생성하여 사용자의 인증 정보를 나타낸다.
        //유저 객체에 유저이름(이메일), 비밀번호, 권한과 같은 인증 정보가 포함된다.
        return new UsernamePasswordAuthenticationToken(new org.springframework.security.core.userdetails.User(
                claims.getSubject(),"",authorities),token,authorities);
    }

    //토큰 기반으로 유저 ID가져오기
    public Integer getUserId(String token){
        Claims claims = getClaims(token);
        return claims.get("id", Integer.class);
    }

    private Claims getClaims(String token) {
        return Jwts.parser()// 토큰 기반 클래임 조회
                .setSigningKey(jwtProperties.getSecretKey())
                .parseClaimsJws(token)
                .getBody();
    }
}
