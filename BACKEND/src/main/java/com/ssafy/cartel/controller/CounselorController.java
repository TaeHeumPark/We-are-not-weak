package com.ssafy.cartel.controller;

import com.ssafy.cartel.domain.Counselor;
import com.ssafy.cartel.domain.User;
import com.ssafy.cartel.dto.*;
import com.ssafy.cartel.repository.CounselorRepository;
import com.ssafy.cartel.repository.UserRepository;
import com.ssafy.cartel.service.CareerService;
import com.ssafy.cartel.service.CounselorService;
import com.ssafy.cartel.service.ImgService;
import com.ssafy.cartel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Transactional
public class CounselorController {

    private final UserService userService;
    private final CounselorService counselorService;
    private final CareerService careerService;
    private final ImgService imgService;
    private final UserRepository userRepository;
    private final CounselorRepository counselorRepository;

    @PostMapping(value = "/signup/counselor", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> signupCounselor(@RequestPart("request") CounselorSignupRequest request, @RequestPart("file1") MultipartFile file1, @RequestPart("file2") MultipartFile file2, @RequestPart("file3") MultipartFile file3) throws IOException {
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!");
        System.out.println("______________"+file1);
        System.out.println(request.getCounselorDto().getCompany());
        System.out.println(request.getUserDto().getEmail());



        User user = userService.save(request.getUserDto(),2);//상담사
        Counselor counselor = counselorService.save(request.getCounselorDto(),user);

        String profileImg = imgService.upload(file1);
        String licenseImg = imgService.upload(file2);
        String registImg = imgService.upload(file3);

        User setUser = userRepository.findById(user.getId())
                        .orElseThrow(()-> new IllegalArgumentException("not found : " + user.getId()));

        Counselor setCounselor = counselorRepository.findById(counselor.getId())
                .orElseThrow(()-> new IllegalArgumentException("not found : " + counselor.getId()));

        setUser.updateImg(profileImg);
        setCounselor.updateLicenseImg(licenseImg);
        setCounselor.updateRegistImg(registImg);

        System.out.println(request.getCareersDto());

        if(request.getCareersDto() != null) {
            for (CareerDto career : request.getCareersDto()) {
                career.setCounselorId(counselor.getId());
                careerService.save(career);
            }
        }
        return ResponseEntity.ok("상담사 회원가입 완료");
    }

    @PutMapping("/userinfo/counselor/{id}") // 상담사 id
    public ResponseEntity<String> updateCounselor(@PathVariable Integer id, @RequestPart UpdateCounselorRequest counselorRequest, @RequestPart(value = "file") MultipartFile multipartFile1, @RequestPart(value = "file") MultipartFile multipartFile2, @RequestPart(value = "file") MultipartFile multipartFile3) throws IOException {
        Counselor counselor = counselorService.findById(id);
        Integer userId = counselor.getUser().getId();
        counselorService.update(id,counselorRequest);

        String profileImg = imgService.upload(multipartFile1);
        String licenseImg = imgService.upload(multipartFile2);
        String registImg = imgService.upload(multipartFile3);

        User user = userRepository.findById(userId)
                        .orElseThrow(()->new IllegalArgumentException("not found : " + userId));

        user.updateImg(profileImg);
        counselor.updateLicenseImg(licenseImg);
        counselor.updateRegistImg(registImg);

        return ResponseEntity.ok("상담사 정보 수정 완료");
    }

    @GetMapping("/userinfo/counselor/{id}") //상담사 아이디
    public ResponseEntity<CounselorResponse> userInfo(@PathVariable Integer id){
        Counselor counselor = counselorService.findById(id);

        Integer userId = counselor.getUser().getId();
        String username = counselor.getUser().getName();
        String profile = counselor.getUser().getProfileUrl();
        //career
        List<String> careers = careerService.findByCounselor(counselor);

        CounselorResponse counselorResponse = new CounselorResponse(counselor,userId, username, profile,careers);
        return ResponseEntity.ok().body(counselorResponse);
    }

    @GetMapping("/userinfo/counselor")
    public ResponseEntity<List<CounselorResponse>> userInfoCounselor(){
        List<Counselor> counselors = counselorService.findAll();
        List<CounselorResponse> counselorList = new LinkedList<>();

        for(Counselor counselor : counselors){
            User user = counselor.getUser();
            Integer userId = user.getId();
            String username = user.getName();
            String profile = user.getProfileUrl();
            List<String> careers = careerService.findByCounselor(counselor);

            CounselorResponse counselorResponse = new CounselorResponse(counselor,userId, username, profile,careers);
            counselorList.add(counselorResponse);

        }
        return ResponseEntity.ok().body(counselorList);
    }
}
