package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.Client;
import com.ssafy.cartel.domain.Counselor;
import com.ssafy.cartel.domain.Evaluation;
import com.ssafy.cartel.dto.EvaluationDto;
import com.ssafy.cartel.dto.EvaluationResponse;
import com.ssafy.cartel.dto.UpdateEvaluationRequest;
import com.ssafy.cartel.repository.ClientRepository;
import com.ssafy.cartel.repository.CounselorRepository;
import com.ssafy.cartel.repository.EvaluationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.expression.Lists;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor //final , @notnull 붙은 필드의 생성자 추가
@Service //빈으로 등록
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final CounselorRepository counselorRepository;
    private final ClientRepository clientRepository;

    // 상담사 후기 등록
    public Evaluation save(EvaluationDto evaluationDto) {
        System.out.println(evaluationDto.getContent());
        Counselor counselor = counselorRepository.findById(evaluationDto.getCounselorId())
                .orElseThrow(()->new IllegalArgumentException("not found"));

        Client client = clientRepository.findById(evaluationDto.getClientId())
                .orElseThrow(()->new IllegalArgumentException("not found"));

        return evaluationRepository.save(evaluationDto.toEntity(counselor, client));
    }


    // 상담사 후기 모두 조회
    public List<Evaluation> getEvaluation(Integer counselorId){//counselor_id

        Counselor counselor = counselorRepository.findById(counselorId)
                .orElseThrow(()-> new IllegalArgumentException("not found : " + counselorId));

        return evaluationRepository.findByCounselorId(counselor);
    }

    // 상담사 후기 삭제
    @Transactional
    public void delete(Integer id){
        evaluationRepository.deleteById(id);
    }

    // 상담사 후기 수정
    @Transactional
    public Evaluation update(Integer id, UpdateEvaluationRequest request){
        Evaluation evaluation = evaluationRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));

        evaluation.update(request.getContent(), request.getRate());

        return evaluation;
    }

    // 상담사 점수합
    @Transactional
    public String sumRate(Integer counselorId){
        List<Evaluation> evaluations = evaluationRepository.findAll();

        float average = 0f;
        float total = 0f;

        for (Evaluation evaluation : evaluations)
            total += evaluation.getRate();

        average = total / evaluations.size();

        return String.format("%.2f",average);
    }
}
