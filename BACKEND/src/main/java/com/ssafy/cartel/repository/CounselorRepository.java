package com.ssafy.cartel.repository;


import com.ssafy.cartel.domain.*;
import com.ssafy.cartel.dto.CounselorDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CounselorRepository extends JpaRepository<Counselor,Integer> {
    Optional<Counselor> findByUser(User user);

}
