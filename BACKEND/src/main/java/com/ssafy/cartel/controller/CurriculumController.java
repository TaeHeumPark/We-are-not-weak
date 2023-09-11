package com.ssafy.cartel.controller;

import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.Curriculum;
import com.ssafy.cartel.dto.ArticleResponse;
import com.ssafy.cartel.dto.CounselDto;
import com.ssafy.cartel.dto.CurriculumDto;
import com.ssafy.cartel.dto.CurriculumResponse;
import com.ssafy.cartel.service.CounselService;
import com.ssafy.cartel.service.CounselorService;
import com.ssafy.cartel.service.CurriculumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/curriculum")
public class CurriculumController {
    private final CurriculumService curriculumService;
    private final CounselService counselService;

    // 전체 조회
    @GetMapping
    public ResponseEntity<List<CurriculumDto>> findAllCurriculums(){
        List<CurriculumDto> curriculumList = curriculumService.findAll();

        return ResponseEntity.ok()
                .body(curriculumList);
    }

    // 조회
    @GetMapping("/{curriculum_id}")
    public ResponseEntity<?> findCurriculum(@PathVariable Integer curriculum_id) {
        CurriculumDto curriculumDto = curriculumService.findById(curriculum_id);
        return ResponseEntity.ok().body(curriculumDto);
    }

    @GetMapping("/counsel/{counsel_id}")//상담 번호별 커리큘럼 가져오기
    public ResponseEntity<List<CurriculumResponse>> findAllCurriculum(@PathVariable Integer counsel_id){
        Counsel counsel = counselService.findByCounselId(counsel_id);
        List<CurriculumResponse> curriculumList = curriculumService.findByCounsel(counsel)
                .stream()
                .map(CurriculumResponse::new)
                .toList();

        return ResponseEntity.ok().body(curriculumList);
    }

    // 등록
    @PostMapping
    public ResponseEntity<?> registCurriculum(@RequestBody CurriculumDto curriculumDto){
        curriculumService.save(curriculumDto);
        return ResponseEntity.ok().build();
    }

    // 수정
    @PutMapping("/{curriculum_id}")
    public ResponseEntity<?> updateCurriculum(@PathVariable Integer curriculum_id, @RequestBody CurriculumDto curriculumDto) {
        curriculumService.update(curriculum_id, curriculumDto);
        return ResponseEntity.ok().build();
    }

//    // 삭제
//    @PutMapping("/delete/{counsel_id}")
//    public ResponseEntity<?> updateCounselState(@PathVariable Integer counsel_id, CounselDto counselDto){
//        counselService.updateState(counsel_id, counselDto);
//        return ResponseEntity.ok().build();
//    }
}
