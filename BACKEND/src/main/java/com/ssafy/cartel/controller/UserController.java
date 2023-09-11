package com.ssafy.cartel.controller;

import com.ssafy.cartel.config.jwt.TokenProvider;
import com.ssafy.cartel.domain.User;
import com.ssafy.cartel.dto.*;
import com.ssafy.cartel.repository.UserRepository;
import com.ssafy.cartel.service.*;
import io.micronaut.context.annotation.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Duration;
import java.util.*;

@RequiredArgsConstructor
@RestController
@Transactional
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final ImgService imgService;
    private final CounselorService counselorService;



    @PostMapping("/signup/email")
    public ResponseEntity<String> authMail(@RequestBody EmailAuthRequest request) {
        if(userService.checkUseremailDuplication(request.getEmail()))
           return ResponseEntity.badRequest().body("이미 존재하는 이메일 입니다.");
        userService.authMail(request);
        return ResponseEntity.ok("인증 번호 전송 완료");
    }

    @PostMapping("/signup/email/auth")
    public ResponseEntity<String> validAuthMailCode(@RequestBody EmailAuthRequest request) {
        System.out.println(request);

        try {
            if (userService.validAuthMailCode(request))
                return ResponseEntity.ok("인증되었습니다.");
            else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증코드를 다시 확인해주세요.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
        if (userService.save(userDto,0) != null)//회원가입
            return ResponseEntity.ok("회원가입이 완료 되었습니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패");
    }


    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody Map<String, String> login) {
        String email = login.get("email");
        String password = login.get("password");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));
        User user = userRepository.findByEmail(email).get();


        SecurityContextHolder.getContext().setAuthentication(authentication);
        //accesstoken 생성 , 최초 로그인이면 refreshtoken도 만들어
        String accessToken = tokenProvider.generateToken(user, Duration.ofHours(2));

//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer" + accessToken);
//        headers.add("userId", user.getId().toString());
//        System.out.println(headers.get("Authorization"));

        Map<String,Object> userinfo = new HashMap<>();
        userinfo.put("userId",user.getId());
        userinfo.put("token",accessToken);
        userinfo.put("type",user.getType());

        if(user.getType()==0 || user.getType() ==1)
            userinfo.put("nickname",user.getNickname());
        else if(user.getType()==2){
            userinfo.put("counselorId", counselorService.findByUser(user).getId());
        }
        //user


        return userinfo;
    }

    @PutMapping("/userinfo/{id}")
    public ResponseEntity<UpdateUserRequest> updateUser(@PathVariable Integer id, @RequestPart UpdateUserRequest request, @RequestPart(value = "file") MultipartFile multipartFile) throws IOException {
        String profileUrl = imgService.upload(multipartFile);

        userService.update(id, request);

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 user가 존재하지 않습니다."));

        user.updateImg(profileUrl);
        return ResponseEntity.ok().body(request);
    }

    @GetMapping("/userinfo/{id}")
    public ResponseEntity<UserResponse> userInfo(@PathVariable Integer id){
        User user = userService.findbyId(id);

        return ResponseEntity.ok().body(new UserResponse(user));
    }

    @GetMapping("/signup/exists")
    public ResponseEntity<String> checknicknameDuplicate(@Parameter String nickname) {
        if (!userService.checkUsernicknameDuplication(nickname))
            return ResponseEntity.ok("사용가능한 닉네임");
        else
            return ResponseEntity.badRequest().body("중복 닉네임 입니다.");
    }

    //임시 비밀번호
    @PutMapping("/userinfo/findPassword")
    public ResponseEntity<String> tempPassword(@RequestBody FindPassword findPassword){
        if(!userService.checkUseremailDuplication(findPassword.getEmail())){
            return ResponseEntity.badRequest().body("이메일을 다시 확인해주세요.");
        }

        userService.tempPassword(findPassword.getEmail());
        return ResponseEntity.ok("임시비밀번호 전송 완료");

    }

    //비밀번호 변경
    @PutMapping("/userinfo/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request){
        userService.changePassword(request.getId(),request.getPassword());

        return ResponseEntity.ok("비밀번호 변경 완료");

    }
}



