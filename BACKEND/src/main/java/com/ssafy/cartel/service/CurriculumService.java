package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.Curriculum;
import com.ssafy.cartel.dto.CounselDto;
import com.ssafy.cartel.dto.CurriculumDto;
import com.ssafy.cartel.repository.CounselRepository;
import com.ssafy.cartel.repository.CurriculumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

//@Transactional(readOnly = true)
@RequiredArgsConstructor //final , @notnull 붙은 필드의 생성자 추가
@Service //빈으로 등록
public class CurriculumService {
    private final CurriculumRepository curriculumRepository;
    private final CounselRepository counselRepository;




    public Curriculum findByCurriculumId(Integer id) {
        Curriculum curriculum = curriculumRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found:" + id));
        return curriculum;
    }

    @Transactional
    public Curriculum save(CurriculumDto curriculumDto){
        Counsel counsel = counselRepository.findById(curriculumDto.getCounselId()).orElseThrow();
        return curriculumRepository.save(curriculumDto.toEntity(counsel));
    }

    public List<Curriculum> findByCounsel(Counsel counsel){
        List<Curriculum> curriculums = curriculumRepository.findAllByCounselId(counsel);
        return curriculums;
    }

    public List<CurriculumDto> findAll(){
        List<Curriculum> curriculum = curriculumRepository.findAll();
        List<CurriculumDto> curriculumDtoList = new ArrayList<>();

        for (int i = 0; i < curriculum.size(); i++) {
            CurriculumDto curriculumDto = CurriculumDto.builder()
                    .curriculumId(curriculum.get(i).getId())
                    .title(curriculum.get(i).getTitle())
                    .content(curriculum.get(i).getContent())
                    .counselId(curriculum.get(i).getCounselId().getId())
                    .build();

            curriculumDtoList.add(curriculumDto);
        }
        return curriculumDtoList;
    }

    public CurriculumDto findById(Integer id){
        Curriculum curriculum = curriculumRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found:" + id));
        CurriculumDto curriculumDto = CurriculumDto.builder()
                .curriculumId(curriculum.getId())
                .title(curriculum.getTitle())
                .content(curriculum.getContent())
                .counselId(curriculum.getCounselId().getId())
                .build();

        return curriculumDto;
    }

    @Transactional
    public Curriculum update(Integer id, CurriculumDto curriculumDto){
        Curriculum curriculum = curriculumRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));

        curriculum.update(curriculumDto.getTitle(),curriculumDto.getContent());
        return curriculum;
    }

    //삭제
    @Transactional
    public void updateState(Integer id, CounselDto counselDto){
        Counsel counsel = counselRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));

        counsel.updateState(-1);
    }


}