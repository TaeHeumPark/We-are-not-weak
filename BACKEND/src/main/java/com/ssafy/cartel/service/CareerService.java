package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.Article;
import com.ssafy.cartel.domain.Career;
import com.ssafy.cartel.domain.Counselor;
import com.ssafy.cartel.domain.User;
import com.ssafy.cartel.dto.ArticleDto;
import com.ssafy.cartel.dto.CareerDto;
import com.ssafy.cartel.dto.UserDto;
import com.ssafy.cartel.repository.CareerRepository;
import com.ssafy.cartel.repository.CounselorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CareerService {

    private final CounselorRepository counselorRepository;
    private final CareerRepository careerRepository;


    public Career save(CareerDto career){
        Counselor counselor = counselorRepository.findById(career.getCounselorId())
                .orElseThrow(()-> new IllegalArgumentException("not found counselorId"));;

        return careerRepository.save(Career.builder()
                .content(career.getContent())
                .counselor(counselor)
                .state(0)
                .build());
    }

    public List<String> findByCounselor(Counselor counselor) {
        List<Career> careerss = careerRepository.findAllByCounselor(counselor);
        List<String> careers = new LinkedList<>();
        for(Career career: careerss){
            careers.add(career.getContent());
        }
        return careers;
    }
}
