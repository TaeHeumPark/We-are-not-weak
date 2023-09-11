package com.ssafy.cartel.controller;

import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.dto.CounselClient;
import com.ssafy.cartel.dto.CounselDto;
import com.ssafy.cartel.dto.CounselResDto;
import com.ssafy.cartel.service.CounselService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/counsel")
public class CounselController {
    private final CounselService counselService;

    //상담 목록 조회
    @GetMapping
    public ResponseEntity<List<CounselResDto>> findAllCounsels(){
        List<CounselResDto> counselList = counselService.findAll();

        return ResponseEntity.ok()
                .body(counselList);
    }

    // 조회
    @GetMapping("/{counsel_id}")
    public ResponseEntity<?> findCounsel(@PathVariable Integer counsel_id) {
        CounselResDto counselResDto = counselService.findById(counsel_id);
        return ResponseEntity.ok().body(counselResDto);
    }

    @GetMapping("/client/{counsel_id}")//상담 번호별 내담자의 유저번호 가져오기
    public ResponseEntity<List<CounselClient>> findAllClient(@PathVariable Integer counsel_id){
        Counsel counsel = counselService.findByCounselId(counsel_id);
        List<CounselClient> counselClients = counselService.findByCounsel(counsel)
                .stream()
                .map(CounselClient::new)
                .toList();

        return ResponseEntity.ok().body(counselClients);
    }

    // 등록
    @PostMapping
    public ResponseEntity<?> registCounsel(@RequestBody CounselDto counselDto){
        counselService.save(counselDto);
        return ResponseEntity.ok().build();
    }



    // 수정
    @PutMapping("/{counsel_id}")
    public ResponseEntity<?> updateCounsel(@PathVariable Integer counsel_id, @RequestBody CounselDto counselDto) {
        counselService.update(counsel_id, counselDto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @DeleteMapping("/{counsel_id}")
    public ResponseEntity<?> deleteCounsel(@PathVariable Integer counsel_id){
        counselService.delete(counsel_id);
        return ResponseEntity.ok().build();
    }
}
