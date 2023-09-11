package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.*;
import com.ssafy.cartel.dto.ConsultingDto;
import com.ssafy.cartel.dto.ConsultingReq;
import com.ssafy.cartel.dto.ConsultingResDto;
import com.ssafy.cartel.dto.ReviewDto;
import com.ssafy.cartel.repository.ClientRepository;
import com.ssafy.cartel.repository.ConsultingRepository;
import com.ssafy.cartel.repository.CurriculumRepository;
import com.ssafy.cartel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//@Transactional(readOnly = true)
@RequiredArgsConstructor //final , @notnull 붙은 필드의 생성자 추가
@Service //빈으로 등록
@Slf4j // 로그
public class ConsultingService {
    private final ConsultingRepository consultingRepository;
    private final ClientRepository clientRepository;
    private final CurriculumRepository curriculumRepository;
    private final UserRepository userRepository;

    public Consulting registConsulting(ConsultingReq req, Curriculum curriculum) {
        User user = userRepository.findByNickname(req.getNickname())
                .orElseThrow(() -> new IllegalArgumentException("unexpexted nickneme"));

        Client client = clientRepository.findByUserId(user)
                .orElseThrow(() -> new IllegalArgumentException("unexpexted user"));

        Consulting consulting = consultingRepository.save(Consulting.builder()
                .consulting(req.getContent())
                .date(LocalDateTime.now())
                .state(0)
                .curriculumId(curriculum)
                .clientId(client)
                .build());
        return consulting;
    }
    public void registReview(ReviewDto reviewDto) {
        Curriculum curriculum = curriculumRepository.findById(reviewDto.getCurriculumId())
                .orElseThrow(() -> new IllegalArgumentException("not found curriculum" ));
        User user = userRepository.findByNickname(reviewDto.getNickname())
                .orElseThrow(()-> new IllegalArgumentException("unexpexted nickneme"));
        Client client =clientRepository.findByUserId(user)
                .orElseThrow(()-> new IllegalArgumentException("unexpexted user"));

        consultingRepository.save(Consulting.builder()
                .consulting(reviewDto.getContent())
                .date(LocalDateTime.now())
                .state(1)
                .curriculumId(curriculum)
                .clientId(client)
                .build());
    }


//    public List<ConsultingResDto> getConsulting(Integer clientId) {
//        Consulting consulting = consultingRepository.findById(clientId)
//                .orElseThrow(() -> new IllegalArgumentException("not found : " + clientId));
//
//        List<ConsultingResDto> consultingResDto = consultingRepository.findByClientId(consulting);
//
//        return consultingResDto;
//    }


    public List<Consulting> findByStateAndCurriculum(Curriculum curriculum) {
        List<Consulting> consultings = consultingRepository.findAllByStateAndCurriculumId(0,curriculum);
        return consultings;
    }

    public List<Consulting> reviewfindByStateAndCurriculum(Curriculum curriculum) {
        List<Consulting> consultings = consultingRepository.findAllByStateAndCurriculumId(1,curriculum);
        return consultings;
    }



//    @Transactional
//    public Consulting update(Integer id, ConsultingDto consultingDto){
//        Consulting consulting = consultingRepository.findById(id)
//                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));
//
//        consulting.update(consultingDto.getConsulting(),consultingDto.getDate(),consultingDto.getState());
//        return consulting;
//    }

//    @Transactional
//    public void delete(Integer id){
//        consultingRepository.deleteById(id);

//    }


}