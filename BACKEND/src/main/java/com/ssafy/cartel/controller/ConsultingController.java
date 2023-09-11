package com.ssafy.cartel.controller;

import com.ssafy.cartel.domain.Client;
import com.ssafy.cartel.domain.Consulting;
import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.Consulting;
import com.ssafy.cartel.domain.Curriculum;
import com.ssafy.cartel.dto.*;
import com.ssafy.cartel.service.*;
import com.ssafy.cartel.repository.ConsultingRepository;
import com.ssafy.cartel.service.ConsultingService;
import com.ssafy.cartel.service.CurriculumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

//@RequestMapping("/consulting")
@RestController
@RequiredArgsConstructor
public class ConsultingController {
    private final ConsultingService consultingService;
    private final CurriculumService curriculumService;
    private final CounselService counselService;


    @PostMapping("/consulting") //상담일지 등록
    public ResponseEntity<String> registConsulting(@RequestBody ConsultingRequest requests){
        Curriculum curriculum = curriculumService.findByCurriculumId(requests.getCurriculumId());

        for(ConsultingReq req : requests.getConsultings()){
            consultingService.registConsulting(req,curriculum);
        }
        return ResponseEntity.ok("상담일지 등록 완료");
    }
    @PostMapping("/review") // 소감문 등록
    public ResponseEntity<String> registReview(@RequestBody ReviewDto review){
        consultingService.registReview(review);
        return ResponseEntity.ok("소감문 등록 완료");
    }

    @GetMapping("/consulting/{counselId}") // 상담별 상담일지
    public ResponseEntity<List<ConsultingResponse>> Consulting(@PathVariable Integer counselId){
        //curriculum 에서 counsel_id 가 저거 인거 뽑아오기
        Counsel counsel = counselService.findByCounselId(counselId);
        List<Curriculum> curriculums = curriculumService.findByCounsel(counsel);

        //curriculumid인 consulting중에서  status가 0인거
        List<Consulting> consultings = new LinkedList<>();
        for(Curriculum curriculum: curriculums){
            consultings.addAll(consultingService.findByStateAndCurriculum(curriculum));
        }

        List<ConsultingResponse> consultingResponses= consultings
                .stream()
                .map(ConsultingResponse::new)
                .toList();

        return ResponseEntity.ok().body(consultingResponses);


    }

    @GetMapping("/review/{userId}") // 소감문 조회
    public ResponseEntity<List<ConsultingResponse>> Reviewing(@PathVariable Integer userId){
        //curriculum 에서 counsel_id 가 저거 인거 뽑아오기
        Counsel counsel = counselService.findByCounselId(userId);
        List<Curriculum> curriculums = curriculumService.findByCounsel(counsel);

        //curriculumid인 consulting중에서  status가 1인거
        List<Consulting> consultings = new LinkedList<>();
        for(Curriculum curriculum: curriculums){
            consultings.addAll(consultingService.reviewfindByStateAndCurriculum(curriculum));
        }

        List<ConsultingResponse> consultingResponses= consultings
                .stream()
                .map(ConsultingResponse::new)
                .toList();

        return ResponseEntity.ok().body(consultingResponses);


    }

    // 목록 조회
//    @GetMapping()
//    public ResponseEntity<List<ConsultingResDto>> findAllConsultingList(){
//        List<ConsultingResDto> consultingList = consultingService.findAll();
//
//        return ResponseEntity.ok()
//                .body(consultingList);
//    }

    // 조회
//    @GetMapping("/{consulting_id}")
//    public ResponseEntity<?> findConsulting(@PathVariable Integer consulting_id) {
//        ConsultingResDto consultingResDto = consultingService.findById(consulting_id);
//        return ResponseEntity.ok().body(consultingResDto);
//    }

    // 등록
//    @PostMapping()
//    public ResponseEntity<?> registConsulting(@RequestBody ConsultingDto consultingDto){
//        consultingService.save(consultingDto);
//        return ResponseEntity.ok().build();
//    }




//    // 수정
//    @PutMapping()
//    public ResponseEntity<?> updateConsulting(@PathVariable Integer id, @RequestBody ConsultingDto consultingDto) {
//        consultingService.update(id, consultingDto);
//        return ResponseEntity.ok().build();
//    }

//    // 삭제
//    @DeleteMapping("/")
//    public ResponseEntity<?> deleteConsulting(@PathVariable Integer id){
//        consultingService.delete(id);
//        return ResponseEntity.ok().build();
//    }
}
