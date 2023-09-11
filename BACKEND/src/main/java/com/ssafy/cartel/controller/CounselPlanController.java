package com.ssafy.cartel.controller;

import com.ssafy.cartel.dto.CounselPlanDto;
import com.ssafy.cartel.service.CounselPlanService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/counsel_plan")
@Slf4j
public class CounselPlanController {
    private final CounselPlanService counselPlanService;

    // 전체 조회
    @GetMapping
    public ResponseEntity<List<CounselPlanDto>> findAllCounselPlans(){
        List<CounselPlanDto> counselPlanDtoList = counselPlanService.findAll();

        return ResponseEntity.ok()
                .body(counselPlanDtoList);
    }

    // 조회
    @GetMapping("/{counsel_plan_id}")
    public ResponseEntity<?> findCounselPlan(@PathVariable Integer counsel_plan_id) {
        CounselPlanDto counselPlanDto = counselPlanService.findById(counsel_plan_id);
        return ResponseEntity.ok().body(counselPlanDto);
    }

    // 등록
    @PostMapping
    public ResponseEntity<?> registCounselPlan(@RequestBody CounselPlanDto counselPlanDto){
        counselPlanService.save(counselPlanDto);
        return ResponseEntity.ok().build();
    }

//    // 수정
//    @PutMapping("/{counsel_id}")
//    public ResponseEntity<?> updateCounsel(@PathVariable Integer counsel_id, @RequestBody CounselDto counselDto) {
//        counselService.update(counsel_id, counselDto);
//        return ResponseEntity.ok().build();
//    }

//    // 삭제
//    @PutMapping("/delete/{counsel_id}")
//    public ResponseEntity<?> updateCounselState(@PathVariable Integer counsel_id, CounselDto counselDto){
//        counselService.updateState(counsel_id, counselDto);
//        return ResponseEntity.ok().build();
//    }
}
