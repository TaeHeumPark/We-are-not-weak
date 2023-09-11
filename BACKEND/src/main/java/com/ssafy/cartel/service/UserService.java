package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.User;
import com.ssafy.cartel.dto.*;
import com.ssafy.cartel.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RedisUtil redisUtil;
    private final JavaMailSender mailSender;
    private static final String CHARACTERS = "1234567890abcdefghijklmnopqrstuvwxyz";

    public User save(UserDto userDto, Integer type){
        return userRepository.save(User.builder()
                .email(userDto.getEmail())
                .nickname(userDto.getNickname())
                .password(bCryptPasswordEncoder.encode(userDto.getPassword())) //암호화
                .name(userDto.getName())
                .point(0)
                .state(0)
                .type(type)
                .build());
    }


    //refreshtoken user 찾기
    public User findbyRefreshToken(String Token){
        return userRepository.findByRefreshToken(Token)
                .orElseThrow(()-> new IllegalArgumentException("unexpexted token"));
    }

    //id로 user 찾기
    public User findbyId(Integer id){
        return userRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("unexpexted id"));
    }

    // 인증 메일 전송 로직
    // 6자리 코드 랜덤 생성 후 전송
    @Transactional
    public void authMail(EmailAuthRequest request) {
        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888)+111111);

        sendAuthEmail(request.getEmail(), authKey);
    }

    // 이메일 내용 작성 부분
    private void sendAuthEmail(String email, String authKey) {
        String subject = "[우린 약하지 않아] 회원가입 인증번호";
        String text = "<html><body>" + "<p>안녕하세요. </p>"+
                "<p>[우린 약하지 않아] 회원 가입을 위한 인증번호는 <strong>"+ authKey + "</strong>입니다.<p/>"
                + "<p><img src = 'cid:image'></p>" + "</body></html>";


        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(text, true);

            // 이미지를 메시지에 첨부
            ClassPathResource imageResource = new ClassPathResource("img/logo.png"); // 이미지 파일 경로
            helper.addInline("image", imageResource);

            mailSender.send(mimeMessage);



        } catch (MessagingException e) {
            e.printStackTrace();
        }

        // 유효시간 (5분간 유효)
        redisUtil.setDataExpire(authKey, email, 60 * 50L);
    }


    // 이메일 인증 코드 검증
    public boolean validAuthMailCode(EmailAuthRequest emailAuthRequestDto) throws Exception {
        String emailFindByCode = redisUtil.getData(emailAuthRequestDto.getAuthCode());
        if(emailFindByCode == null){
            throw new Exception("인증번호가 일치하지 않거나 만료되었습니다.");
        }

        return emailFindByCode.equals(emailAuthRequestDto.getEmail());
    }

    @Transactional
    public void tokenUpdate(User user,String token){
        user.refresh(token);

    }

    @Transactional
    public User update(Integer id, UpdateUserRequest request) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("not found"+ id));

        user.update(request);
        return user;
    }

    @Transactional
    public boolean checkUseremailDuplication(String email){
        boolean emailDuplication = userRepository.existsByEmail(email);
        return emailDuplication;

    }

    @Transactional
    public boolean checkUsernicknameDuplication(String nickname){
        boolean nicknameDuplication = userRepository.existsByNickname(nickname);
        return nicknameDuplication;

    }

    @Transactional
    public void tempPassword(String email){
        SecureRandom random = new SecureRandom();
        StringBuilder password =new StringBuilder(8);

        for(int i=0;i<8;i++){
            int index = random.nextInt(CHARACTERS.length());
            password.append(CHARACTERS.charAt(index));
        }
        User user = userRepository.findByEmail(email).get();
        //비밀번호 암호화 해서 저장
        user.updatePwd(bCryptPasswordEncoder.encode(password.toString()));
        //이메일로 임시 비밀번호 보내주기
        sendPwd(email,password.toString());

    }
    @Transactional
    public void changePassword(Integer id, String password){
        User user = userRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("unexpexted id"));
        user.updatePwd(bCryptPasswordEncoder.encode(password));
    }

    private void sendPwd(String email,String password) {
        String subject = "[우린 약하지 않아] 임시 비밀번호";
        String text = "<html><body>"+"<p>안녕하세요.</p>"+
                "<p>[우린 약하지 않아] 임시 비밀번호는 <strong>"+ password + "</strong>입니다.<p/>" +
                "<p>임시 비밀번호로 로그인 후 비밀번호 변경해주시길 바랍니다.</p>"
                + "<p><img src = 'cid:image'></p>" + "</body></html>";

        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(text, true);

            // 이미지를 메시지에 첨부
            ClassPathResource imageResource = new ClassPathResource("img/logo.png"); // 이미지 파일 경로
            helper.addInline("image", imageResource);
            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


}
