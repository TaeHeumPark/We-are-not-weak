package com.ssafy.cartel.repository;

import com.ssafy.cartel.domain.Counselor;
import com.ssafy.cartel.domain.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface EvaluationRepository extends JpaRepository<Evaluation, Integer> {

   List<Evaluation> findByCounselorId(Counselor counselor);
}


