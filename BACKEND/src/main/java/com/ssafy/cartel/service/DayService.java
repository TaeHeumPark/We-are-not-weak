package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.Day;
import com.ssafy.cartel.dto.DayDto;
import com.ssafy.cartel.repository.CounselorRepository;
import com.ssafy.cartel.repository.DayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor //final , @notnull 붙은 필드의 생성자 추가
@Service //빈으로 등록
public class DayService {
    private final DayRepository dayRepository;
    private final CounselorRepository counselorRepository;

    @Transactional
    public Day save(DayDto dayDto) {
        return dayRepository.save(dayDto.toEntity());
    }

    public List<DayDto> findAll() {
        List<Day> day = dayRepository.findAll();
        List<DayDto> dayDtoList = new ArrayList<>();

        for (int i = 0; i < day.size(); i++) {
            DayDto dayDto = DayDto.builder()
                    .day(day.get(i).getDay())
                    .build();

            dayDtoList.add(dayDto);
        }
        return dayDtoList;
    }

    public DayDto findById(Integer id) {
        Day day = dayRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found:" + id));
        DayDto dayDto = DayDto.builder()
                .day(day.getDay())
                .build();
        return dayDto;
    }

//    @Transactional
//    public Counsel update(Integer id, CounselDto counselDto){
//        Counsel counsel = counselRepository.findById(id)
//                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));
//
//        counsel.update(counselDto.getStartDate(),counselDto.getEndDate(),counselDto.getCounselCount(),counselDto.getTitle(),counselDto.getState(),counselDto.getClientCount(),counselDto.getPrice(),counselDto.getIntroduction(),counselDto.getWeekCount());
//
//        return counsel;
//    }

//    //삭제
//    @Transactional
//    public void updateState(Integer id, CounselDto counselDto){
//        Counsel counsel = counselRepository.findById(id)
//                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));
//
//        counsel.updateState(-1);
//    }


}