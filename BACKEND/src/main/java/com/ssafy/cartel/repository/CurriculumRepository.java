package com.ssafy.cartel.repository;


import com.ssafy.cartel.domain.Counsel;
import com.ssafy.cartel.domain.Curriculum;
import com.ssafy.cartel.dto.CounselDto;
import com.ssafy.cartel.dto.CounselorDto;
import com.ssafy.cartel.dto.CurriculumDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CurriculumRepository extends JpaRepository<Curriculum, Integer> {

    List<Curriculum> findAllByCounselId(Counsel counselId);
}
