package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.CounselPlan;
import com.ssafy.cartel.domain.Day;
import com.ssafy.cartel.dto.CounselPlanDto;
import com.ssafy.cartel.repository.CounselPlanRepository;
import com.ssafy.cartel.repository.CounselRepository;
import com.ssafy.cartel.repository.DayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor //final , @notnull 붙은 필드의 생성자 추가
@Service //빈으로 등록
public class CounselPlanService {
    private final CounselPlanRepository counselPlanRepository;
    private final CounselRepository counselRepository;
    private final DayRepository dayRepository;

    @Transactional
    public CounselPlan save(CounselPlanDto counselPlanDto){
        Counsel counsel = counselRepository.findById(counselPlanDto.getCounselId())
                .orElseThrow(() -> new IllegalArgumentException("not found:" + counselPlanDto.getCounselId()));
        Day day = dayRepository.findById(counselPlanDto.getDayId())
                .orElseThrow(() -> new IllegalArgumentException("not found:" + counselPlanDto.getDayId()));
        return counselPlanRepository.save(counselPlanDto.toEntity(counsel, day));
    }

    public List<CounselPlanDto> findAll(){
        List<CounselPlan> counselPlan = counselPlanRepository.findAll();
        List<CounselPlanDto> counselPlanDtoList = new ArrayList<>();

        for (int i = 0; i < counselPlan.size(); i++) {
            CounselPlanDto counselPlanDto = CounselPlanDto.builder()
                    .counselPlanId(counselPlan.get(i).getId())
                    .startTime(counselPlan.get(i).getStartTime())
                    .endTime(counselPlan.get(i).getEndTime())
                    .counselId(counselPlan.get(i).getCounselId().getId())
                    .dayId(counselPlan.get(i).getDayId().getId())
                    .build();

            counselPlanDtoList.add(counselPlanDto);
        }
        return counselPlanDtoList;
    }

    public CounselPlanDto findById(Integer id){
        CounselPlan counselPlan = counselPlanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found:" + id));
        CounselPlanDto counselPlanDto = CounselPlanDto.builder()
                .counselPlanId(counselPlan.getId())
                .startTime(counselPlan.getStartTime())
                .endTime(counselPlan.getEndTime())
                .counselId(counselPlan.getCounselId().getId())
                .dayId(counselPlan.getDayId().getId())
                .build();
        return counselPlanDto;
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